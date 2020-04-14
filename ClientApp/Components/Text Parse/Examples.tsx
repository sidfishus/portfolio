
import * as React from "react";
import { TextParseStatement, eStatementType, StringOffsetComparisonStatement, StartOfStringComparisonStatement,
    AdvanceStatement, StatementListComparisonStatement, IsWhitespaceComparisonStatement, SkipWSStatement, StorePosAsVariableStatement, AdvanceUntilComparisonStatement} from "./StatementTypes";
import { ITextParseProps } from "./index";
import useConstant from "use-constant";
import { Dropdown, Form, Label } from "semantic-ui-react";
import { TextParseFunction, eCustomFunctionOperator } from "./CustomFunctions";
import { CreateLengthOperand, CreateArbitraryValueOperand, CreateFunctionOperand,
    CreateCurrentPositionOperand, 
    CreateVariableOperand} from "./Operands";
import { eParseOutputType } from "./index";
import { CreateTextParseVariable } from "./Variables";

export interface IParseExamplesDropdownProps {
    parseExample: eParseExample;
    SetParseExample: (pe: eParseExample) => void;
    SetStatements: (statements: Array<TextParseStatement>) => void;
    SetSelStatement: (statement: TextParseStatement) => void;
    SetFunctions: (functions: TextParseFunction[]) => void;
    SetSelFunctionIdx: (idx: number) => void;
    CreateTextParsefunction: (ctrName: string) => TextParseFunction;
    CreateParseStatement: (stmtType: eStatementType) => TextParseStatement;
    SetParseInputText: (text: string) => void;
    SetParseOuputType: (type: eParseOutputType) => void;
};

// These are indexes in to the 'ParseExampleOptionsArray' array.
export enum eParseExample {
    none=0,
    isPalindrome=1,
    isPalindromeCI=2,
    extractPalindromes=3,
};

interface IParseExampleOption {
    text: string;
    description?: string;
    GetStatements?: (
        CreateParseStatement: (stmtType: eStatementType) => TextParseStatement,
        functions: TextParseFunction[]
    ) => TextParseStatement[];
    GetFunctions?: (CreateTextParsefunction: (ctrName: string) => TextParseFunction) => TextParseFunction[];
    ParseInput?: string;
    ParseOuputType?: eParseOutputType;
};

const ParseExampleOptionsArray = (): IParseExampleOption[] => {

    const isPalindromeDescr = "Returns whether the input text is a palindrome: https://en.wikipedia.org/wiki/Palindrome";
    const extractPalindromeInput = "Each abcba second bbb word cbbc is ppppgpppp a p palindrome qweewq";

    return [
        //eParseExample.none
        {
            text: "(None)"
        },

        //eParseExample.isPalindrome
        {
            text: "Is Palindrome (case sensitive)",
            description: isPalindromeDescr,
            GetStatements: GetIsPalindromeStatements(true),
            GetFunctions: GetIsPalindromeFunctions,
            ParseInput: "abcba",
            ParseOuputType: eParseOutputType.potMatch
        },

        //eParseExample.isPalindromeCI
        {
            text: "Is Palindrome (case insensitive)",
            description: isPalindromeDescr,
            GetStatements: GetIsPalindromeStatements(false),
            GetFunctions: GetIsPalindromeFunctions,
            ParseInput: "ABCDdcba",
            ParseOuputType: eParseOutputType.potMatch
        },

        //eParseExample.extractPalindromes
        {
            text: "Extract palindromes",
            description: "Extract words which are palindromes from a sentence: https://en.wikipedia.org/wiki/Palindrome",
            GetStatements: GetExtractPalindromesStatements(false),
            GetFunctions: GetExtractPalindromesFunctions(false),
            ParseInput: extractPalindromeInput,
            ParseOuputType: eParseOutputType.potExtractAll
        }
    ];
};

export const ParseExamplesDropdown: React.FunctionComponent<ITextParseProps & IParseExamplesDropdownProps> = (props) => {

    const {parseExample, SetParseExample, SetStatements, SetSelStatement, SetFunctions, SetSelFunctionIdx,
        CreateTextParsefunction, CreateParseStatement, SetParseInputText, SetParseOuputType }=props;

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
                                            CreateParseStatement,
                                            SetParseInputText,
                                            SetParseOuputType
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
    CreateParseStatement: (stmtType: eStatementType) => TextParseStatement,
    SetParseInputText: (text: string) => void,
    SetParseOuputType: (type: eParseOutputType) => void) => {

    const functions=(pe.GetFunctions)?pe.GetFunctions(CreateTextParsefunction):new Array<TextParseFunction>();
    SetFunctions(functions);
    // No active function
    SetSelFunctionIdx(null);
        
    SetStatements((pe.GetStatements)?pe.GetStatements(CreateParseStatement, functions):new Array<TextParseStatement>());
    // No active selected statement
    SetSelStatement(null);

    SetParseInputText((pe.ParseInput)?pe.ParseInput:"");

    if(pe.ParseOuputType!==undefined)
        SetParseOuputType(pe.ParseOuputType);
};

