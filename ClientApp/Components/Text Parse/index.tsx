
import React, {useState, useRef} from "react";
import { Dropdown, Label, Form, Segment, Container, Input, Checkbox, List, Button, Icon } from "semantic-ui-react";
import { eStatementType, TextParseStatement, StringComparisonStatement, SkipWSStatement, ITextParseStatementState, OrComparisonStatement } from "./StatementTypes";
import { IRoutedCompProps } from "../../routes";


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
};

interface ITypeDropdownProps {
    selectedStatementType: eStatementType;
    SetSelectedStatementType: (type?: eStatementType) => void;
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
};

interface IOrComparisonInputCtrlProps {
    nameIndexes: Array<number | undefined>;
    subSelectedStatementType: eStatementType;
    SetSubSelectedStatementType: (type?: eStatementType) => void;
    SetSelStatement: (statement: TextParseStatement) => void;
};

// Clicking a list item when it has a parent causes the parent's on Item click to be called at the same
// time which means the parent becomes selected. This gets around this issue.
//sidtodo improve comment
const fSelectStatement:
    (SetSelStatement: (selStmt: ISelectedStatement) => void) =>
    (newSelStatement: TextParseStatement) => void = SetSelStatement => {

    let updateCalled=false;

    return newSelStatement => {

        if(!updateCalled) {
            // This will trigger the first time an item is clicked but not subsequent clicks
            SetSelStatement({
                UID: newSelStatement.UID,
                type: newSelStatement.type
            });

            updateCalled=true;
        }
    };
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
) => {

    // If this statement and none of it's children are selected, simply do a copy
    const selected=GetSelectedStatementNested(selStmt,iterStmt);
    if(!selected) {
        return iterStmt.Copy(true);
    }

    let copy;
    if(CompareSelectedStatement(selStmt,iterStmt)) {
        // The iter statement is the selected one.
        copy = updatedStmt;
    } else {
        // One of it's children is the selected one. Copy the statement excluding the children
        copy = iterStmt.Copy(false); 
    }

    let children=updatedStmt.Children();
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

    return ((stmt.type === selStmt.type && stmt.UID===selStmt.UID)?true:false);
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

export const TextParse: React.FunctionComponent<ITextParseProps & IRoutedCompProps> = (props) => {

    // The list of statements
    const [statements, SetStatements] = useState(() => new Array<TextParseStatement>());

    // Selected statement
    let selStatement: ISelectedStatement;
    let SetSelStatement: (stmt: TextParseStatement) => void;
    {
        const state=useState<ISelectedStatement>(null);
        selStatement=state[0];
        SetSelStatement=fSelectStatement(state[1]);
    }

    const [newSelectedStatementType, SetNewSelectedStatementType] = useState(eStatementType.String_Comp);
    const [subSelectedStatementType, SetSubSelectedStatementType] = useState(eStatementType.String_Comp);

    // When a new item is created, it is created with a default name and an index. This array holds the indexes.
    // As names are created the indexes come from this array, and are incremented accordingly. There is an index
    // per statement type
    const nameIndexes = useRef(new Array<number|undefined>(eStatementType.phCount));

    let typeSpecificJsx=null;

    const [selectedStatement,topLevelSelStmtIndex]=GetSelectedStatementFromListNested(selStatement,statements);

    const _UpdateStatement = (stmt: TextParseStatement) => UpdateStatement(stmt,selStatement,statements,SetStatements);
    
    if(selectedStatement !== null) {

        switch(selectedStatement.type) {

            case eStatementType.String_Comp:
                typeSpecificJsx=
                    <StringComparisonInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
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
            </Form>
        </Container>
    );
};

const StatementListItemRenderStatement: React.FunctionComponent<ITextParseProps & IStatementListCtrlProps & { stmt: TextParseStatement,idx: number }> = (props) => {

    const { stmt, SetSelStatement, selStatement, idx } = props;

    const heading=stmt.Heading();

    const children=stmt.Children();
    
    const childrenListItems=((children) ? children.map((iterStmt,idx) => {
        return StatementListItemRenderStatement({
            ...props,
            stmt: iterStmt,
            idx: idx
        });
    }) : null);

    //sidtodo make the List reuseable

    return (
        <List.Item
            key={idx}
            active={CompareSelectedStatement(selStatement,stmt)}
            onClick={() => {
                SetSelStatement(stmt);
            }}
        >
            <Icon name={stmt.Icon()} color={((stmt.CanSave())?"green":"red")} />
            <List.Content>
                <List.Header color="blue">{heading}</List.Header>
                {childrenListItems && childrenListItems.length>0 &&
                    <List
                        selection
                        celled
                        items={childrenListItems}
                    />
                }
            </List.Content>
        </List.Item>
    );
};

const StatementListCtrl: React.FunctionComponent<ITextParseProps & IStatementListCtrlProps> = (props) => {

    //sidtodo try with table instead of list.

    const items=props.statements.map((stmt,idx) => StatementListItemRenderStatement({
        ...props,
        stmt: stmt,
        idx: idx,
    }));

    return (
        <>
            <List
                selection
                celled
                items={items}
            />
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

const TypeDropdownCtrl: React.FunctionComponent<ITextParseProps & ITypeDropdownProps> = (props) => {

    const { selectedStatementType, SetSelectedStatementType } = props;

    const options = [
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
        }
    ];

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
                "which means the order of the statements is important.";
            break;
    }

    return (
        <Label pointing="left">
            {text}
        </Label>
    );
};

const StringComparisonInputCtrl: React.FunctionComponent<ITextParseProps & ITextParseStatementState> =
    (props) => {

    const { SetStatement } = props;
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
        />
    );
};

const UpdateInputCtrl: React.FunctionComponent<ITextParseProps & IParseStatementInputCtrlProps> =
    (props) => {

    const { statement, SetStatement, placeholder, GetValue, SetValue, title, Validate } = props;

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
            placeholder={placeholder}
            value={GetValue(statement)}
            onChange={e => {
                const updated=statement.Copy(true);
                SetValue(updated,e.target.value);
                
                SetStatement(updated);
            }}
            title={title}
            type="."
            {...additionalProps}
        />
    );
}