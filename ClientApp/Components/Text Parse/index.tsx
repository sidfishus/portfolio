
import React, {useState, useRef, Fragment} from "react";
import { Dropdown, Label, Form, Segment, Container, Input, Checkbox, Modal, Button, Icon, Table } from "semantic-ui-react";
import { eStatementType, TextParseStatement, StringComparisonStatement, SkipWSStatement, ITextParseStatementState, OrComparisonStatement, StatementListComparisonStatement, StatementTypeInfo } from "./StatementTypes";
import { IRoutedCompProps } from "../../routes";
import { SimpleDelayer } from "../../Library/UIHelper";
import { Extract } from "./ExecuteParse";


interface ITextParseProps {
};

interface ISelectedStatement {
    UID: number;
    type: eStatementType;
};

interface IStatementListCtrlProps {
    statements: Array<TextParseStatement>;
    SetStatements: (statements: Array<TextParseStatement>) => void;
    selStatement?: ISelectedStatement;
    SetSelStatement: (statement: TextParseStatement) => void;
    ChangeStatementOrder: (selStmt: ISelectedStatement,orderDiff: number) => void;
    RemoveStatement: (selStmt: ISelectedStatement) => void;
    modalState: IModalState|null;
    SetModalState: (state: IModalState|null) => void;
};

interface IAddInsertParseStatementCtrlProps {
    statements: Array<TextParseStatement>;
    SetStatements: (
        statements: Array<TextParseStatement>,
        selStmt?: TextParseStatement
    ) => void;
    selectedStatementType: eStatementType;
    nameIndexes: Array<number | undefined>;
    selStmtIndex?: number;
    insert: boolean;
    comparisonOnly: boolean;
};

interface ITypeDropdownProps {
    selectedStatementType: eStatementType;
    SetSelectedStatementType: (type?: eStatementType) => void;
    comparisonOnly: boolean;
};

interface ITypeExplanationProps {
    selectedStatementType: eStatementType;
};

interface IParseStatementInputCtrlProps extends ITextParseStatementState {
    placeholder: string;
    title: string;
    GetValue: (statement: TextParseStatement) => string;
    SetValue: (statement: TextParseStatement, value: string) => void;
    Validate?: (statement: TextParseStatement) => boolean;
    updater: SimpleDelayer;
    name: string;
};

interface IOrComparisonInputCtrlProps {
    nameIndexes: Array<number | undefined>;
    subSelectedStatementType: eStatementType;
    SetSubSelectedStatementType: (type?: eStatementType) => void;
    SetSelStatement: (statement: TextParseStatement) => void;
};

interface IStatementListComparisonInputCtrlProps {
    nameIndexes: Array<number | undefined>;
    subSelectedStatementType: eStatementType;
    SetSubSelectedStatementType: (type?: eStatementType) => void;
    SetSelStatement: (statement: TextParseStatement) => void;
};

interface IModalCtrlProps {
    title: string;
    message: string;
    trigger: React.ReactNode;
    onNo?: () => void;
    onYes?: () => void;
    onCancel?: () => void;
    show: boolean;
};

enum eModalType {
    mtClearAllStatements=1,
    mtClearSingleStatement=2,
};

interface IModalState {
    type: eModalType;
    selStmt?: ISelectedStatement;
};

enum eParseOutputType {
    potMatch=1,
    potExtract=2,
    potReplace=3
};

interface IParseInputTextCtrlProps {
    text: string;
    SetText: (text: string) => void;
    onBlur: () => void;
};

interface IParseOutputTypeCtrlProps {
    type: eParseOutputType,
    SetType: (type: eParseOutputType) => void
};

interface IExecuteParseButtonCtrlProps {
    statements: Array<TextParseStatement>;
    type: eParseOutputType;
    input: string;
    SetParseInProgress: (inProgress: boolean) => void;
};

// Select a row in the statement list control
const fSelectStatement: (
    SetSelStatement: (selStmt: ISelectedStatement) => void,
    subSelectedStatementType: number,
    SetSubSelectedStatementType: (newType: eStatementType) => void
) =>
    (newSelStatement: TextParseStatement) => void = (SetSelStatement, subSelectedStatementType, SetSubSelectedStatementType) => {

    return newSelStatement => {

        if(newSelStatement === null) {
            SetSelStatement(null);
        } else {

            // This will trigger the first time an item is clicked but not subsequent click events until
            // the component is re-rendered
            SetSelStatement(CreateSelStatement(newSelStatement));

            // If the selected statement allows comparison only children, and the selected sub comparison type is not
            // a comparison type statement, select the first comparison type parse statement in the sub comparison type
            // selection control
            const subStatementTypeInfo = StatementTypeInfo[subSelectedStatementType];
            if(!subStatementTypeInfo.isComparison) {
                const selectedStatementTypeInfo = StatementTypeInfo[newSelStatement.type];
                if(selectedStatementTypeInfo.comparisonOnlyChildren) {
                    SetSubSelectedStatementType(eStatementType.String_Comp);
                }
            }
        }
    };
};

