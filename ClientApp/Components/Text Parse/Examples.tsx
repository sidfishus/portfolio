
import * as React from "react";
import { TextParseStatement, eStatementType, StringOffsetComparisonStatement, StartOfStringComparisonStatement,
    AdvanceStatement, StatementListComparisonStatement,
    StorePosAsVariableStatement, AdvanceUntilComparisonStatement, OrComparisonStatement, CustomComparisonStatement,
    eCustomComparisonOperator, CaptureComparisonStatement, StringComparisonStatement, SetVariableStatement} from "./StatementTypes";
import { ITextParseProps } from "./index";
import useConstant from "use-constant";
import { Dropdown, Form, Label, LabelProps } from "semantic-ui-react";
import { TextParseFunction, eCustomFunctionOperator } from "./CustomFunctions";
import { CreateLengthOperand, CreateArbitraryValueOperand, CreateFunctionOperand,
    CreateCurrentPositionOperand, 
    CreateVariableOperand} from "./Operands";
import { eParseOutputType } from "./index";
import { CreateTextParseVariable } from "./Variables";
import { MatchMediaResult } from "../../Library/MediaMatching";
import { eScreenResolution } from "../Client App";

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
    SetBuiltInExample: (type: eParseBuiltInExample) => void;
    SetReplaceFormat: (fmt: string) => void;
    mediaMatching: MatchMediaResult;
};

// These are indexes in to the 'ParseExampleOptionsArray' array.
export enum eParseExample {
    none=0,
    isPalindrome=1,
    isPalindromeCI=2,
    extractPalindromes=3,
    extractNotPalindromes=4,
    vbsAddParenthesis=5,
    capturePersonDetails=6,
    captureHTMLTags=7
};

export enum eParseBuiltInExample {
    vbsAddParenthesis=1,
};

interface IParseExampleOption {
    text: string;
    description?: JSX.Element;
    fDescription?: (mediaMatching: MatchMediaResult) => JSX.Element;
    GetStatements?: (
        CreateParseStatement: (stmtType: eStatementType) => TextParseStatement,
        functions: TextParseFunction[]
    ) => TextParseStatement[];
    GetFunctions?: (CreateTextParsefunction: (ctrName: string) => TextParseFunction) => TextParseFunction[];
    ParseInput?: string;
    ParseOuputType?: eParseOutputType;
    BuiltInType?: eParseBuiltInExample;
    replaceFormat?: string;
};

const CreateCurPosMinus1Function = (
    CreateTextParsefunction: (ctrName: string) => TextParseFunction
 ): TextParseFunction => {

    // Get the current position - 1
    const curPosMinus1 = CreateTextParsefunction("Current Position - 1");
    curPosMinus1.SetDescription("Return the current position - 1");
    curPosMinus1.SetLeftHandOperand(CreateCurrentPositionOperand());
    curPosMinus1.SetOperator(eCustomFunctionOperator.subtract);
    curPosMinus1.SetRightHandOperand(CreateArbitraryValueOperand(1));
    return curPosMinus1;
};

const vbsAddParenthesisInput: string =
`<%
    ' Classic ASP VB Script code where procedures are called without parenthesis.. (prior to parse replacement)
    Response.Write 1, obj.Func(1), obj.Func2(2), Func("three"), NestedFunc(InnerFunc("one",2),3), _
        FuncOnAnotherLine(1)
    dim world
    world="world"
    Response.Write "hello " & world, _
        2
    ExecProc 1,2,3
%>`;