const GetIsPalindromeStatements = (caseSensitive: boolean): (
    CreateParseStatement: (stmtType: eStatementType) => TextParseStatement,
    functions: TextParseFunction[]
) => TextParseStatement[] => {

    return (CreateParseStatement,functions) => {

        const startOfStringComp = CreateParseStatement(eStatementType.StartOfString_Comp);
        startOfStringComp.keyedDescription="Assert is the start of the parse input string";

        const stringOffsetComp = CreateParseStatement(eStatementType.StringOffset_Comp) as StringOffsetComparisonStatement;
        stringOffsetComp.keyedDescription="Reverse string offset comparison against the middle of the string onwards";
        stringOffsetComp.reverse=true;
        stringOffsetComp.caseSensitive=caseSensitive;
        stringOffsetComp.length=CreateFunctionOperand(functions[eIsPalindromeFunctionPos.offsetFuncLength]);
        stringOffsetComp.offset=CreateFunctionOperand(functions[eIsPalindromeFunctionPos.offsetFuncOffset]);
        
        const advanceToTheEnd = CreateParseStatement(eStatementType.AdvanceToEnd_Op);
        advanceToTheEnd.keyedDescription="Parsing is complete if the string offset comparison was successfull.";

        return [
            startOfStringComp,
            stringOffsetComp,
            advanceToTheEnd
        ];
    };
};

enum eIsPalindromeFunctionPos {
    offsetFuncLength=0,
    offsetFuncOffset=1
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

    // The order is important here see 'eIsPalindromeFunctionPos'.
    return [
        offsetFuncLength,
        offsetFuncOffset
    ];
};

//sidtodo do the 'not palindromes' 
const GetExtractPalindromesStatements = (
    notPalindromes: boolean
): (
    CreateParseStatement: (stmtType: eStatementType) => TextParseStatement,
    functions: TextParseFunction[]
) => TextParseStatement[] => {

    return (CreateParseStatement,functions) => {

        const isWhitespaceComp = CreateParseStatement(eStatementType.IsWhitespace_Comp) as IsWhitespaceComparisonStatement;

        // 1. Skip whitespace
        const skipWhitespace = CreateParseStatement(eStatementType.SkipWS_Op) as SkipWSStatement;
        skipWhitespace.keyedDescription="Skip whitespace.";

        // 2. Is the start of a word - isStartOfWordComp
        const isStartOfWordComp = CreateParseStatement(eStatementType.Or_Comp);
        isStartOfWordComp.keyedDescription="Is the start of a word";
        {

            const isStartOfStringComp = CreateParseStatement(eStatementType.StartOfString_Comp) as StartOfStringComparisonStatement;
            isStartOfStringComp.keyedDescription="Is the start of the input string?";

            const advanceCurPosMinus1 = CreateParseStatement(eStatementType.Advance_Op) as AdvanceStatement;
            advanceCurPosMinus1.keyedDescription="Set current position = current position - 1";
            advanceCurPosMinus1.advanceWhere=CreateFunctionOperand(functions[eExtractPalindromeFunctionPos.curPosMinus1]);

            const isStartOfWordStatementList=CreateParseStatement(eStatementType.StatementList_Comp) as StatementListComparisonStatement;
            isStartOfWordStatementList.SetChildren([
                advanceCurPosMinus1,
                isWhitespaceComp,
                skipWhitespace
            ]);

            isStartOfWordComp.SetChildren([
                // Must come first
                isStartOfStringComp, 
                isStartOfWordStatementList
            ]);
        }

        // 3. Store the position of the first character of the current word
        const setFirstCharOfCurrentWordPosVariable=CreateParseStatement(eStatementType.StorePosAsVariable_Op) as StorePosAsVariableStatement;
        setFirstCharOfCurrentWordPosVariable.keyedDescription="Hold the position of the fisrt character of the current word.";
        setFirstCharOfCurrentWordPosVariable.variable=CreateTextParseVariable("Current Word First Char Pos");

        // 4. Advance until the end of the current word / end of the entire string
        const advanceTillEndOfWordOrInputString=CreateParseStatement(eStatementType.AdvanceUntil_Comp) as AdvanceUntilComparisonStatement;
        advanceTillEndOfWordOrInputString.keyedDescription="Advance to the end of the current word or input string.";
        advanceTillEndOfWordOrInputString.forwards=true;
        {
            const isEndOfStringComp = CreateParseStatement(eStatementType.EndOfString_Comp);
            
            const orComp=CreateParseStatement(eStatementType.Or_Comp);
            orComp.SetChildren([
                isEndOfStringComp,
                isWhitespaceComp
            ]);

            advanceTillEndOfWordOrInputString.SetChildren([
                orComp
            ]);
        }

        // 5. Store the position of the end of the current word in a variable
        const setEndOfCurrentWordPosVariable=CreateParseStatement(eStatementType.StorePosAsVariable_Op) as StorePosAsVariableStatement;
        setEndOfCurrentWordPosVariable.keyedDescription="Hold the position of the last character + 1 of the current word.";
        setEndOfCurrentWordPosVariable.variable=CreateTextParseVariable("Current Word Last Char + 1 Pos");

        // 6. Go back to the first character of the word now we have it's dimensions
        const goBackToBeginningOfWord=CreateParseStatement(eStatementType.Advance_Op) as AdvanceStatement;
        goBackToBeginningOfWord.keyedDescription="Go back to the beginning of the current word now we have it's dimensions";
        goBackToBeginningOfWord.advanceWhere=CreateVariableOperand(setFirstCharOfCurrentWordPosVariable.variable);

        // 7. Do the string offset compare on the current word to determine if it's a palindrome or not
        const stringOffsetComp = CreateParseStatement(eStatementType.StringOffset_Comp) as StringOffsetComparisonStatement;
        stringOffsetComp.keyedDescription="Reverse string offset comparison against the middle of the current word onwards";
        stringOffsetComp.reverse=true;
        stringOffsetComp.caseSensitive=true;
        stringOffsetComp.length=CreateFunctionOperand(functions[eExtractPalindromeFunctionPos.stringOffsetCompWordLength]);
        stringOffsetComp.offset=CreateFunctionOperand(functions[eExtractPalindromeFunctionPos.stringOffsetCompOffset]);

        // 8. Skip to the end of the word
        const goToEndOfWord=CreateParseStatement(eStatementType.Advance_Op) as AdvanceStatement;
        goToEndOfWord.keyedDescription="Advance to the end of the word";
        goToEndOfWord.advanceWhere=CreateVariableOperand(setEndOfCurrentWordPosVariable.variable);

        // Put together in order

        return [
            skipWhitespace,
            isStartOfWordComp,
            setFirstCharOfCurrentWordPosVariable,
            advanceTillEndOfWordOrInputString,
            setEndOfCurrentWordPosVariable,
            goBackToBeginningOfWord,
            stringOffsetComp,
            goToEndOfWord
        ];
    };
};