const MoveStatementGeneric =
    (statements: Array<TextParseStatement>,
    SetStatements: (statements: Array<TextParseStatement>) => void,
    selStmt: ISelectedStatement,
    fMove: (statements: Array<TextParseStatement>, selectedIdx: number, parentStmt: TextParseStatement|null) => Array<TextParseStatement>,
    parentStmt: TextParseStatement|null
): void => {

    // Find the index of the item that changed
    let changedIdx: number=null;
    let isChangedAtThisLevel=false;

    for(let i=0;i<statements.length;++i) {

        const iterStmt=statements[i];

        // Is this statement or any of it's children the selected one?
        const selected=GetSelectedStatementNested(selStmt,iterStmt);
        if(selected) {
            changedIdx=i;

            isChangedAtThisLevel=CompareSelectedStatement(selStmt,iterStmt);
            break;
        }
    }

    if(isChangedAtThisLevel) {

        SetStatements(fMove(statements,changedIdx,parentStmt));
    } else {

        // Copy each item within the array except for the item that's changed
        SetStatements(statements.map((iterStmt,idx) => {

            if(idx === changedIdx) {
                const copy=iterStmt.Copy(false);
                MoveStatementGeneric(iterStmt.Children(),newStatements => copy.SetChildren(newStatements),selStmt,fMove,copy);
                return copy;

            } else {
                return iterStmt.Copy(true);
            }
        }));
    }
};

const ChangeStatementOrder = (
    statements: Array<TextParseStatement>,
    selectedIdx: number,
    orderDiff: number
): Array<TextParseStatement> => {

    let changeRangeBegin: number;
    let changeRangeEnd: number;

    const newPos=selectedIdx+orderDiff;

    let shift: number;
    if(orderDiff>0) {
        changeRangeBegin=selectedIdx;
        changeRangeEnd = selectedIdx + orderDiff;
        shift=-1;

    } else {
        changeRangeBegin=selectedIdx + orderDiff;
        changeRangeEnd = selectedIdx;
        shift=1;
    }

    const rv=new Array<TextParseStatement>(statements.length);
    statements.forEach((iterStmt,idx) => {

        const copy=iterStmt.Copy(true);
        let updatedIdx;

        if(idx === selectedIdx) {
            // The change
            updatedIdx=newPos;

        } else if(idx>=changeRangeBegin && idx<=changeRangeEnd) {
            // Shift up/down by one
            updatedIdx =idx+shift;
            
        } else {
            // No change
            updatedIdx=idx;
        }

        rv[updatedIdx]=copy;
    });

    return rv;
};

// Remove a text parse statement
const RemoveStatement = (
    statements: Array<TextParseStatement>,
    idxToRemove: number,
    parentStmt: TextParseStatement|null,
    selStatement: ISelectedStatement,
    SetSelStatement: (stmt: TextParseStatement) => void,
): Array<TextParseStatement> => {

    // Copy all elements except for the specific index
    const rv=new Array<TextParseStatement>(statements.length-1);
    {
        let updIdx=0;
        statements.forEach((iterStmt,idx) => {
            if(idx !== idxToRemove) {
                rv[updIdx]=iterStmt.Copy(true);
                ++updIdx;
            }
        });
    }

    // If the statement being removed is the selected one
    if(CompareSelectedStatement(selStatement,statements[idxToRemove])) {

        let newSelected=null;
        if(parentStmt) {
            // Select the parent if there is one
            newSelected=parentStmt;

        } else if(rv.length>0) {
            // Select one of the siblings

            if(idxToRemove === rv.length) {
                newSelected=rv[rv.length-1];

            } else {
                newSelected=rv[idxToRemove];
            }
        }

        // Update the selected statement
        SetSelStatement(newSelected);
    }

    return rv;
};

// Update a single statement within a list of statements and return a copy of everything
const UpdateStatement =
    (stmt: TextParseStatement,
    selStmt: ISelectedStatement,
    statements: Array<TextParseStatement>,
    SetStatements: (statements: Array<TextParseStatement>) => void
): void => {

    const updated=statements.map((iterStmt) => {
        return UpdateStatement_Inner(stmt, iterStmt, selStmt);
    });

    SetStatements(updated);

};