const ParseExampleOptionsArray = (): IParseExampleOption[] => {

    const isPalindromeDescr = <>Returns whether the input text is a palindrome: https://en.wikipedia.org/wiki/Palindrome</>;
    const extractPalindromeInput = "Even abcba positioned bbb words cbbc are ppppgpppp palindromes qweewq";

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
            description: <>Extract the palindrome words from a sentence: https://en.wikipedia.org/wiki/Palindrome</>,
            GetStatements: GetExtractPalindromesStatements(false),
            GetFunctions: GetExtractPalindromesFunctions(false),
            ParseInput: extractPalindromeInput,
            ParseOuputType: eParseOutputType.potExtractAll
        },

        //eParseExample.extractNotPalindromes
        {
            text: "Extract not palindromes",
            description: <>Extract the words which are not palindromes from a sentence:
                https://en.wikipedia.org/wiki/Palindrome</>,
            GetStatements: GetExtractPalindromesStatements(true),
            GetFunctions: GetExtractPalindromesFunctions(true),
            ParseInput: extractPalindromeInput,
            ParseOuputType: eParseOutputType.potExtractAll
        },

        //eParseExample.vbsAddParenthesis
        {
            text: "VB Script add parenthesis (built in)",
            fDescription: (mediaMatching: MatchMediaResult) => {
                let descr=
                    "A complex replace example which converts VB Script procedure calls to VB .NET procedure "+
                    "calls by adding parenthesis around the arguments. This was created as part of an application which " +
                    "converts classic ASP code to ASP .NET. "+
                    "Because this uses functionality which is not available in this UI currently the statement list "+
                    "and functions e.t.c. cannot be "+
                    "shown but has been added as a demonostration of what can be achieved using the TextParse library. "+
                    "The text parse code for this can be found in Github in a function named "+
                    "'AddParenthesisToFunctionCalls': "+
                    "https://github.com/sidfishus/TextParse/";

                if(mediaMatching.FirstMatching() !== eScreenResolution.Mobile) {
                    descr = descr + "blob/master/Library/dotNETConversion.cs.";
                    return <>{descr}</>;
                }

                return <>{descr}<br/>blob/master/Library/dotNETConversion.cs</>;
            },
            ParseInput: vbsAddParenthesisInput,
            BuiltInType: eParseBuiltInExample.vbsAddParenthesis,
        },

        //eParseExample.capturePersonDetails
        {
            text: "Capture extract example",
            description: <>A simple CSV parsing example demonostrating the replace format feature.</>,
            GetFunctions: GetCaptureExtractExampleFunctions,
            GetStatements: GetCaptureExtractExampleStatements,
            ParseInput: "Bjarne Stroustrup,30/12/1950,Male,Ada Lovelace,10/12/1815,Female,Anders Hejlsberg,"+
                "02/12/1960,Male,Brendan Eich,04/07/1961,Male,",
            ParseOuputType: eParseOutputType.potExtractAll,
            replaceFormat: `Programmer name: 'name', Date of birth: 'dob', Gender: 'gender'.`
        },

        //eParseExample.captureHTMLTags
        {
            text: "Capture HTML control elements",
            description: <>A simple example which captures all of the control elements from HTML code</>,
            GetStatements: GetCaptureHTMLElementsStatements,
            ParseInput: "<html><body><form><input type=\"text\" value=\"hi\"/><label>hello</label><button>Click</button></form></body></html>",
            ParseOuputType: eParseOutputType.potExtractAll,
            replaceFormat: "Control element type: 'elementTypeCapture'",
            GetFunctions: GetCaptureHTMLElementsFunctions
        }
    ];
};

export const ParseExamplesDropdown: React.FunctionComponent<ITextParseProps & IParseExamplesDropdownProps> = (props) => {

    const {parseExample, SetParseExample, SetStatements, SetSelStatement, SetFunctions, SetSelFunctionIdx,
        CreateTextParsefunction, CreateParseStatement, SetParseInputText, SetParseOuputType,
        SetBuiltInExample, SetReplaceFormat, mediaMatching }=props;

    const examples = useConstant(ParseExampleOptionsArray);

    const isMobile = ((mediaMatching.FirstMatching() === eScreenResolution.Mobile)?true:false);

    const parseExampleObj=examples[parseExample];

    let descriptionJsx=null;
    if(parseExampleObj.description || parseExampleObj.fDescription) {

        const descr=((parseExampleObj.description)?
            parseExampleObj.description : parseExampleObj.fDescription(mediaMatching)
        );

        const labelProps: LabelProps = {};
        if(isMobile) {
            // Long descriptions cause the label to go over the width of the screen for some reason.
            // This prevents that from happening.
            // labelProps.style = {
            //     maxWidth: "96%"
            // };
        }

        descriptionJsx=<Label pointing="left" {...labelProps}>{descr}</Label>;
    }

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
                                            SetParseOuputType,
                                            SetBuiltInExample,
                                            SetReplaceFormat
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

            {descriptionJsx}
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
    SetParseOuputType: (type: eParseOutputType) => void,
    SetBuiltInExample: (type: eParseBuiltInExample) => void,
    SetReplaceFormat: (format: string) => void
) => {

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

    
    SetBuiltInExample((pe.BuiltInType !== undefined)?pe.BuiltInType:null);

    SetReplaceFormat((pe.replaceFormat !== undefined)?pe.replaceFormat:null);
};

