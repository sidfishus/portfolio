
import * as React from "react";
import { TextParseStatement, eStatementType, StringComparisonStatement, StringOffsetComparisonStatement} from "./StatementTypes";
import { ITextParseProps } from "./index";
import useConstant from "use-constant";
import { Dropdown, Form, Label } from "semantic-ui-react";
import { TextParseFunction, eCustomFunctionOperator } from "./CustomFunctions";
import { CreateLengthOperand, CreateArbitraryValueOperand, CreateFunctionOperand } from "./Operands";

export interface IParseExamplesDropdownProps {
    parseExample: eParseExample;
    SetParseExample: (pe: eParseExample) => void;
    SetStatements: (statements: Array<TextParseStatement>) => void;
    SetSelStatement: (statement: TextParseStatement) => void;
    SetFunctions: (functions: TextParseFunction[]) => void;
    SetSelFunctionIdx: (idx: number) => void;
    CreateTextParsefunction: (ctrName: string) => TextParseFunction;
    CreateParseStatement: (stmtType: eStatementType) => TextParseStatement;
};

// These are indexes in to the 'ParseExampleOptionsArray' array.
export enum eParseExample {
    none=0,
    isPalindrome=1,
};

interface IParseExampleOption {
    text: string;
    description?: string;
    GetStatements?: (
        CreateParseStatement: (stmtType: eStatementType) => TextParseStatement,
        functions: TextParseFunction[]
    ) => TextParseStatement[];
    GetFunctions?: (CreateTextParsefunction: (ctrName: string) => TextParseFunction) => TextParseFunction[];
};

const ParseExampleOptionsArray = (): IParseExampleOption[] => {

    return [
        //eParseExample.none
        {
            text: "(None)"
        },

        //eParseExample.isPalindrome
        {
            text: "Is Palindrome",
            description: "Returns whether the input text is a palindrome: https://en.wikipedia.org/wiki/Palindrome",
            GetStatements: GetIsPalindromeStatements,
            GetFunctions: GetIsPalindromeFunctions,
        }
    ];
};

export const ParseExamplesDropdown: React.FunctionComponent<ITextParseProps & IParseExamplesDropdownProps> = (props) => {

    const {parseExample, SetParseExample, SetStatements, SetSelStatement, SetFunctions, SetSelFunctionIdx, CreateTextParsefunction, CreateParseStatement }=props;

    const examples = useConstant(ParseExampleOptionsArray);

    const parseExampleObj=examples[parseExample];

    return (
        <Form.Field>
            <span>
                Example:&nbsp;
                <Dropdown
                    text={parseExampleObj.text}
                    inline
                    value={parseExample}
                >
                    <Dropdown.Menu>
                        {examples.map((iterExample, i) => {
                            const iterEnum=i as eParseExample;
                            return (
                                <Dropdown.Item
                                    text={iterExample.text}
                                    key={i}
                                    value={iterEnum}
                                    onClick={()=> {
                                        // Update the state for the selected parse example
                                        SetParseExample(iterEnum);
                                        // Update the rest of the UI according to the parse example selected
                                        OnSelectParseExample(iterExample,
                                            SetStatements,
                                            SetSelStatement,
                                            SetFunctions,
                                            SetSelFunctionIdx,
                                            CreateTextParsefunction,
                                            CreateParseStatement
                                        );
                                    }}
                                    selected={iterEnum === parseExample}
                                    active={iterEnum === parseExample}
                                />
                            );
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </span>

            {parseExampleObj.description && 
                <Label pointing="left">{parseExampleObj.description}</Label>
            }
        </Form.Field>
    );
};

const OnSelectParseExample = (
    pe: IParseExampleOption,
    SetStatements: (stmts: TextParseStatement[]) => void,
    SetSelStatement: (statement: TextParseStatement) => void,
    SetFunctions: (functions: TextParseFunction[]) => void,
    SetSelFunctionIdx: (idx: number) => void,
    CreateTextParsefunction: (ctrName: string) => TextParseFunction,
    CreateParseStatement: (stmtType: eStatementType) => TextParseStatement) => {

    const functions=(pe.GetFunctions)?pe.GetFunctions(CreateTextParsefunction):new Array<TextParseFunction>();
    SetFunctions(functions);
    // No active function
    SetSelFunctionIdx(null);
        
    SetStatements((pe.GetStatements)?pe.GetStatements(CreateParseStatement, functions):new Array<TextParseStatement>());
    // No active selected statement
    SetSelStatement(null);
};

const GetIsPalindromeStatements = (
    CreateParseStatement: (stmtType: eStatementType) => TextParseStatement,
    functions: TextParseFunction[]
): TextParseStatement[] => {

    const startOfStringComp = CreateParseStatement(eStatementType.StartOfString_Comp);
    startOfStringComp.keyedDescription="Assert is the start of the parse input string";

    const stringOffsetComp = CreateParseStatement(eStatementType.StringOffset_Comp) as StringOffsetComparisonStatement;
    stringOffsetComp.keyedDescription="Reverse string offset comparison against the middle of the string onwards";
    stringOffsetComp.reverse=true;
    stringOffsetComp.caseSensitive=false;
    stringOffsetComp.length=CreateFunctionOperand(functions[0]);
    stringOffsetComp.offset=CreateFunctionOperand(functions[1]);
    
    const advanceToTheEnd = CreateParseStatement(eStatementType.AdvanceToEnd_Op);
    advanceToTheEnd.keyedDescription="Parsing is complete if the string offset comparison was successfull.";

    return [
        startOfStringComp,
        stringOffsetComp,
        advanceToTheEnd
    ];
};

const GetIsPalindromeFunctions =
    (CreateTextParsefunction: (ctrName: string) => TextParseFunction
    ): TextParseFunction[] => {

    // The integer version of the length divided by 2 gives the amount of characters to compare.
    // I.e. if the length is 5, this will return 2.
    const offsetFuncLength = CreateTextParsefunction("Offset Length");
    offsetFuncLength.SetLeftHandOperand(CreateLengthOperand());
    offsetFuncLength.SetOperator(eCustomFunctionOperator.divide);
    offsetFuncLength.SetRightHandOperand(CreateArbitraryValueOperand(2));

    const offsetFuncOffset = CreateTextParsefunction("Offset Position");
    offsetFuncOffset.SetLeftHandOperand(CreateLengthOperand());
    offsetFuncOffset.SetOperator(eCustomFunctionOperator.subtract);
    offsetFuncOffset.SetRightHandOperand(CreateFunctionOperand(offsetFuncLength));

    // The order is important here as 'GetIsPalindromeStatements' relies on it.
    return [
        offsetFuncLength,
        offsetFuncOffset
    ];
};