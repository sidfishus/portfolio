
import { TextParseStatement } from "./StatementTypes";
import { TextParseVariable } from "./Variables";
import { CreateAPIURL } from "../../Library/HttpHelper";
import axios, { AxiosResponse } from "axios";
import { TextParseFunction, TextParseFunctionCode } from "./CustomFunctions";
import { eParseBuiltInExample } from "./Examples";

// Based on the list of statements, this creates and executes the C# code necessary to perform the parse.
// The reason for why I designed it like this is so we do not need an intermediate language or another way of
// expressing the parse statements that both the client and the back end understand in order to
// read/write/execute the parse statements. Writing the C# code directly means the Javascript client has access to
// all of the features available in the C# Text Parse library.

export const EncodeString = (str: string): string => {
    // The /g suffix replaces all instances. Without this only the first occurence will be changed.
    return `@"${str.replace(/"/g,`""`)}"`;
};

const InitRunState = (functions: TextParseFunction[], fGetVariables: () => TextParseVariable[]): string => {

    const funcCodeArray = functions.map(iterFunc => {
        return `runState.SetFunction("${iterFunc.Name()}", ${TextParseFunctionCode(iterFunc, functions, fGetVariables)});`;
    });

    const code= `(RunState runState) => {${funcCodeArray.join("\r\n")}}`;

    return code;
};

export const Replace = (
    input: string,
    statements: Array<TextParseStatement>,
    replaceFormat: string,
    fGetVariables: () => TextParseVariable[],
    functions: TextParseFunction[]
): Promise<AxiosResponse> => {

    // Create the code
    const code: string=
        `var parser = new Parser(null);

        var matching = new List<string>();

        var stmtList = new StatementList(null);

        Dictionary<string, Capture> capturing = new Dictionary<string, Capture>();

        ${CodeForStatements(statements, "stmtList", fGetVariables, functions)}
                
        // Do the parse
        int matchingCount;
        react_spa.Controllers.ReplaceRV rv;
        rv.ReplacedText=parser.Replace(${EncodeString(input)}, ${EncodeString(replaceFormat)}, stmtList, capturing, null, out matchingCount, null, ${InitRunState(functions, fGetVariables)});
        rv.NumMatching=matchingCount;`;

    const usingStatements: string[] = [
        "System.Collections.Generic"
    ];

    // Call the API to do the execution
    const url=CreateAPIURL("TextParse/ExecuteReplace");
    return axios.post(url, {
        Code: code,
        ReturnVariableName: "rv",
        UsingStatements: usingStatements
    });

};

export const Extract = (
    input: string,
    statements: Array<TextParseStatement>,
    matchFirstOnly: boolean,
    replaceFormat: string,
    fGetVariables: () => TextParseVariable[],
    functions: TextParseFunction[]
): Promise<AxiosResponse> => {

    let firstOnlyConditional="";
    if(matchFirstOnly) {
        firstOnlyConditional=`
            
        stmtList.Add(new AdvanceToTheEnd(null));`;
    }

    let stmtListName;
    let capturingSetupConditional="";
    let onMatchBody;
    if(replaceFormat) {
        stmtListName="stmtList";
        onMatchBody=`matching.Add(parser.ReplaceMatchFromString(${EncodeString(replaceFormat)}, capturing));`;

    } else {
        // Capture everything
        stmtListName="captureStmtList";
        capturingSetupConditional=`
        var captureStmtList=new StatementList(null);
        {
            var captureAll=new Capture(null);
            captureAll.Name="AllCapture";
            stmtList.Add(captureAll);
            captureAll.Comparison=captureStmtList;
            capturing.Add("All",captureAll);
        }`;

        onMatchBody=`matching.Add(capturing["All"].Captured);`;
    }

    // Create the code
    const code: string=
        `var parser = new Parser(null);

        var matching = new List<string>();

        var stmtList = new StatementList(null);

        Dictionary<string, Capture> capturing = new Dictionary<string, Capture>();

        System.Func<RunState, string, int, string> onMatch = (runState, input, unused) => {
            ${onMatchBody}
            return "";
        };${capturingSetupConditional}

        ${CodeForStatements(statements, stmtListName, fGetVariables, functions)}${firstOnlyConditional}
                
        // Do the parse
        int matchingCount;
        parser.Extract(${EncodeString(input)}, null, stmtList, null, null, out matchingCount, onMatch, ${InitRunState(functions, fGetVariables)});`;

    const usingStatements: string[] = [
        "System.Collections.Generic"
    ];

    // Call the API to do the execution
    const url=CreateAPIURL("TextParse/ExecuteExtract");
    return axios.post(url, {
        Code: code,
        ReturnVariableName: "matching",
        UsingStatements: usingStatements,
    });
};

export const Match = (
    input: string,
    statements: Array<TextParseStatement>,
    fGetVariables: () => TextParseVariable[],
    functions: TextParseFunction[]
): Promise<AxiosResponse> => {
    // Create the code
    const code: string=
        `var parser = new Parser(null);

        var stmtList = new StatementList(null);

        ${CodeForStatements(statements, "stmtList", fGetVariables, functions)}
        
        // Do the parse
        int matchingCount;
        parser.Extract(${EncodeString(input)}, null, stmtList, null, null, out matchingCount, (a,b,c)=>null, ${InitRunState(functions, fGetVariables)});`;

    const usingStatements: string[] = [];

    // Call the API to do the execution
    const url=CreateAPIURL("TextParse/ExecuteMatch");
    return axios.post(url, {
        Code: code,
        ReturnVariableName: "matchingCount",
        UsingStatements: usingStatements
    });
};

// Execute built in example
export const ExecuteBuiltInExample = (
    input: string,
    type: eParseBuiltInExample
): Promise<AxiosResponse> => {

    // Call the API to do the execution
    const url=CreateAPIURL("TextParse/ExecuteBuiltInExample");
    return axios.post(url, {
        Example: type,
        Input: input
    });

};

const CodeForStatements_AddStatement: (stmtCode: string, stmtListName: string) => string = (stmtCode: string, stmtListName: string): string => {

    return `${stmtListName}.Add(${stmtCode});`;
};

const fCodeForStatements_GenerateVarName = (): () => string => {

    let id=1;

    return () => {
        const rv=`_stmt${id}`;

        ++id;

        return rv;
    }
};

const CodeForStatements = (
    statements: Array<TextParseStatement>,
    stmtListName: string,
    fGetVariables: () => TextParseVariable[],
    functions: TextParseFunction[]
): string => {
    let rv="";

    const log: string="null";

    const AddStatement=(code: string) => CodeForStatements_AddStatement(code, stmtListName);

    const GenVarName = fCodeForStatements_GenerateVarName();

    statements.forEach(iterStmt => {
        var stmtCode=iterStmt.GenerateCode(log, AddStatement, fGetVariables, functions, GenVarName);
        rv=rv.concat(stmtCode);
    });

    return rv;
};