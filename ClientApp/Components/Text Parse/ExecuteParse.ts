
import { TextParseStatement } from "./StatementTypes";
import { CreateAPIURL } from "../../Library/HttpHelper";
import axios, { AxiosResponse } from "axios";

// Based on the list of statements, this creates and executes the C# code necessary to perform the parse.
// The reason for why I designed it like this is so we do not need an intermediate language or another way of
// expressing the parse statements that both the client and the backend understand in order to
// read/write/execute the parse statements. Writing the C# code directly means the Javascript client has access to
// all of the features available in the C# Text Parse library.

export const EncodeString = (str: string): string => {
    return `@"${str.replace(`"`,`""`)}"`;
};

export const Replace = (input: string, statements: Array<TextParseStatement>, replaceFormat: string): Promise<AxiosResponse> => {

    // Create the code
    const code: string=
        `var parser = new Parser(null);

        var matching = new List<string>();

        var stmtList = new StatementList(null);

        Dictionary<string, Capture> capturing = new Dictionary<string, Capture>();

        ${CodeForStatements(statements, "stmtList")}
                
        // Do the parse
        int matchingCount;
        react_spa.Controllers.ReplaceRV rv;
        rv.ReplacedText=parser.Replace(${EncodeString(input)}, ${EncodeString(replaceFormat)}, stmtList, capturing, null, out matchingCount, null);
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

export const Extract = (input: string, statements: Array<TextParseStatement>, matchFirstOnly: boolean, replaceFormat: string): Promise<AxiosResponse> => {

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

        ${CodeForStatements(statements, stmtListName)}${firstOnlyConditional}
                
        // Do the parse
        int matchingCount;
        parser.Extract(${EncodeString(input)}, null, stmtList, null, null, out matchingCount, onMatch);`;

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

export const Match = (input: string, statements: Array<TextParseStatement>): Promise<AxiosResponse> => {
    // Create the code
    const code: string=
        `var parser = new Parser(null);

        var stmtList = new StatementList(null);

        ${CodeForStatements(statements, "stmtList")}
        
        // Do the parse
        int matchingCount;
        parser.Extract(${EncodeString(input)}, null, stmtList, null, null, out matchingCount, (a,b,c)=>null);`;

    const usingStatements: string[] = [];

    // Call the API to do the execution
    const url=CreateAPIURL("TextParse/ExecuteMatch");
    return axios.post(url, {
        Code: code,
        ReturnVariableName: "matchingCount",
        UsingStatements: usingStatements
    });
};

const CodeForStatements_AddStatement: (stmtCode: string, stmtListName: string) => string = (stmtCode: string, stmtListName: string): string => {

    return `${stmtListName}.Add(${stmtCode});`;
};

const CodeForStatements = (statements: Array<TextParseStatement>, stmtListName: string): string => {
    let rv="";

    const log: string="null";

    const AddStatement=(code: string) => CodeForStatements_AddStatement(code, stmtListName);

    statements.forEach(iterStmt => {
        var stmtCode=iterStmt.GenerateCode(log, AddStatement);
        rv=rv.concat(stmtCode);
    });

    return rv;
};