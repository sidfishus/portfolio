
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { PortfolioBase, ICarouselImg, CreateRepoUrl } from "./PortfolioBase";
import { Table, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Code, SegmentDemo, SegmentSubSection } from "../Presentation";
import { eScreenResolution } from "../Client App";

export interface ITextParsePortfolioProps extends IRoutedCompProps {
};

export const TextParsePortfolio: React.SFC<ITextParsePortfolioProps> = (props) => {
    return (
        <PortfolioBase
            {...props}
            writeUp={WriteUp(props)}
            carouselImgs={carouselImgs}
        />
    );
};

const carouselImgs : ICarouselImg[] = [
    {
        src: CreateRepoUrl("wwwroot/img/textparse/palindromeexample.jpg"),
        text: "Example which determines whether a word is a palindrome."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/extractpalindromeexample.jpg"),
        text: "Example which extracts the words which are palindromes."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/captureextractexample.jpg"),
        text: "Example which extracts values using a replace format."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/replaceparenexample.jpg"),
        text: "Example which converts VB script to VB .NET (function calls)."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/statementtypes.jpg"),
        text: "List of statement types (subset available in the UI)."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/customfunction1.jpg"),
        text: "Custom function creation."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/customfunction2.jpg"),
        text: "Custom functions and custom variable creation."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/customfunction3.jpg"),
        text: "Custom functions and custom variables."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/customfunction4.jpg"),
        text: "Custom functions and custom variables."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/customfunction5.jpg"),
        text: "Custom functions and custom variables."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/userdefinedvariables.jpg"),
        text: "User defined variables."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/customcomparison1.jpg"),
        text: "Custom comparisons."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/customcomparison2.jpg"),
        text: "Custom comparisons."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/customcomparison3.jpg"),
        text: "Custom comparisons."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/customcomparison4.jpg"),
        text: "Custom comparisons."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/customcomparison5.jpg"),
        text: "Custom comparisons."
    },

    {
        src: CreateRepoUrl("wwwroot/img/textparse/consoleoutput1.jpg"),
        text: "The generated C# code is output to the console."
    },
];

