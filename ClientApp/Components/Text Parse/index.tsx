
import React, {useState, useRef} from "react";
import { Dropdown, Label, Form, Segment, Container, Input, Checkbox, List, Button, Icon } from "semantic-ui-react";
import { eStatementType, TextParseStatement, StringComparisonStatement, SkipWSStatement, ITextParseStatementState } from "./StatementTypes";
import { IRoutedCompProps } from "../../routes";


interface ITextParseProps {
};

interface IStatementListCtrlProps {
    statements: Array<TextParseStatement>;
    SetStatements: (statements: Array<TextParseStatement>) => void;
    selStatementIndex?: number;
    SetSelStatementIndex: (idx?: number) => void;
};

interface IAddInsertParseStatementCtrlProps {
    statements: Array<TextParseStatement>;
    SetStatements: (statements: Array<TextParseStatement>) => void;
    selStatementIndex?: number;
    selectedStatementType: eStatementType;
    SetSelStatementIndex: (idx?: number) => void;
    nameIndexes: Array<number | undefined>;
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

//sidtodo reuse functionality?
const UpdateStatement =
    (stmt: TextParseStatement,
    idx: number,
    statements: Array<TextParseStatement>,
    SetStatements: (statements: Array<TextParseStatement>) => void
): void => {
    const updated=statements.map((iterStmt,iterIdx) => {
        if(iterIdx === idx) return stmt;
        return iterStmt.Copy();
    });

    SetStatements(updated);
};

export const TextParse: React.FunctionComponent<ITextParseProps & IRoutedCompProps> = (props) => {

    // The list of statements
    const [statements, SetStatements] = useState(() => new Array<TextParseStatement>());

    // Selected statement index
    const [selStatementIndex, SetSelStatementIndex] = useState(null);

    const [newSelectedStatementType, SetNewSelectedStatementType] = useState(eStatementType.String_Comp);

    // When a new item is created, it is created with a default name and an index. This array holds the indexes.
    // As names are created the indexes come from this array, and are incremented accordingly. There is an index
    // per statement type
    const nameIndexes = useRef(new Array<number|undefined>(eStatementType.phCount));


    let typeSpecificJsx=null;
    let selectedStatement=null;
    const _UpdateStatement = (stmt: TextParseStatement) => UpdateStatement(stmt,selStatementIndex,statements,SetStatements);

    if(selStatementIndex !== null) {

        selectedStatement=statements[selStatementIndex];
        switch(selectedStatement.type) {

            case eStatementType.String_Comp:
                    typeSpecificJsx=
                        <StringComparisonInputCtrl
                            {...props}
                            statement={selectedStatement}
                            SetStatement={_UpdateStatement}
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
                        selStatementIndex={selStatementIndex}
                        SetSelStatementIndex={SetSelStatementIndex}
                    />
                    <AddInsertParseStatementCtrl
                        {...props}
                        statements={statements}
                        SetStatements={SetStatements}
                        selStatementIndex={selStatementIndex}
                        selectedStatementType={newSelectedStatementType}
                        SetSelStatementIndex={SetSelStatementIndex}
                        nameIndexes={nameIndexes.current}
                    />

                    <TypeDropdownCtrl
                        {...props}
                        selectedStatementType={newSelectedStatementType}
                        SetSelectedStatementType={SetNewSelectedStatementType}
                    />

                    <TypeExplanationCtrl
                        {...props}
                        selectedStatementType={newSelectedStatementType}
                    />

                    {selStatementIndex !== null &&
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

const OnSelectStatement = (ctrlProps: ITextParseProps & IStatementListCtrlProps, idx: number): void => {
    ctrlProps.SetSelStatementIndex(idx);
};

const StatementListCtrl: React.FunctionComponent<ITextParseProps & IStatementListCtrlProps> = (props) => {

    //sidtodo icons in the list

    const items=props.statements.map((stmt,idx) => {

        const heading=stmt.Heading();

        return (
            <List.Item
                key={idx}
                active={props.selStatementIndex === idx}
                onClick={() => OnSelectStatement(props, idx)}
            >
                <Icon name="like" color={((stmt.CanSave())?"green":"red")} />
                <List.Content>
                    <List.Header color="blue">{heading}</List.Header>
                </List.Content>
            </List.Item>
        );
    });

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

const AddInsertParseStatement = (ctrlProps: ITextParseProps & IAddInsertParseStatementCtrlProps) : void => {

    const { nameIndexes, statements, selStatementIndex, selectedStatementType } = ctrlProps;

    const isAdd = 
        !(statements.length>0 &&
        selStatementIndex!==null &&
        (selStatementIndex+1)!==statements.length
    );

    // Create the new statement based on type.
    let newStatement: TextParseStatement;

    switch(selectedStatementType) {
        case eStatementType.String_Comp:
            newStatement = new StringComparisonStatement();
            break;

        case eStatementType.SkipWS_Op:
            newStatement= new SkipWSStatement();
            break;
    }

    // Generate a default name
    let newIndex;
    if(nameIndexes[selectedStatementType] === undefined) {
        newIndex = 1;
    }
    else {
        newIndex = nameIndexes[selectedStatementType] + 1;
    }

    nameIndexes[selectedStatementType] = newIndex;

    newStatement.name=`${newStatement.TypeDescription()} ${newIndex}`;

    // Add/insert it
    let updatedStatements: Array<TextParseStatement>;
    let newSelIndex: number;
    if(isAdd) {
        // Copy the existing array
        updatedStatements = statements.map(stmt => {
            return stmt.Copy();
        });

        // Add the new one
        newSelIndex=updatedStatements.length;
        updatedStatements.push(newStatement);
    }
    //sidtodo insert

    ctrlProps.SetStatements(updatedStatements);
    ctrlProps.SetSelStatementIndex(newSelIndex);
}

const AddInsertParseStatementCtrl: React.FunctionComponent<ITextParseProps & IAddInsertParseStatementCtrlProps> = (props) => {

    return (
        <Button
            onClick={() => AddInsertParseStatement(props)}
        >
            Insert
        </Button>
    );
};

const TypeDropdownCtrl: React.FunctionComponent<ITextParseProps & ITypeDropdownProps> = (props) => {

    const { selectedStatementType, SetSelectedStatementType } = props;

    //sidtodo is this needed now? we have the static method on the class instances

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
    //sidtodo put this as a static member on the class?

    switch(props.selectedStatementType) {

        case eStatementType.String_Comp:
            text="Compare the text at the current index to a specific string.";
            break;

        case eStatementType.SkipWS_Op:
            text="Advance until the first non-whitespace character is found.";
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

    //sidtodo can't save ctrl

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
                const updated=statement.Copy();
                SetValue(updated,e.target.value);
                
                SetStatement(updated);
            }}
            title={title}
            type="."
            {...additionalProps}
        />
    );
}