// Given a text parse statement, update the entire state
const UpdateStatement_Inner = (
    updatedStmt: TextParseStatement,
    iterStmt: TextParseStatement,
    selStmt: ISelectedStatement,
): TextParseStatement => {

    // If this statement and none of it's children are selected, simply do a copy
    const selected=GetSelectedStatementNested(selStmt,iterStmt);
    if(!selected) {
        return iterStmt.Copy(true);
    }

    let copy,children;
    if(CompareSelectedStatement(selStmt,iterStmt)) {
        // The iter statement is the selected one.
        copy = updatedStmt;
        children=updatedStmt.Children();
    } else {
        // One of it's children is the selected one. Copy the statement excluding the children
        copy = iterStmt.Copy(false); 
        children=iterStmt.Children();
    }

    if(children) {

        // Update the children manually by updating the one that's changed
        children=children.map((iterChild) => {
            return UpdateStatement_Inner(updatedStmt,iterChild,selStmt);
        });
    }

    copy.SetChildren(children);

    return copy;
};

const CompareSelectedStatement = (
    selStmt: ISelectedStatement,
    stmt: TextParseStatement
): boolean => {

    const rv=((stmt.type === selStmt.type && stmt.UID===selStmt.UID)?true:false);

    return rv;
};

const GetSelectedStatementNested = (
    selStmt: ISelectedStatement,
    stmt: TextParseStatement
): TextParseStatement | null => {

    if(CompareSelectedStatement(selStmt,stmt)) {
        return stmt;
    }

    const children=stmt.Children();
    if(children) {
        const [selected]=GetSelectedStatementFromListNested(selStmt,children);
        if(selected) return selected;
    }

    return null;
};

const GetSelectedStatementFromListNested =
    (selStmt: ISelectedStatement,
    statements: Array<TextParseStatement>
): [TextParseStatement|null,number|null] => {

    if(selStmt===null || statements === null) return [null,null];

    for(let i=0;i<statements.length; ++i) {
        const iterStmt=statements[i];

        const selected=GetSelectedStatementNested(selStmt,iterStmt);
        if(selected) return [selected,i];
    }

    return [null,null];
};

const CreateSelStatement = (
    stmt: TextParseStatement
): ISelectedStatement => {

    return {
        type: stmt.type,
        UID: stmt.UID
    };
};