const WriteUp = (props: ITextParsePortfolioProps): JSX.Element => {

    const { mediaMatching } = props;

    if(!mediaMatching) return null;

    const firstMatching =mediaMatching.FirstMatching(); 

    const wrapSample = ((firstMatching === eScreenResolution.Mobile)?true:false);
    const isTablet = ((firstMatching === eScreenResolution.Tablet)?true:false);

    return (
        <>
            <SegmentDemo heading="Text Parse Library">
                <SegmentSubSection>
                    <p>TextParse is a .NET C# library I created for parsing and replacing text. The principal behind it is that the user uses C# class syntax to describe a series of steps that encapsulates a parse routine which is then executed iteratively in a linear fashion against the specified input text. The use case for it's creation was to create a parser that:</p>
                    <ol>
                    <li>Can parse complex formats.</li>
                    <li>Is accurate.</li>
                    <li>Terse but easily understandable for a programmer.</li>
                    <li>Gives good feedback and diagnostics.</li>
                    <li>Is easy to reuse.</li>
                    <li>Is expandable.</li>
                    <li>Can be used with automatic unit and regression testing.</li>
                    </ol>
                    <p>The full code for this library can be found at <a href="https://github.com/sidfishus/TextParse">https://github.com/sidfishus/TextParse</a>.</p>
                    <p>See below for more details.</p>
                </SegmentSubSection>
            </SegmentDemo>

            <SegmentDemo heading="Concept">
                <SegmentSubSection heading="Background">
                    <p>I was tasked with a project to convert a large ERP web application from classic ASP to ASP .NET because support for it from Microsoft was soon to expire. The application consisted of 13 modules including 100's of sourcecode files and after making the changes necessary to convert a single file it was clear that an automated process was needed.</p>
                    <p>Classic ASP uses the VB script language for dynamic rendering whereas ASP .NET uses VB .NET. After manually converting a couple of code files to ASP .NET there seemed to be approximately 20 syntactical differences between the languages. Effectively what I was looking to achieve was to create a transpiler that converts from VB script to VB .NET.
                    I fathomed that if each 'type' of syntax conversion would take 1-3 days to complete it would be an acceptable amount of time to automate the conversion of the entire application considering there are approximately 20 of them.</p>
                    <p>I started my investigation by trying regular expressions which I've successfully used to do simple parsing in the past. I quickly gave up on this idea because it was clear I would have to become the regex master of master's in order to achieve what I needed. I also did not appreciate the unintuitive syntax, lack of readability, or the inability to extend or add diagnostic tools or gain any kind of feedback. It seemed to me like a black box consisting of only mathematical jargon. I then considered using other existing parsing tools but steered away from this because I did not want to spend time learning somebody else's work only to be frustrated with it's usage and learn it only does 90% of what I need. If I created my own parser however I would be completely in control and could design it from the ground up to work exactly how I wanted it to.</p>
                    <p>My process in theory was to:</p>
                    <ol>
                    <li>Choose one of the application modules and run the conversion against it.</li>
                    <li>Test that module until a bug/syntax error was found.</li>
                    <li>Fix the parse operation that deals with converting that particular syntax or create a new one.</li>
                    <li>Goto step 1 until no more bugs are found during testing.</li>
                    <li>Move on to the next module but include the module(s) already converted.</li>
                    </ol>
                    <p>After each execution of the conversion I could use Microsoft Team Foundation Server to 'diff' the changed files for changes before checking them in. This would serve as a method of regression testing and unit testing to ensure that any new changes to the library and conversion operations made in that iteration had not broken anything, so I was never going two steps forward and then one step back. The annotate ('blame' in Git) feature would come in handy when errors were found to determine at what iteration a breaking change was introduced and therefore give me a starting point for fixing the issue.</p>
                    <p>The parser library itself was completed but the conversion project was stopped early on after I had successfully completed and tested 2 of the syntax changing operations. I have since used it to parse and transform XML and HTML and other formats of text and it is always my first choice for any parsing project.</p>
                </SegmentSubSection>

            <SegmentSubSection heading="Theory">
                <SegmentSubSection nested={1} heading="User Created Parse Algorithms (UCPA)">
                    <p>I figured that it should be possible to parse and replace/convert anything providing I could describe the routine as a series of steps and checks. E.g. to match against words that contain only a series of lowercase a-z characters you could describe the algorithm in psuedo as follows:</p>
                    <ol>
                    <li>Validate that we are at the beginning of the input text, or the preceding character is whitespace. <br/><Code inline>// Validate beginning of word</Code></li>
                    <li>Validate that the character at the current position is lowercase and is a-z. <br/><Code inline>// Validate word is at least one character in length</Code></li>
                    <li>Move until a character is found that is not lower case a-z, or we find the end of the string. <br/><Code inline>// Find the first non a-z character</Code></li>
                    <li>Validate that we have reached the end of the text, or the current character is a space. <br/><Code inline>// Reached the end of the word</Code></li>
                    </ol>
                    <p>When described in this manner it is very easy to understand the intention and purpose of each step as well as the algorithm as a whole - at least it seems this way to me as someone who has been programming since 2001. Furthermore, if the four steps are encapsulated into their own sub routine and are given an apt name it could be reused in future. This will reduce bugs (it's already tested) and increase the readability of parse algorithms by making them more terse (remove duplication by turning 4 steps in to 1). It's also trivial to create unit tests to prove the accuracy of the sub routine as well as provide regression testing as the parse library evolves over time.</p>
                </SegmentSubSection>

                <SegmentSubSection heading="Outer Linear Parse Algorithm (OLPA)">
                    <p>The next thing to consider is how the UCPA should be executed and therefore there are 2 algorithms in play:</p>
                    <ol>
                    <li>The OLPA which executes in a linear fashion starting at the first character and stops when the end of the input text is found. At each iteration the UCPA is executed from the OLPA's current position. If an iteration results in an unsuccessful match from the UCPA the OLPA will incremement it's last recorded position by 1 and continue iterating from there. However if the iteration results in a successful match from the UCPA, the OLPA records the position of where the UCPA finishes and continues iterating from the new position.</li>
                    <li>The UCPA starts at the position passed to it by the OLPA and executes parse statements in a sequential manner until a validation returns false or there are no more parse statements. Each time a parse statement is executed the resulting position is passed on to the next parse statement in the sequence. The UCPA can move anywhere in the input string.</li>
                    </ol>
                </SegmentSubSection>

                <SegmentSubSection heading="Individual Statements">
                    <p>Each individual parse statement would be an instance of a given type of operation/validation that would be passed the same parameters to perform it's specific task. The parameters/result value are:</p>
                    <ol>
                    <li>The input text that is being parsed.</li>
                    <li>The position within the input text to begin at.</li>
                    <li>An object that can be used to access and update state information such as UCPA defined variables.</li>
                    <li>The output position within the input text, or a value to indicate stop/unsuccessful match (result).</li>
                    </ol>
                    <p>New statements could be added over time as/when needed to further extend the parse library and make it as reusable as possible. I.e. there would be a built in statement type that acts as a string comparison, and a statement type that acts as the 'OR' operator, for example. And it should be possible to combine statements together to increase their reusability.</p>
                </SegmentSubSection>
            </SegmentSubSection>
        </SegmentDemo>

        <SegmentDemo heading="Practical">
            <SegmentSubSection heading="Initial Approach">
                <p>Now I could describe what I wanted to achieve, I needed a way of conveying that to an application so that it could be translated and executed but at the same time remain understandable to a computer programmer.</p>
                <p>My first idea was to create a psuedo language that could be parsed and converted to a list of parse statement objects (I was heavily into OO at the time) that would make up the parse statement list (UCPA) that would be passed to the OLPA for execution. The parse statement classes would all derive from a common interface (IComparisonWithAdvance) and leverage polymorphism to allow them to be used via a reference to the interface. This is key because it allows any type, combination, or list of parse statements to be used anywhere that a single parse statement is required because everything that can be executed as part of a UCPA derives from the same interface and implements the same parse interface method. For example this is very useful for the 'or' statement which takes a list of parse statements and executes them sequentially until a match is found because it makes the following algorithm possible:</p>
                <ol>
                <li>Compare against string 'test' (string comparison)</li>
                <li>OR
                <ol>
                <li>Compare against string 'hello'</li>
                <li>AND THEN Compare against a single character in the sequence 1, 2, or 3.</li>
                </ol>
                </li>
                </ol>
                <p>The second parse statement of the 'or' is a combination of statements and because the parse statement list class ('StatementList') derives from the same interface as an individual parse statement (IComparsonWithAdvance), the parse statement list type can be used anywhere a parse statement is required. Thus removes the need for the caller to have any knowledge of how the parse statement is implemented. The only contract between the 'or' statement and it's child parse statements is that the child will be given the input text and a starting position and will return an output position alongside a result indicating whether it was a successful match.</p>
                <p>The statement types can be 1 of 2 categories:</p>
                <ul>
                <li>Comparison: validate from the given position, return the output position, and return true false to indicate whether the match was successful.</li>
                <li>Operation: do something and return the output position. For example this could be setting a user defined variable where the output position will be returned as the input position, or moving to elsewhere within the input text and returning that position.</li>
                </ul>
                <p>The only difference in terms of syntax/execution is that an operation cannot cause the parsing to stop. I've since concluded that this distinction of categories is not necessary and the same result could be achieved by simply returning the output position or -1 to indicate an unsuccessful validation.</p>
            </SegmentSubSection>

            <SegmentSubSection heading="Programming Language/Platform">
                <p>I had already decided that I would be designing this using an object oriented approach. So I decided to create the library in .NET and C# due to the plethora of inbuilt functionality and simple but intuitive OO syntax. Having a gargage collector would also reduce the complexity allowing me to focus on making the parser as accurate and resilient as possible. I was focusing on accuracy and human readability as opposed to performance, however after parsing entire directories containing 100's of files I am more than satisfied with the performance.</p>
            </SegmentSubSection>

            <SegmentSubSection heading="Progress">
                <p>I quickly gave up on the idea of creating a psuedo language because it was taking me too long to parse it and was too verbose and difficult to follow when describing complex parse algorithm's. However the C# class syntax I was already using to create the parse statement objects as a result of parsing the psuedo language seemed appropriate for the task and had the added benefit of removing the need for an intermediate language.</p>
            </SegmentSubSection>

            <SegmentSubSection heading="Simple Example">
                <p>Below is a simple example I created for the purpose of illustrating the syntax of a TextParse program.
                    For more complex examples see the built in examples <Link to="/textparse">here</Link>:
                </p>
                <Code mediaMatching={mediaMatching}>using System;<br/>
                using Sid.Parse.TextPatternParser;<br/>
                using StringComparison = {wrapSample && <><br/>&#9;</>}Sid.Parse.TextPatternParser.StringComparison;<br/>
                using Sid.Log;<br/><br/>

                namespace TextParseTesting<br/>
                &#123;<br/>
                &#9;class Program<br/>
                &#9;&#123;<br/>
                &#9;&#9;static void Main(string[] args)<br/>
                &#9;&#9;&#123;<br/>
                &#9;&#9;&#9;ILog log=null;<br/>
                &#9;&#9;&#9;var stmtList = new StatementList(log);<br/>
                &#9;&#9;&#9;var orStmt=new OrComparison(log);<br/><br/>

                &#9;&#9;&#9;var options=new Options(log);<br/>
                &#9;&#9;&#9;options.CaseSensitive=false;<br/>

                &#9;&#9;&#9;var knownGreetings={wrapSample && <><br/>&#9;&#9;&#9;&#9;</>}
                    new string[]&#123;"hello","hi","hey","yo","hiya"&#125;;<br/>
                &#9;&#9;&#9;Array.ForEach(knownGreetings,{wrapSample && <><br/>&#9;&#9;&#9;&#9;</>}
                    (str) =&gt; orStmt.Add(new StringComparison({wrapSample && <><br/>&#9;&#9;&#9;&#9;</>}
                    log,options,str)));<br/>
                &#9;&#9;&#9;stmtList.Add(orStmt);<br/><br/>

                &#9;&#9;&#9;Console.WriteLine("Hello.. (please respond)");<br/>
                &#9;&#9;&#9;var userInput=Console.ReadLine();<br/><br/>

                &#9;&#9;&#9;var parser=new Parser(log);<br/>
                &#9;&#9;&#9;int numMatches;<br/>
                &#9;&#9;&#9;parser.Extract(userInput,null,stmtList,null,{wrapSample && <><br/>&#9;&#9;&#9;&#9;</>}
                    null,out numMatches,{(wrapSample || isTablet) && <><br/>&#9;&#9;&#9;&#9;</>}
                    (unused1,unused2,unused3)=&gt;null,null);<br/><br/>

                &#9;&#9;&#9;Console.WriteLine("Greeting &#123;0&#125;understood.",{wrapSample && <><br/>&#9;&#9;&#9;&#9;</>}
                    ((numMatches&gt;=1)?"":"not "));<br/>
                &#9;&#9;&#125;<br/>
                &#9;&#125;<br/>
                &#125;</Code>
            </SegmentSubSection>
        </SegmentDemo>

        <SegmentDemo heading="Types / Interfaces / Classes">
            <SegmentSubSection>
                <p>Below is the list of types e.t.c. that a user/developer may need to be concerned with when using the parser:</p>
                    <Table compact>
                    <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Type e.t.c.</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    <Table.Row>
                    <Table.Cell>ComparisonWithAdvanceBase</Table.Cell>
                    <Table.Cell>Helper base class for comparison type parse statements</Table.Cell>
                    <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>fOperand</Table.Cell>
                    <Table.Cell>A delegate that has access to the input string, current position, and run state. The generic type parameter determines the resulting type</Table.Cell>
                    <Table.Cell>For example used to parameterise parse statements with dynamic values such as the offset in a string offset comparison</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>IAssertion</Table.Cell>
                    <Table.Cell>An interface that all assertions must implement</Table.Cell>
                    <Table.Cell>A given parse statement can have any number of assertions associated with it. These assertions are executed after a parse statement has finished. Used for identifying bugs</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>IComparison</Table.Cell>
                    <Table.Cell>An interface for comparison type parse statements which do not advance</Table.Cell>
                    <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>IComparisonWithAdvance</Table.Cell>
                    <Table.Cell>The interface that all comparison parse statements that advance must implement</Table.Cell>
                    <Table.Cell>Parse sub routines should return an instance of this interface</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>IOperation</Table.Cell>
                    <Table.Cell>The interface that all operation type parse statements must implement</Table.Cell>
                    <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>IStatement</Table.Cell>
                    <Table.Cell>The root interface for parse statements</Table.Cell>
                    <Table.Cell>Contains declarations for the members required in both comparison and operation sub categories</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>PositionAssertion</Table.Cell>
                    <Table.Cell>Assert for a particular parse statement what the expected output position and result should be in relation to the start position</Table.Cell>
                    <Table.Cell>Used for identifying the individual parse statement(s) that are not working in complex UCPA's that are giving unexpected results</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>RunState</Table.Cell>
                    <Table.Cell>Singleton class which holds the parse state</Table.Cell>
                    <Table.Cell>Is used to access user defined variables and functions</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>StatementBase</Table.Cell>
                    <Table.Cell>Root base class for parse statements</Table.Cell>
                    <Table.Cell>Contains the members required in both comparison and operation sub categories</Table.Cell>
                    </Table.Row>
                    </Table.Body>
                    </Table>
                </SegmentSubSection>
            </SegmentDemo>

            <SegmentDemo heading="Statement Types">
                <SegmentSubSection>
                    <p>Below is the current list of statement types with notes explaining their usage:</p>
                    <Table compact>
                    <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Parameter(s)</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    <Table.Row>
                    <Table.Cell>Advance</Table.Cell>
                    <Table.Cell>Position (fOperand)</Table.Cell>
                    <Table.Cell>Advance to the position denoted by the position operand</Table.Cell>
                    <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Advance If</Table.Cell>
                    <Table.Cell>Comparison (IComparisonWithAdvance)</Table.Cell>
                    <Table.Cell>Optionally advance if the comparison returns true</Table.Cell>
                    <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Advance to the End</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>Advance to the end of the input text</Table.Cell>
                    <Table.Cell>Can be used to prematurely stop the OLPA for example to improve performance if only a single match is required</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Advance Until Comparison</Table.Cell>
                    <Table.Cell>Comparison (IComparisonWithAdvance), forwards (bool)</Table.Cell>
                    <Table.Cell>Advance until the comparison returns true.</Table.Cell>
                    <Table.Cell>If the end of the input string is reached without the comparison matching, false is returned (no match)</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Advance While Operation</Table.Cell>
                    <Table.Cell>Comparison (IComparisonWithAdvance)</Table.Cell>
                    <Table.Cell>Advance whilst the comparison returns true</Table.Cell>
                    <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Capture</Table.Cell>
                    <Table.Cell>Comparison (IComparsonWithAdvance)</Table.Cell>
                    <Table.Cell>Extract the text which matches 'comparison'.</Table.Cell>
                    <Table.Cell>Captured text is stored against a given name/identifier and is available when the UCPA reaches the end of a successful match. Same idea as the capture feature found in regex</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Char Comparison</Table.Cell>
                    <Table.Cell>Chr (char)</Table.Cell>
                    <Table.Cell>Compare the character at the current position with 'Chr'</Table.Cell>
                    <Table.Cell>The options parameter specifies case sensitivity</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Char Delegate Comparison</Table.Cell>
                    <Table.Cell>Char delegate (bool (char))</Table.Cell>
                    <Table.Cell>Compare the character at the current position against a delegate taking that character as a parameter</Table.Cell>
                    <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Compare No Advance</Table.Cell>
                    <Table.Cell>Comparison (IComparison)</Table.Cell>
                    <Table.Cell>Run a comparison but return the original position. I.e. validate but don't move forward</Table.Cell>
                    <Table.Cell>Can be used as a replacement for the look around feature found in regex</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Custom Comparison</Table.Cell>
                    <Table.Cell>Custom comparison delegate (bool (int,string,RunState))</Table.Cell>
                    <Table.Cell>Compare and advance according to a user specified delegate</Table.Cell>
                    <Table.Cell>Only use if an existing statement or sub routine does not achieve your goal and it doesn't make sense to reuse it in the future</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Delimited List Comparison</Table.Cell>
                    <Table.Cell>Comparison (IComparisonWithAdvance), seperator (IComparisonWithAdvance)</Table.Cell>
                    <Table.Cell>Parse a delimited list where values are compared against 'Comparison' and are delimited by the 'seperator' comparison</Table.Cell>
                    <Table.Cell>It's possible to specify a minimum and maximum number of items expected</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Match Everything Comparison</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>Return the current position plus 1</Table.Cell>
                    <Table.Cell>This is the same as using the advance operation with a forward value of 1. May be useful in situations where this name describes the algorithm more intuitively</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Nested Open Close Comparison</Table.Cell>
                    <Table.Cell>Open (IComparisonWithAdvance), close (IComparisonWithAdvance)</Table.Cell>
                    <Table.Cell>This is quite niche. Matches against the open comparison and advances until the close comparison is found. The number of 'close' comparisons must match the number of 'open' comparisons in order to stop - hence 'nested'</Table.Cell>
                    <Table.Cell>For example can be used to validate function calls in text by using '(' as the open comparison and ')' as the close comparison</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Not Comparison</Table.Cell>
                    <Table.Cell>Comparison (IComparison)</Table.Cell>
                    <Table.Cell>Run a comparison but invert the result</Table.Cell>
                    <Table.Cell>This does not advance</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Or Comparison</Table.Cell>
                    <Table.Cell>Comparison list (IList)</Table.Cell>
                    <Table.Cell>Match one of a list of comparisons, simulates an 'or' in programming terms</Table.Cell>
                    <Table.Cell>The comparisons are executed from the first item (index 0) upwards and it is the first matching comparison that controls how far to advance</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Set Log Level</Table.Cell>
                    <Table.Cell>Level (int)</Table.Cell>
                    <Table.Cell>Update the log level</Table.Cell>
                    <Table.Cell>Can be used to increase/decrease logging verbosity</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Set Variable</Table.Cell>
                    <Table.Cell>Variable name (string), value (fOperand)</Table.Cell>
                    <Table.Cell>Assign the value to a user defined variable</Table.Cell>
                    <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Start of Input String Comparison</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>Returns true if the current position is the beginning of the input text</Table.Cell>
                    <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Statement List</Table.Cell>
                    <Table.Cell>List</Table.Cell>
                    <Table.Cell>Execute a list of parse statements until the end is reached or a comparison returns no match</Table.Cell>
                    <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Store Position as Variable</Table.Cell>
                    <Table.Cell>Variable name (string)</Table.Cell>
                    <Table.Cell>Store the current position as a variable</Table.Cell>
                    <Table.Cell>For example if you need to refer back to this position at a later date</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>String Comparison</Table.Cell>
                    <Table.Cell>Compare string, options</Table.Cell>
                    <Table.Cell>Compare the string at the current position in the input text against the compare string</Table.Cell>
                    <Table.Cell>The options parameter specifies case sensitivity</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>String Comparison Skip Whitespace</Table.Cell>
                    <Table.Cell>Str (string)</Table.Cell>
                    <Table.Cell>Compare the string at the current position in the input text against 'Str' but ignore any differences in whitespace</Table.Cell>
                    <Table.Cell>This is not necessary as it's own statement type. A sub routine that composes the other statement types could perform the same job</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>String Offset Comparison</Table.Cell>
                    <Table.Cell>Length (fOperand), offset (fOperand), reverse (bool)</Table.Cell>
                    <Table.Cell>Compare the string denoted by the current position in the input text and length parameter against another part of the input string denoted by the offset parameter</Table.Cell>
                    <Table.Cell>Used by the palindrome built in examples</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Toggle Log Status</Table.Cell>
                    <Table.Cell>Enable (bool)</Table.Cell>
                    <Table.Cell>Enable or disable the log</Table.Cell>
                    <Table.Cell></Table.Cell>
                    </Table.Row>
                    </Table.Body>
                    </Table>
                </SegmentSubSection>
            </SegmentDemo>

            <SegmentDemo heading="Text Parse User Interface Application">
                <SegmentSubSection>
                    <p>I have created an extensive ASP .NET MVC Core/React/Javascript application with a rich GUI
                    which leverages the latest features of each, as well as advertise my&#32;
                    <a href="https://github.com/sidfishus/TextParse">text parse library</a> and demonstrate what it can achieve
                    and how it works.
                    It can be used to create and execute a UCPA visually as opposed to through lines of code and may give a different perspective and deeper understanding.</p>
                    <p>The code for the entire application can be found at <a href="https://github.com/sidfishus/react-spa-demo">https://github.com/sidfishus/react-spa-demo</a>.</p>
                </SegmentSubSection>
            
                <SegmentSubSection heading="Usage">
                    <p>For each step, a cross or tick is displayed against the relevant section to denote whether all required information has been entered.</p>
                    <ol>
                    <li>Create user defined functions and variables if any are required.</li>
                    <li>Create the individual parse statements and arrange them in to the correct order.</li>
                    <li>Enter the parse text in the input section.</li>
                    <li>Select which type of parse routine you wish to use in the parse output section.</li>
                    <li>Press the execute parse button, it will be green or red depending on whether all required information has been entered.</li>
                    <li>The parse result(s) will display in the output section.</li>
                    <li>The .NET/C# application created will be printed to the web browser console.</li>
                    </ol>
                </SegmentSubSection>

                <SegmentSubSection heading="Technical">
                    <p>All of the information entered by the user for parsing is stored as functions/objects in the browser by React/Javascript/Babel. Upon parse execution in the front end all of this information is converted to the .NET/C# code necessary to execute the parse routine, and HTTP POST'd as a string to the ASP .NET MVC Core controller which handles parsing. The controller, utilising the Rosyln open source compiler assemblies (Microsoft.CodeAnalysis.CSharp), compiles and then executes the C# code which was passed to it, and returns the results of the parse back to the web application. Sending C# code via a HTTP message which is then compiled and executed may seem a security risk, but it is safe to do so in this case because only the assemblies required to run the parse application are referenced in the compiled executable. Also the task of compiling and executing the text parse application is encapsulated in to it's own thread and is given a timeout value. This protects against infinite loops which could cause the HTTP request to crash.</p>
                </SegmentSubSection>

                <SegmentSubSection heading="Features">
                    <ol>
                    <li>The majority of the parse statement types are available for use.</li>
                    <li>User defined functions.</li>
                    <li>User defined variables.</li>
                    <li>A variety of parse algorithms:
                    <ol>
                    <li>Match: display whether the input matches the parse statements.</li>
                    <li>Extract single: extract and display the first item which matches the parse statements.</li>
                    <li>Extract all: extract and display all items which match the parse statements.</li>
                    <li>Replace: replace entries matching the parse statement list according to the replace format and retain any text which does not match.</li>
                    </ol>
                    </li>
                    <li>7 fully working built in examples including a complex example which converts all classic ASP procedure calls to the ASP .NET equivalent.</li>
                    <li>The full C# code of the parse application produced is logged to the browser console window.</li>
                    </ol>
                </SegmentSubSection>
            </SegmentDemo>

            <SegmentDemo heading="Notes">
                <SegmentSubSection>
                    <ol>
                    <li>In order to build this library you will need to replace the clear text password inside the nuget.config file with '0adc4c95fb4b0b678a1e97f855a919086cf9f3dc' otherwise the 'dotnet restore' command will fail. If I include the clear text password (PAT) in the released/pushed (to Github) nuget.config file the PAT is automatically deleted. If for whatever reason the PAT I have given above stops working feel free to send me an email at <a href="mailto:sidnet001@gmail.com">sidnet001@gmail.com</a> to request a new one.</li>
                    </ol>
                </SegmentSubSection>
            </SegmentDemo>
        </>
    );
};