enum eExtractPalindromeFunctionPos {
    curPosMinus1=0,
    currentWordLength=1,
    stringOffsetCompWordLength=2,
    stringOffsetCompOffset=3,
};

const GetExtractPalindromesFunctions = (
    notPalindromes: boolean
): (
    CreateTextParsefunction: (ctrName: string) => TextParseFunction
 ) => TextParseFunction[] => {

    return (CreateTextParsefunction): TextParseFunction[] => {

        // Get the current position - 1
        const curPosMinus1 = CreateTextParsefunction("Current Position - 1");
        curPosMinus1.SetLeftHandOperand(CreateCurrentPositionOperand());
        curPosMinus1.SetOperator(eCustomFunctionOperator.subtract);
        curPosMinus1.SetRightHandOperand(CreateArbitraryValueOperand(1));

        // Get the length of the current word
        const currentWordLength=CreateTextParsefunction("Current Word Length");
        const currentWordLastCharPlus1PosVar=CreateTextParseVariable("Current Word Last Char + 1 Pos");
        currentWordLength.SetLeftHandOperand(CreateVariableOperand(currentWordLastCharPlus1PosVar));
        currentWordLength.SetOperator(eCustomFunctionOperator.subtract);
        currentWordLength.SetRightHandOperand(CreateVariableOperand(CreateTextParseVariable("Current Word First Char Pos")));

        // Get the length of the current word / 2 for string offset comparison
        const stringOffsetWordLength=CreateTextParsefunction("String Offset Comparison Word Length");
        stringOffsetWordLength.SetLeftHandOperand(CreateFunctionOperand(currentWordLength));
        stringOffsetWordLength.SetOperator(eCustomFunctionOperator.divide);
        stringOffsetWordLength.SetRightHandOperand(CreateArbitraryValueOperand(2));

        // Get the offset for the string offset comparison which is the middle of the current word
        const stringOffsetCompOffset = CreateTextParsefunction("String Offset Comparison Offset");
        stringOffsetCompOffset.SetLeftHandOperand(CreateVariableOperand(currentWordLastCharPlus1PosVar));
        stringOffsetCompOffset.SetOperator(eCustomFunctionOperator.subtract);
        stringOffsetCompOffset.SetRightHandOperand(CreateFunctionOperand(stringOffsetWordLength));

        // Do not change the order. See 'eExtractPalindromeFunctionPos'
        return [
            curPosMinus1,
            currentWordLength,
            stringOffsetWordLength,
            stringOffsetCompOffset
        ];
    };
};