export const TextParse: React.FunctionComponent<ITextParseProps & IRoutedCompProps> = (props) => {

    //// Hooks

    // The list of statements
    const [statements, SetStatements] = useState(() => new Array<TextParseStatement>());

    // For inserting new parse statements
    const [newSelectedStatementType, SetNewSelectedStatementType] = useState(eStatementType.String_Comp);
    const [subSelectedStatementType, SetSubSelectedStatementType] = useState(eStatementType.String_Comp);

    // Selected statement
    let selStatement: ISelectedStatement;
    let SetSelStatement: (stmt: TextParseStatement) => void;
    {
        const state=useState<ISelectedStatement>(null);
        selStatement=state[0];
        SetSelStatement=fSelectStatement(state[1],subSelectedStatementType, SetSubSelectedStatementType);
    }

    // Modal
    const [modalState,SetModalState] = useState<IModalState|null>(null);

    // Parse input text
    const [parseInputText,SetParseInputText] = useState<string>("");

    // Parse output type checkbox
    const [outputType,SetOutputType] = useState<eParseOutputType>(eParseOutputType.potMatch);

    // Parse in progress?
    const [parseInProgress,SetParseInProgress] = useState<boolean>(false);

    // When a new item is created, it is created with a default name and an index. This array holds the indexes.
    // As names are created the indexes come from this array, and are incremented accordingly. There is an index
    // per statement type
    const nameIndexes = useRef(new Array<number|undefined>(eStatementType.phCount));

    //// Events/mutators

    let typeSpecificJsx=null;

    const [selectedStatement,topLevelSelStmtIndex]=GetSelectedStatementFromListNested(selStatement,statements);

    const _UpdateStatement = (stmt: TextParseStatement) => UpdateStatement(stmt,selStatement,statements,SetStatements);

    const _ChangeStatementOrder = (selStmt: ISelectedStatement,orderDiff: number) =>
        MoveStatementGeneric(statements,
            SetStatements,
            selStmt,
            (statements,selectedIdx) => ChangeStatementOrder(statements,selectedIdx,orderDiff),
            null
        );

    const _RemoveStatement = (selStmt: ISelectedStatement) =>
        MoveStatementGeneric(statements,
            SetStatements,
            selStmt,
            (statements,selectedIdx,parentStmt) => RemoveStatement(statements,selectedIdx,parentStmt,selStatement,SetSelStatement),
            null
        );

    //// Non persisting variables
    // Update the state with a delay so that the UI experience is more seemless. Needs to be used alongside
    // 'defaultValue' (uncontrolled)
    const updater=new SimpleDelayer(200);
    
    //// Render
    
    if(selectedStatement !== null) {

        switch(selectedStatement.type) {

            case eStatementType.String_Comp:
                typeSpecificJsx=
                    <StringComparisonInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        updater={updater}
                    />;
                break;

            case eStatementType.Or_Comp:
                typeSpecificJsx =
                    <OrComparisonInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        nameIndexes={nameIndexes.current}
                        subSelectedStatementType={subSelectedStatementType}
                        SetSubSelectedStatementType={SetSubSelectedStatementType}
                        SetSelStatement={SetSelStatement}
                    />;
                break;

            case eStatementType.StatementList_Comp:
                typeSpecificJsx =
                    <StatementListComparisonInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        nameIndexes={nameIndexes.current}
                        subSelectedStatementType={subSelectedStatementType}
                        SetSubSelectedStatementType={SetSubSelectedStatementType}
                        SetSelStatement={SetSelStatement}
                    />;
                break;
        }
    }

    //sidtodo checkbox to show full description
    //sidtood checkbox to show description from the type (i.e. string comparison against 'blah'.)

    return (
        <Container>
            <Form>
                <Segment padded>
                    <Label attached="top">Parse Statement List</Label>
                    <StatementListCtrl
                        {...props}
                        statements={statements}
                        SetStatements={SetStatements}
                        selStatement={selStatement}
                        SetSelStatement={SetSelStatement}
                        ChangeStatementOrder={_ChangeStatementOrder}
                        RemoveStatement={_RemoveStatement}
                        modalState={modalState}
                        SetModalState={SetModalState}
                    />

                    <AddNewParseStatementCtrls
                        {...props}
                        statements={statements}
                        SetStatements={(statements, selStmt) => {
                            SetSelStatement(selStmt);
                            SetStatements(statements);
                        }}
                        selectedStatementType={newSelectedStatementType}
                        nameIndexes={nameIndexes.current}
                        SetSelectedStatementType={SetNewSelectedStatementType}
                        selStmtIndex={topLevelSelStmtIndex}
                        insert={true}
                        comparisonOnly={false}
                    />

                    {selStatement !== null &&
                        <>
                        <Segment padded>
                            <Label attached="top">Update Parse Statement</Label>
                            <Form.Field>

                                <UpdateInputCtrl
                                    {...props}
                                    statement={selectedStatement}
                                    SetStatement={_UpdateStatement}
                                    GetValue={TextParseStatement.GetName}
                                    SetValue={TextParseStatement.SetName}
                                    placeholder="Name..."
                                    title="Enter a short name to uniquely identify this statement."
                                    updater={updater}
                                    name="name"
                                />

                                <br />
                                <br />

                                <UpdateInputCtrl
                                    {...props}
                                    statement={selectedStatement}
                                    SetStatement={_UpdateStatement}
                                    GetValue={TextParseStatement.GetKeyedDescription}
                                    SetValue={TextParseStatement.SetKeyedDescription}
                                    placeholder="Description... (optional)"
                                    title="Describe the purpose of this statement."
                                    updater={updater}
                                    name="descr"
                                />

                                {typeSpecificJsx &&
                                    <>
                                        <br />
                                        <br />
                                        {typeSpecificJsx}
                                    </>
                                }
                            </Form.Field>
                        </Segment>
                        </>
                    }
                </Segment>

                <Segment padded>
                    <Label attached="top">Parse Input</Label>
                    <ParseInputText
                        {...props}
                        text={parseInputText}
                        SetText={text => updater.DelayedCall(() => SetParseInputText(text))}
                        onBlur={updater.ImmediateCall}
                    />
                </Segment>

                <Segment padded>
                    <Label attached="top">Parse Output</Label>
                    <ParseOutputType
                        {...props}
                        type={outputType}
                        SetType={SetOutputType}
                    />

                    <ExecuteParseButton
                        {...props}
                        statements={statements}
                        type={outputType}
                        input={parseInputText}
                        SetParseInProgress={SetParseInProgress}
                    />
                </Segment>
            </Form>
        </Container>
    );
};