const GetIsPalindromeStatements = (caseSensitive: boolean): (
    CreateParseStatement: (stmtType: eStatementType) => TextParseStatement,
    functions: TextParseFunction[]
) => TextParseStatement[] => {

    return (CreateParseStatement,functions) => {

        const startOfStringComp = CreateParseStatement(eStatementType.StartOfString_Comp);
        startOfStringComp.keyedDescription="Assert is the start of the parse input string";

        const stringOffsetOr = CreateParseStatement(eStatementType.Or_Comp) as OrComparisonStatement;
        stringOffsetOr.keyedDescription="Reverse string offset comparison";
        {
            const customComp = CreateParseStatement(eStatementType.CustomComparison) as CustomComparisonStatement;
            customComp.keyedDescription="Assume a match if the input string is 1 character";
            customComp.leftHandOperand=CreateFunctionOperand(functions[eIsPalindromeFunctionPos.offsetFuncLength]);
            customComp.operator=eCustomComparisonOperator.equals;
            customComp.rightHandOperand=CreateArbitraryValueOperand(0);

            const stringOffsetComp = CreateParseStatement(eStatementType.StringOffset_Comp) as StringOffsetComparisonStatement;
            stringOffsetComp.keyedDescription="Reverse string offset comparison against the middle of the string onwards";
            stringOffsetComp.reverse=true;
            stringOffsetComp.caseSensitive=caseSensitive;
            stringOffsetComp.length=CreateFunctionOperand(functions[eIsPalindromeFunctionPos.offsetFuncLength]);
            stringOffsetComp.offset=CreateFunctionOperand(functions[eIsPalindromeFunctionPos.offsetFuncOffset]);

            stringOffsetOr.SetChildren([
                customComp,
                stringOffsetComp
            ]);
        }
        
        const advanceToTheEnd = CreateParseStatement(eStatementType.AdvanceToEnd_Op);
        advanceToTheEnd.keyedDescription="Parsing is complete if the string offset comparison was successfull.";

        return [
            startOfStringComp,
            stringOffsetOr,
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
    offsetFuncLength.SetDescription("E.g. for a word of length 5 return 2, for a word of length 6 return 3");
    offsetFuncLength.SetLeftHandOperand(CreateLengthOperand());
    offsetFuncLength.SetOperator(eCustomFunctionOperator.divide);
    offsetFuncLength.SetRightHandOperand(CreateArbitraryValueOperand(2));

    const offsetFuncOffset = CreateTextParsefunction("Offset Position");
    offsetFuncOffset.SetDescription("The index at which to begin the string offset comparison");
    offsetFuncOffset.SetLeftHandOperand(CreateLengthOperand());
    offsetFuncOffset.SetOperator(eCustomFunctionOperator.subtract);
    offsetFuncOffset.SetRightHandOperand(CreateFunctionOperand(offsetFuncLength));

    // The order is important here see 'eIsPalindromeFunctionPos'.
    return [
        offsetFuncLength,
        offsetFuncOffset
    ];
};

const GetExtractPalindromesStatements = (
    notPalindromes: boolean
): (
    CreateParseStatement: (stmtType: eStatementType) => TextParseStatement,
    functions: TextParseFunction[]
) => TextParseStatement[] => {

    return (CreateParseStatement,functions) => {

        const CreateAdvanceCurPosMinus1 = (): TextParseStatement => {
            const advanceCurPosMinus1 = CreateParseStatement(eStatementType.Advance_Op) as AdvanceStatement;
            advanceCurPosMinus1.keyedDescription="Set current position = current position - 1";
            advanceCurPosMinus1.advanceWhere=CreateFunctionOperand(functions[eExtractPalindromeFunctionPos.curPosMinus1]);
    
            return advanceCurPosMinus1;
        };

        // 1. Is the start of a word - isStartOfWordComp
        const isStartOfWordComp = CreateParseStatement(eStatementType.Or_Comp);
        isStartOfWordComp.keyedDescription="Is the start of a word";
        {

            const isStartOfStringComp = CreateParseStatement(eStatementType.StartOfString_Comp) as StartOfStringComparisonStatement;
            isStartOfStringComp.keyedDescription="Is the start of the input string?";

            const isStartOfWordStatementList=CreateParseStatement(eStatementType.StatementList_Comp) as StatementListComparisonStatement;
            isStartOfWordStatementList.SetChildren([
                CreateAdvanceCurPosMinus1(),
                CreateParseStatement(eStatementType.IsWhitespace_Comp),
                CreateParseStatement(eStatementType.SkipWS_Op)
            ]);

            isStartOfWordComp.SetChildren([
                // Must come first
                isStartOfStringComp, 
                isStartOfWordStatementList
            ]);
        }

        // 2. Store the position of the first character of the current word
        const setFirstCharOfCurrentWordPosVariable=CreateParseStatement(eStatementType.StorePosAsVariable_Op) as StorePosAsVariableStatement;
        setFirstCharOfCurrentWordPosVariable.keyedDescription="Hold the position of the first character of the current word.";
        setFirstCharOfCurrentWordPosVariable.variable=CreateTextParseVariable("Current Word First Char Pos");

        // 3. Advance until the end of the current word / end of the entire string
        const advanceTillEndOfWordOrInputString=CreateParseStatement(eStatementType.AdvanceUntil_Comp) as AdvanceUntilComparisonStatement;
        advanceTillEndOfWordOrInputString.keyedDescription="Advance to the end of the current word or input string.";
        advanceTillEndOfWordOrInputString.forwards=true;
        {

            const isWhiteSpaceNoAdvance=CreateParseStatement(eStatementType.StatementList_Comp) as StatementListComparisonStatement;
            isWhiteSpaceNoAdvance.keyedDescription="Compare that the current character is whitespace but don't advance";
            isWhiteSpaceNoAdvance.SetChildren([
                CreateParseStatement(eStatementType.IsWhitespace_Comp),
                CreateAdvanceCurPosMinus1()
            ]);
            
            const orComp=CreateParseStatement(eStatementType.Or_Comp);
            const isEndOfStringComp = CreateParseStatement(eStatementType.EndOfString_Comp);
            orComp.SetChildren([
                isEndOfStringComp,
                isWhiteSpaceNoAdvance
            ]);

            advanceTillEndOfWordOrInputString.SetChildren([
                orComp,
            ]);
        }

        // 4. Store the position of the end of the current word in a variable
        const setEndOfCurrentWordPosVariable=CreateParseStatement(eStatementType.StorePosAsVariable_Op) as StorePosAsVariableStatement;
        setEndOfCurrentWordPosVariable.keyedDescription="Hold the position of the last character + 1 of the current word.";
        setEndOfCurrentWordPosVariable.variable=CreateTextParseVariable("Current Word Last Char + 1 Pos");

        // 5. Go back to the first character of the word now we have it's dimensions
        const goBackToBeginningOfWord=CreateParseStatement(eStatementType.Advance_Op) as AdvanceStatement;
        goBackToBeginningOfWord.keyedDescription="Go back to the beginning of the current word now we have it's dimensions";
        goBackToBeginningOfWord.advanceWhere=CreateVariableOperand(setFirstCharOfCurrentWordPosVariable.variable);

        // 6. Do the string offset compare on the current word to determine if it's a palindrome or not
        const stringOffsetStatements: TextParseStatement[] = [];
        if(notPalindromes) {

            const customComp = CreateParseStatement(eStatementType.CustomComparison) as CustomComparisonStatement;
            customComp.keyedDescription="Word must be longer than 1 character";
            customComp.leftHandOperand=CreateFunctionOperand(functions[eExtractPalindromeFunctionPos.currentWordLength]);
            customComp.operator=eCustomComparisonOperator.greaterThan;
            customComp.rightHandOperand=CreateArbitraryValueOperand(1);

            stringOffsetStatements.push(customComp);

            const stringOffsetComp = CreateParseStatement(eStatementType.StringOffset_Comp) as StringOffsetComparisonStatement;
            stringOffsetComp.keyedDescription="Reverse string offset comparison against the middle of the current word onwards (not)";
            stringOffsetComp.not=true;
            stringOffsetComp.reverse=true;
            stringOffsetComp.caseSensitive=true;
            stringOffsetComp.length=CreateFunctionOperand(functions[eExtractPalindromeFunctionPos.stringOffsetCompWordLength]);
            stringOffsetComp.offset=CreateFunctionOperand(functions[eExtractPalindromeFunctionPos.stringOffsetCompOffset]);

            stringOffsetStatements.push(stringOffsetComp);
        }
        else {
            const stringOffsetOr= CreateParseStatement(eStatementType.Or_Comp) as OrComparisonStatement;
            stringOffsetOr.keyedDescription="Reverse string offset comparison";
            
            const customComp = CreateParseStatement(eStatementType.CustomComparison) as CustomComparisonStatement;
            customComp.keyedDescription="Assume a match if the word is 1 character";
            customComp.leftHandOperand=CreateFunctionOperand(functions[eExtractPalindromeFunctionPos.stringOffsetCompWordLength]);
            customComp.operator=eCustomComparisonOperator.equals;
            customComp.rightHandOperand=CreateArbitraryValueOperand(0);

            const stringOffsetComp = CreateParseStatement(eStatementType.StringOffset_Comp) as StringOffsetComparisonStatement;
            stringOffsetComp.keyedDescription="Reverse string offset comparison against the middle of the current word onwards";
            stringOffsetComp.reverse=true;
            stringOffsetComp.caseSensitive=true;
            stringOffsetComp.length=CreateFunctionOperand(functions[eExtractPalindromeFunctionPos.stringOffsetCompWordLength]);
            stringOffsetComp.offset=CreateFunctionOperand(functions[eExtractPalindromeFunctionPos.stringOffsetCompOffset]);

            stringOffsetOr.SetChildren([
                customComp,
                stringOffsetComp
            ]);
            
            stringOffsetStatements.push(stringOffsetOr);
        }

        // 7. Skip to the end of the word
        const goToEndOfWord=CreateParseStatement(eStatementType.Advance_Op) as AdvanceStatement;
        goToEndOfWord.keyedDescription="Advance to the end of the word";
        goToEndOfWord.advanceWhere=CreateVariableOperand(setEndOfCurrentWordPosVariable.variable);

        // Put together in order

        return [
            isStartOfWordComp,
            setFirstCharOfCurrentWordPosVariable,
            advanceTillEndOfWordOrInputString,
            setEndOfCurrentWordPosVariable,
            goBackToBeginningOfWord,
            ...stringOffsetStatements,
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
        const curPosMinus1 = CreateCurPosMinus1Function(CreateTextParsefunction);

        // Get the length of the current word
        const currentWordLength=CreateTextParsefunction("Current Word Length");
        currentWordLength.SetDescription("Return the length of the current word");
        const currentWordLastCharPlus1PosVar=CreateTextParseVariable("Current Word Last Char + 1 Pos");
        currentWordLength.SetLeftHandOperand(CreateVariableOperand(currentWordLastCharPlus1PosVar));
        currentWordLength.SetOperator(eCustomFunctionOperator.subtract);
        currentWordLength.SetRightHandOperand(CreateVariableOperand(CreateTextParseVariable("Current Word First Char Pos")));

        // Get the length of the current word / 2 for string offset comparison
        const stringOffsetWordLength=CreateTextParsefunction("String Offset Comparison Word Length");
        stringOffsetWordLength.SetDescription("E.g. for a word of length 5 return 2, for a word of length 6 return 3");
        stringOffsetWordLength.SetLeftHandOperand(CreateFunctionOperand(currentWordLength));
        stringOffsetWordLength.SetOperator(eCustomFunctionOperator.divide);
        stringOffsetWordLength.SetRightHandOperand(CreateArbitraryValueOperand(2));

        // Get the offset for the string offset comparison which is the middle of the current word
        const stringOffsetCompOffset = CreateTextParsefunction("String Offset Comparison Offset");
        stringOffsetCompOffset.SetDescription("The index at which to begin the string offset comparison");
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

enum eCaptureExtractExampleFunctionPos {
    curPosMinus1=0,
};

const GetCaptureExtractExampleStatements = (
    CreateParseStatement: (stmtType: eStatementType) => TextParseStatement,
    functions: TextParseFunction[]
): TextParseStatement[] => {

    const fCreateIsComma = (): TextParseStatement => {
        var isComma=CreateParseStatement(eStatementType.String_Comp) as StringComparisonStatement;
        isComma.str=",";
        isComma.keyedDescription="Match against the delimeter (and advance)";
        return isComma;
    };

    const fCreateAdvanceToCommaAndStepBack = (): TextParseStatement[] => {


        var advanceToComma=CreateParseStatement(eStatementType.AdvanceUntil_Comp) as AdvanceUntilComparisonStatement;
        {
            advanceToComma.forwards=true;

            var isComma=fCreateIsComma();
            advanceToComma.SetChildren([
                isComma
            ]);
        }

        var stepBack=CreateParseStatement(eStatementType.Advance_Op) as AdvanceStatement;
        stepBack.advanceWhere=CreateFunctionOperand(functions[eCaptureExtractExampleFunctionPos.curPosMinus1]);
        stepBack.keyedDescription="Move to before the delimeter so it is not included in the capture.";
        return [
            advanceToComma,
            stepBack
        ];
    };


    const nameCapture=CreateParseStatement(eStatementType.Capture_Comp) as CaptureComparisonStatement;
    nameCapture.keyedDescription="Capture the name";
    nameCapture.name="name";
    nameCapture.SetChildren(fCreateAdvanceToCommaAndStepBack());

    const dobCapture=CreateParseStatement(eStatementType.Capture_Comp) as CaptureComparisonStatement;
    dobCapture.keyedDescription="Capture the DOB";
    dobCapture.name="dob";
    dobCapture.SetChildren(fCreateAdvanceToCommaAndStepBack());

    const genderCapture=CreateParseStatement(eStatementType.Capture_Comp) as CaptureComparisonStatement;
    genderCapture.keyedDescription="Capture the gender";
    genderCapture.name="gender";
    genderCapture.SetChildren(fCreateAdvanceToCommaAndStepBack());

    return [
        nameCapture,
        fCreateIsComma(),
        dobCapture,
        fCreateIsComma(),
        genderCapture,
        fCreateIsComma()
    ];
};

const GetCaptureExtractExampleFunctions = (
    CreateTextParsefunction: (ctrName: string) => TextParseFunction
 ): TextParseFunction[] => {

    // Get the current position - 1
    const curPosMinus1 = CreateCurPosMinus1Function(CreateTextParsefunction);

    // Don't change the order! Refer to 'eCaptureExtractExampleFunctionPos'
    return [curPosMinus1];
};

enum eCaptureHTMLElementsFunctionPos {
    curPosMinus1=0,
};

const GetCaptureHTMLElementsStatements = (
    CreateParseStatement: (stmtType: eStatementType) => TextParseStatement,
    functions: TextParseFunction[]
): TextParseStatement[] => {

    const isControlElementVarName="IsControlElement";
    const isControlElementVariable=CreateTextParseVariable(isControlElementVarName);

    const fMatchNonControlElementAndSetMarker = (
        str: string,
        isStr: boolean
    ): TextParseStatement => {
        const stmtList=CreateParseStatement(eStatementType.StatementList_Comp) as StatementListComparisonStatement;
        stmtList.keyedDescription=`Match against '${str}' and store a variable to indicate this is not a control element.`;

        const elementNameComp=CreateParseStatement(eStatementType.String_Comp) as StringComparisonStatement;
        elementNameComp.caseSensitive=true;
        elementNameComp.str=str;

        const setVariable=CreateParseStatement(eStatementType.SetVariable_Op) as SetVariableStatement;
        setVariable.keyedDescription="Set the marker to indicate it is not a control element";
        setVariable.variable=isControlElementVariable;
        setVariable.operand=CreateArbitraryValueOperand(0);

        if(isStr) {

            const whitespaceOrCloseTag = CreateParseStatement(eStatementType.Or_Comp) as OrComparisonStatement;
            whitespaceOrCloseTag.keyedDescription="Assert that the current character is whitespace or '>'";
            {
                const isCloseTag=CreateParseStatement(eStatementType.String_Comp) as StringComparisonStatement;
                isCloseTag.not=false;
                isCloseTag.str=">";

                whitespaceOrCloseTag.SetChildren([
                    CreateParseStatement(eStatementType.IsWhitespace_Comp),
                    isCloseTag
                ]);
            }

            stmtList.SetChildren([
                elementNameComp,
                whitespaceOrCloseTag,
                setVariable
            ]);

        } else {
            stmtList.SetChildren([
                elementNameComp,
                setVariable
            ]);
        }

        return stmtList;
    };

    const openTag=CreateParseStatement(eStatementType.String_Comp) as StringComparisonStatement;
    openTag.keyedDescription="Match against the HTML opening tag (<)";
    openTag.str="<";
    openTag.caseSensitive=false; // Not relevant

    const excludeNonControlElementsSetMarker=CreateParseStatement(eStatementType.Or_Comp) as OrComparisonStatement;
    excludeNonControlElementsSetMarker.keyedDescription="Exclude non control elements: set a marker to indicate found / not found";
    {

        const setVariableStmtList=CreateParseStatement(eStatementType.StatementList_Comp) as StatementListComparisonStatement;
        setVariableStmtList.keyedDescription="Set the marker to indicate it is a control element";
        {
            const setVariable=CreateParseStatement(eStatementType.SetVariable_Op) as SetVariableStatement;
            setVariable.variable=isControlElementVariable;
            setVariable.operand=CreateArbitraryValueOperand(1);

            setVariableStmtList.SetChildren([setVariable]);
        }

        const closeTagBegin=CreateParseStatement(eStatementType.String_Comp) as StringComparisonStatement;
        closeTagBegin.caseSensitive=true;
        closeTagBegin.str="/";

        excludeNonControlElementsSetMarker.SetChildren([
            fMatchNonControlElementAndSetMarker("html", true),
            fMatchNonControlElementAndSetMarker("head", true),
            fMatchNonControlElementAndSetMarker("body", true),
            fMatchNonControlElementAndSetMarker("form", true),
            fMatchNonControlElementAndSetMarker("/", false),
            setVariableStmtList
        ]);
    }

    const isControlElementComp=CreateParseStatement(eStatementType.CustomComparison) as CustomComparisonStatement;
    isControlElementComp.keyedDescription="Assert that the marker indicates we have found a control element.";
    isControlElementComp.leftHandOperand=CreateVariableOperand(isControlElementVariable);
    isControlElementComp.operator=eCustomComparisonOperator.equals;
    isControlElementComp.rightHandOperand=CreateArbitraryValueOperand(1);

    const elementTypeCapture=CreateParseStatement(eStatementType.Capture_Comp);
    elementTypeCapture.name="elementTypeCapture";
    elementTypeCapture.keyedDescription="Capture the control element type";
    {

        const whitespaceOrCloseTag=CreateParseStatement(eStatementType.Or_Comp) as OrComparisonStatement;
        {
            const closeTagStringComp=CreateParseStatement(eStatementType.String_Comp) as StringComparisonStatement;
            closeTagStringComp.str=">";

            whitespaceOrCloseTag.SetChildren([
                CreateParseStatement(eStatementType.IsWhitespace_Comp),
                closeTagStringComp
            ]);
        }

        // Advance until whitespace is found or HTML tag close
        const advanceUntil=CreateParseStatement(eStatementType.AdvanceUntil_Comp) as AdvanceUntilComparisonStatement;
        advanceUntil.keyedDescription="Advance until whitespace or '>' is found";
        advanceUntil.forwards=true;
        advanceUntil.SetChildren([
            whitespaceOrCloseTag
        ]);

        // Step back one to exclude the whitespace in the capture
        const stepBack=CreateParseStatement(eStatementType.Advance_Op) as AdvanceStatement;
        stepBack.keyedDescription="Exclude the whitespace in the capture";
        stepBack.advanceWhere=CreateFunctionOperand(functions[eCaptureHTMLElementsFunctionPos.curPosMinus1]);

        elementTypeCapture.SetChildren([
            advanceUntil,
            stepBack
        ]);
    }

    return [
        // Match against <
        openTag,
        // Skip whitespace
        CreateParseStatement(eStatementType.SkipWS_Op),
        // Determine if it's a control element and set the marker/variable
        excludeNonControlElementsSetMarker,
        // Assert the marker/variable
        isControlElementComp,
        // Capture the element type
        elementTypeCapture
    ];
};

const GetCaptureHTMLElementsFunctions = (
    CreateTextParsefunction: (ctrName: string) => TextParseFunction
 ): TextParseFunction[] => {

    // Don't change the order! Refer to 'eCaptureHTMLElementsFunctionPos'
    return [CreateCurPosMinus1Function(CreateTextParsefunction)];
};