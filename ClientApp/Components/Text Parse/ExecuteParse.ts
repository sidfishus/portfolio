
import { TextParseStatement } from "./StatementTypes";
import { HttpPostJSON, CreateAPIURL } from "../../Library/HttpHelper";

// Based on the list of statements, this creates and executes the C# code necessary to perform the parse.
// The reason for why I designed it like this is so we do not need an intermediate language that both the client
// and the backend understand in order to read/write/execute the parse statements. Writing the C# code directly
// means the Javascript client has access to all of the features available in the C# Text Parse library.

//sidtodo test with " in the input

export const Extract = (input: string, statements: Array<TextParseStatement>): void => {

    // Create the code
    const code: string=
        `var parser = new Parser(null);

        var matching = new List<string>();
        
        System.Func<RunState, string, int, string> onMatch = (runState, input, unused) => {
            int begin=(int)runState.GetVariable("ValueBegin");
            int end= (int)runState.GetVariable("ValueEnd");

            matching.Add(input.Substring(begin,end-begin));
            return "";
        };

        var stmtList = new StatementList(null);
        // Store the position at the beginning of the match
        stmtList.Add(new StorePosAsVariable(null, "ValueBegin"));

        ${CodeForStatements(statements)}
        
        // Remember the position immediately after the match
        stmtList.Add(new StorePosAsVariable(null, "ValueEnd"));
        
        // Do the parse
        int matchingCount;
        parser.Extract(@"${input}", null, stmtList, null, null, out matchingCount, onMatch);`;

    const usingStatements: string[] = [
        "System.Collections.Generic"
    ];

    // Call the API to do the execution
    const url=CreateAPIURL("TextParse/ExecuteExtract");
    HttpPostJSON(url, {
        Code: code,
        ReturnVariableName: "matching",
        UsingStatements: usingStatements
    }).then(res => {

    }).catch(res => {

        //sidtodo exception
        alert("failed");
    });
};

const CodeForStatements_AddStatement: (stmtCode: string) => string = (stmtCode: string): string => {

    return `stmtList.Add(${stmtCode});`;
};

const CodeForStatements = (statements: Array<TextParseStatement>): string => {
    let rv="";

    const log: string="null";

    statements.forEach(iterStmt => {
        rv=rv.concat(iterStmt.GenerateCode(log, CodeForStatements_AddStatement));
    });

    return rv;
};