const ExecuteParseButtonClick = (
    input: string,
    type: eParseOutputType,
    statements: Array<TextParseStatement>,
    SetParseInProgress: (inProgress: boolean) => void
) => {

    switch(type) {
        case eParseOutputType.potMatch:
            break;

        case eParseOutputType.potExtract:
            //sidtodo return a promise from Extract??
            // var task=Extract(..)
            // task.then().catch() ??
            //sidtodo: not sure is a good idea because we don't want the catch to return a http error
            Extract(input, statements);
            break;

        case eParseOutputType.potReplace:
            break;
    }

    // Update the UI
    SetParseInProgress(true);
};

const ExecuteParseButton: React.FunctionComponent<ITextParseProps & IExecuteParseButtonCtrlProps> = (props) => {

    const { statements, type, input, SetParseInProgress } = props;

    let buttonCaption="";
    let canExecute=false;
    if(input ===null || input==="") {
        buttonCaption="Please enter parse input before attempting to parse.";
    }

    else if(!statements.length) {
        buttonCaption="Please create some parse statements before attempting to parse."

    } else {
        // Validate the input for all ofthe statements
        for(let i=0;i<statements.length;++i) {

            const iterStmt=statements[i];
            canExecute=iterStmt.CanSave();
            if(!canExecute) {
                buttonCaption=`One or more parse statements have missing data and/or are not valid. First failing statement found: ${iterStmt.Heading()}`;
                break;
            }
        }
    }

    return (
        <>
            <Button
                color={((canExecute)? "green": "red")}
                disabled={!canExecute}
                onClick={() => ExecuteParseButtonClick(input, type, statements, SetParseInProgress)}
            >
                Execute Parse
            </Button>

            {!canExecute &&
                <Label pointing="left">
                    {buttonCaption}
                </Label>
            }
        </>
    );

};

const ParseInputText: React.FunctionComponent<ITextParseProps & IParseInputTextCtrlProps> = (props) => {

    const { text, SetText, onBlur } = props;

    return (
        <textarea
            placeholder="Text input.."
            defaultValue={text}
            onChange={e => SetText(e.target.value)}
            onBlur={onBlur}
        />
    );
};

const ParseOutputType: React.FunctionComponent<ITextParseProps & IParseOutputTypeCtrlProps> = (props) => {

    const { type, SetType } = props;

    const matchIsChecked=(type === eParseOutputType.potMatch);
    const extractIsChecked=(type === eParseOutputType.potExtract);
    const replaceIsChecked=(type === eParseOutputType.potReplace);

    return (
        <>
            <Form.Field>
                <Checkbox
                    radio
                    label="Match"
                    checked={matchIsChecked}
                    onChange={() => SetType(eParseOutputType.potMatch)}
                />

                {matchIsChecked &&
                    <Label pointing="left">
                        //sidtodo
                    </Label>
                }
            </Form.Field>

            <Form.Field>
                <Checkbox
                    radio
                    label="Extract"
                    checked={extractIsChecked}
                    onChange={() => SetType(eParseOutputType.potExtract)}
                />

                {extractIsChecked &&
                    <Label pointing="left">
                        Extract all text matching the parse statement list into a list.
                    </Label>
                }
            </Form.Field>

            <Form.Field>
                <Checkbox
                    radio
                    label="Replace"
                    checked={replaceIsChecked}
                    onChange={() => SetType(eParseOutputType.potReplace)}
                />

                {replaceIsChecked &&
                    <Label pointing="left">
                        //sidtodo
                    </Label>
                }
            </Form.Field>
        </>
    );
};

