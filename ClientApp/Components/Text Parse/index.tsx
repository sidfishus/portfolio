
import React, {useState, SyntheticEvent} from "react";
import { Dropdown, Label, Form, Segment, Container, Input, Checkbox, List, Button } from "semantic-ui-react";
import { eStatementType, TextParseStatement, StringComparisonStatement, SkipWSStatement } from "./StatementTypes";


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
};

interface ITypeDropdownProps {
    selectedStatementType: eStatementType;
    SetSelectedStatementType: (type?: eStatementType) => void;
};

interface ITypeExplanationProps {
    selectedStatementType: eStatementType;
};

interface IParseStatementInputCtrlProps {
    statement: TextParseStatement;
    SetStatement: (input: TextParseStatement) => void;
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
}

export const TextParse: React.FunctionComponent<ITextParseProps> = (props: ITextParseProps) => {

    // The list of statements
    const [statements, SetStatements] = useState(new Array<TextParseStatement>());

    // Selected statement index
    const [selStatementIndex, SetSelStatementIndex] = useState(null);

    const [newSelectedStatementType, SetNewSelectedStatementType] = useState(eStatementType.String_Comp);


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

                                <ListNameInputCtrl
                                    {...props}
                                    statement={selectedStatement}
                                    SetStatement={_UpdateStatement}
                                />

                                {typeSpecificJsx!== null &&
                                    <Segment>
                                        {typeSpecificJsx}
                                    </Segment>
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

        const name=((stmt.name)?stmt.name : `(New ${stmt.TypeDescription()}..)`);

        return (
            <List.Item
                key={idx}
                active={props.selStatementIndex === idx}
                onClick={() => OnSelectStatement(props, idx)}
            >
                <List.Header>{name}</List.Header>
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

    const isAdd = 
        !(ctrlProps.statements.length>0 &&
        ctrlProps.selStatementIndex!==null &&
        (ctrlProps.selStatementIndex+1)!==ctrlProps.statements.length
    );

    // Create the new statement based on type.
    let newStatement: TextParseStatement;

    switch(ctrlProps.selectedStatementType) {
        case eStatementType.String_Comp:
            newStatement = new StringComparisonStatement();
            break;

        case eStatementType.SkipWS_Op:
            newStatement= new SkipWSStatement();
            break;
    }

    // Add/insert it
    let updatedStatements: Array<TextParseStatement>;
    let newSelIndex: number;
    if(isAdd) {
        // Copy the existing array
        updatedStatements = ctrlProps.statements.map(stmt => {
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

const StringComparisonInputCtrl: React.FunctionComponent<ITextParseProps & IParseStatementInputCtrlProps> =
    (props) => {

    const { SetStatement } = props;
    const statement = props.statement as StringComparisonStatement;

    let inputPropsAdd={};
    if(!statement.CanSave()) {
        inputPropsAdd = {
            ...inputPropsAdd,
            error: true
        };
    }

    const placeHolderText="Text to compare against...";

    return (
        <>
            <Input
                placeholder={placeHolderText}
                value={statement.str}
                onChange={e => {
                    const updated=new StringComparisonStatement(statement);
                    updated.str=e.target.value;
                    
                    SetStatement(updated);
                }}
                title={placeHolderText}
                {...inputPropsAdd}
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

const ListNameInputCtrl: React.FunctionComponent<ITextParseProps & IParseStatementInputCtrlProps> =
    (props) => {

    const { statement, SetStatement } = props;

    return (
        <Input
            placeholder="Name..."
            value={statement.name}
            onChange={e => {
                const updated=statement.Copy();
                updated.name=e.target.value;
                
                SetStatement(updated);
            }}
            title="Enter a short name to uniquely identify this statement"
        />
    );
}