const StatementListItemRenderStatement: React.FunctionComponent<ITextParseProps & IStatementListCtrlProps & {
    stmt: TextParseStatement,
    idx: number,
    level: number,
    stmtCount: number
}> = (props) => {

    const { stmt, SetSelStatement, selStatement, idx, level, stmtCount, ChangeStatementOrder, RemoveStatement, modalState, SetModalState } = props;

    const paddingBlankSpace=((level>1)?" ".repeat(10*(level-1)) : "");

    const heading=stmt.Heading();

    const children=stmt.Children();
    
    const childrenListItems=((children) ? children.map((iterStmt,idx) => {
        return StatementListItemRenderStatement({
            ...props,
            stmt: iterStmt,
            idx: idx,
            level: level+1,
            stmtCount: children.length
        });
    }) : null);

    let rowExtraProps;
    if(stmt.CanSave()) {
        rowExtraProps={positive: true};
    } else {
        rowExtraProps={negative: true};
    }

    // let upButtonProps;
    // if(idx === 0) {
    //     upButtonProps = {
    //         disabled: true
    //     };
    // }

    // let downButtonProps;
    // if(idx === stmtCount-1) {
    //     downButtonProps = {
    //         disabled: true
    //     };
    // }

    const hasUpButton=(idx !==0);
    const hasDownButton=(idx !== stmtCount-1);

    return (
        <Fragment
            key={`${stmt.UID}-${stmt.type}`}
        >
            <Table.Row
                active={CompareSelectedStatement(selStatement,stmt)}
                {...rowExtraProps}
            >
                <Table.Cell
                    onClick={() => {
                        SetSelStatement(stmt);
                    }}
                >
                    {paddingBlankSpace}
                    <Icon name={stmt.Icon()} color={((stmt.CanSave())?"green":"red")} />
                    {"   "} 
                    {heading}
                </Table.Cell>

                <Table.Cell textAlign="right" width={2}>
                    {hasUpButton && <Icon name="caret up" onClick={() => ChangeStatementOrder(CreateSelStatement(stmt),-1)} />}
                    {hasDownButton && <Icon name="caret down" onClick={() => ChangeStatementOrder(CreateSelStatement(stmt),1)} />}

                    <TextParseModal
                        key={`del-${stmt.UID}-${stmt.type}`}
                        trigger={<Icon name="close" onClick={() => {
                            SetModalState({
                                type: eModalType.mtClearSingleStatement,
                                selStmt: CreateSelStatement(stmt)
                            });
                        }} />}
                        title="Confirm Delete"
                        message={`Are you sure you want to clear this text parse statement? This action cannot be undone.`}
                        onYes={() => {
                            SetModalState(null);
                            RemoveStatement(stmt);
                        }}
                        onNo={() => SetModalState(null)}
                        onCancel={() => SetModalState(null)}
                        show={(modalState!==null && modalState.type===eModalType.mtClearSingleStatement && CompareSelectedStatement(modalState.selStmt,stmt))}
                    />
                </Table.Cell>

            </Table.Row>

            {childrenListItems}
        </Fragment>
    );
};

const StatementListCtrl: React.FunctionComponent<ITextParseProps & IStatementListCtrlProps> = (props) => {

    const { statements, modalState, SetModalState, SetStatements, SetSelStatement } = props;

    const items=statements.map((stmt,idx) => StatementListItemRenderStatement({
        ...props,
        stmt: stmt,
        idx: idx,
        level: 1,
        stmtCount: statements.length
    }));

    const clearListTrigger = (
        <Button
            onClick={() => SetModalState({type: eModalType.mtClearAllStatements})}
        >
            Clear List
        </Button>
    );

    return (
        <>
            {items.length>0 &&
                <>
                    <Table
                        selectable
                        compact
                    >
                        <Table.Body>
                            {items}
                        </Table.Body>
                    </Table>

                    <TextParseModal
                        trigger={clearListTrigger}
                        title="Confirm Clear"
                        message="Are you sure you want to clear the text parse statement list? This action cannot be undone."
                        onYes={() => {
                            SetModalState(null);
                            SetStatements(new Array<TextParseStatement>());
                            SetSelStatement(null);
                        }}
                        onNo={() => SetModalState(null)}
                        onCancel={() => SetModalState(null)}
                        show={(modalState!==null && modalState.type===eModalType.mtClearAllStatements)}
                    />

                    <br />
                    <br />
                </>
            }
        </>
    );
};

const AddNewParseStatementCtrls: React.FunctionComponent<ITextParseProps & ITypeDropdownProps & IAddInsertParseStatementCtrlProps> = (props) => {
    
    return (
        <>
            <TypeDropdownCtrl
                {...props}
            />

            <TypeExplanationCtrl
                {...props}
            />

            <br />
            <br />

            <AddInsertParseStatementCtrl
                {...props}
            />
        </>
    );
};

const AddInsertParseStatement =
    (ctrlProps: ITextParseProps & IAddInsertParseStatementCtrlProps,
    isInsert: boolean) : void => {

    const { nameIndexes, statements, selectedStatementType, SetStatements, selStmtIndex } = ctrlProps;

    // Create the new statement based on type.
    let newStatement: TextParseStatement;

    switch(selectedStatementType) {
        case eStatementType.String_Comp:
            newStatement = new StringComparisonStatement();
            break;

        case eStatementType.SkipWS_Op:
            newStatement= new SkipWSStatement();
            break;

        case eStatementType.Or_Comp:
            newStatement = new OrComparisonStatement();
            break;

        case eStatementType.StatementList_Comp:
            newStatement = new StatementListComparisonStatement();
            break;
    }

    // Generate a default name
    let newNameIndex;
    if(nameIndexes[selectedStatementType] === undefined) {
        newNameIndex = 1;
    }
    else {
        newNameIndex = nameIndexes[selectedStatementType] + 1;
    }

    nameIndexes[selectedStatementType] = newNameIndex;

    newStatement.name=`${newStatement.TypeDescription()} ${newNameIndex}`;
    newStatement.UID = newNameIndex;

    //// Add/insert it
    // Get the new index
    let newSelIndex;
    if(statements.length == 0) {
        newSelIndex = 0;
    } else {
        newSelIndex = ((isInsert) ? selStmtIndex : selStmtIndex + 1);
    }

    let updatedStatements: Array<TextParseStatement>;
    if(newSelIndex>=statements.length) {
        // Add

        // Copy the existing array
        updatedStatements = statements.map(stmt => {
            return stmt.Copy(true);
        });

        // Add the new one
        updatedStatements.push(newStatement);
    } else {
        // Insert

        // Copy the ones up to the insert index
        updatedStatements = new Array<TextParseStatement>();
        for(let i=0;i<newSelIndex; ++i) {
            updatedStatements.push(statements[i]);
        }

        // Add the new one
        updatedStatements.push(newStatement);

        // Add the ones above it
        for(let i=newSelIndex; i<statements.length; ++i) {
            updatedStatements.push(statements[i]);
        }
    }

    SetStatements(updatedStatements, newStatement);
}

const AddInsertParseStatementCtrl: React.FunctionComponent<ITextParseProps & IAddInsertParseStatementCtrlProps> = (props) => {

    const {insert} = props;
    
    return (
        <>
            {insert &&
                <Button
                    onClick={() => AddInsertParseStatement(props,true)}
                >
                    Insert
                </Button>
            }

            <Button
                onClick={() => AddInsertParseStatement(props,false)}
            >
                Add
            </Button>
        </>
    );
};

const TypeDropdownCtrl_Options = [
    {
        key: eStatementType.String_Comp,
        text: "String comparison",
        value: eStatementType.String_Comp
    },

    {
        key: eStatementType.SkipWS_Op,
        text: "Skip whitespace",
        value: eStatementType.SkipWS_Op
    },

    {
        key: eStatementType.Or_Comp,
        text: "Or comparison",
        value: eStatementType.Or_Comp
    },

    {
        key: eStatementType.StatementList_Comp,
        text: "Statement list",
        value: eStatementType.StatementList_Comp
    },
];

const TypeDropdownCtrl: React.FunctionComponent<ITextParseProps & ITypeDropdownProps> = (props) => {

    const { selectedStatementType, SetSelectedStatementType, comparisonOnly } = props;

    let options;
    if(comparisonOnly) {
        options = TypeDropdownCtrl_Options.filter((optionsObj) => {
            const statementTypeInfo=StatementTypeInfo[optionsObj.value];
            return statementTypeInfo.isComparison;
        });
    } else {
        options = TypeDropdownCtrl_Options;
    }

    let additionalProps = {};
    if(props.selectedStatementType !== null) {
        additionalProps = {
            value: selectedStatementType
        };
    }

    return (
        <Dropdown
            options={options}
            placeholder={"Statement Type"}
            onChange={(e,value) => SetSelectedStatementType(value.value as number)}
            {...additionalProps}
        />
    );
};

const TypeExplanationCtrl: React.FunctionComponent<ITextParseProps & ITypeExplanationProps> = (props) => {

    if(props.selectedStatementType === null) {
        return null;
    }

    var text;

    switch(props.selectedStatementType) {

        case eStatementType.String_Comp:
            text="Compare the text at the current index to a specific string.";
            break;

        case eStatementType.SkipWS_Op:
            text="Advance until the first non-whitespace character is found.";
            break;

        case eStatementType.Or_Comp:
            text="Compare a list of statements. The parser will advance according to the first matching statement " +
                "(if any).";
            break;

        case eStatementType.StatementList_Comp:
            text="Perform an ordered list of text parse statements. The first comparison which fails to match will " +
                "cause the statement list to stop and the overall status will be considered as not matching. Useful " +
                "for creating aggregate comparison statements.";
            break;
    }

    return (
        <Label pointing="left">
            {text}
        </Label>
    );
};

const StringComparisonInputCtrl: React.FunctionComponent<ITextParseProps & ITextParseStatementState & {
    updater: SimpleDelayer
}> =
    (props) => {

    const { SetStatement, updater } = props;
    const statement = props.statement as StringComparisonStatement;

    const placeHolderText="Text to compare against...";

    return (
        <>

            <UpdateInputCtrl
                statement={statement}
                SetStatement={SetStatement}
                placeholder={placeHolderText}
                title={placeHolderText}
                GetValue={StringComparisonStatement.GetStr}
                SetValue={StringComparisonStatement.SetStr}
                Validate={StringComparisonStatement.ValidateStr}
                updater={updater}
                name="string"
            />

            <br />
            <br />

            <Checkbox
                label="Case sensitive"
                checked={statement.caseSensitive}
                onChange={() => {

                    const updated=new StringComparisonStatement(statement);
                    updated.caseSensitive=!statement.caseSensitive;

                    SetStatement(updated);
                }}
            />
        </>
    );
};

const OrComparisonInputCtrl: React.FunctionComponent<ITextParseProps & ITextParseStatementState & IOrComparisonInputCtrlProps> = (props) => {

    const { nameIndexes, subSelectedStatementType, SetSubSelectedStatementType, SetStatement, SetSelStatement } = props;

    const orStatement = props.statement as OrComparisonStatement;

    const children=orStatement.Children();

    return (
        <AddNewParseStatementCtrls
            {...props}
            statements={children}
            SetStatements={(statements, selStmt) => {

                const copy=new OrComparisonStatement(orStatement,false);
                copy.children=statements;
                SetSelStatement(selStmt);
                SetStatement(copy);
            }}
            selectedStatementType={subSelectedStatementType}
            nameIndexes={nameIndexes}
            SetSelectedStatementType={SetSubSelectedStatementType}
            selStmtIndex={((children)?children.length-1:-1)}
            insert={false}
            comparisonOnly={true}
        />
    );
};

const StatementListComparisonInputCtrl: React.FunctionComponent<ITextParseProps & ITextParseStatementState & IStatementListComparisonInputCtrlProps> = (props) => {

    const { nameIndexes, subSelectedStatementType, SetSubSelectedStatementType, SetStatement, SetSelStatement } = props;

    const statementList = props.statement as StatementListComparisonStatement;

    const children=statementList.Children();

    return (
        <AddNewParseStatementCtrls
            {...props}
            statements={children}
            SetStatements={(statements, selStmt) => {

                const copy=new StatementListComparisonStatement(statementList,false);
                copy.children=statements;
                SetSelStatement(selStmt);
                SetStatement(copy);
            }}
            selectedStatementType={subSelectedStatementType}
            nameIndexes={nameIndexes}
            SetSelectedStatementType={SetSubSelectedStatementType}
            selStmtIndex={((children)?children.length-1:-1)}
            insert={false}
            comparisonOnly={false}
        />
    );
};

// Create a unique key per statement input ctrl otherwise the 'defaultValue's persist for the same input (e.g. name)
// across multiple text parse statements
const CreateStatementKey = (stmt: TextParseStatement, name: string) => {
    return `${stmt.type}-${stmt.UID}-${name}`;
};

const UpdateInputCtrl: React.FunctionComponent<ITextParseProps & IParseStatementInputCtrlProps> =
    (props) => {

    const { statement, SetStatement, placeholder, GetValue, SetValue, title, Validate, updater, name } = props;

    let additionalProps = {};
    if(Validate) {
        if(!Validate(statement)) {
            additionalProps = {
                ...additionalProps,
                error: true
            };
        }
    }

    return (
        <Input
            key={CreateStatementKey(statement,name)}
            placeholder={placeholder}
            defaultValue={GetValue(statement)}
            onChange={e => {
                const value=e.target.value;

                updater.DelayedCall(() => {
                    const updated=statement.Copy(true);
                    SetValue(updated,value);
                    
                    SetStatement(updated);
                });
            }}
            title={title}
            type="."
            onBlur={updater.ImmediateCall}
            {...additionalProps}
        />
    );
}

const TextParseModal: React.FunctionComponent<IModalCtrlProps> = (props) => {

    const { title, message, onNo, onYes, onCancel, trigger, show } = props;

    return (
        <Modal
            trigger={trigger}
            dimmer="inverted"
            open={show}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>{message}</Modal.Content>
            <Modal.Actions>
                {onYes &&
                    <Button
                        onClick={onYes}
                    >
                        Yes
                    </Button>
                }

                {onNo &&
                    <Button
                        onClick={onNo}
                    >
                        No
                    </Button>
                }

                {onCancel &&
                    <Button
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                }
            </Modal.Actions>
        </Modal>
    );
};