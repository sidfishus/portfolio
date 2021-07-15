
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { PortfolioBase, ICarouselImg } from "./PortfolioBase";
import { Code, SegmentDemo, SegmentSubSection } from "../Presentation";
import { Segment } from "semantic-ui-react";
import { eScreenResolution } from "../Client App";

export interface IScriptableTemplatePortfolioProps extends IRoutedCompProps {
};

export const ScriptableTemplatePortfolio: React.SFC<IScriptableTemplatePortfolioProps> = (props) => {
    return (
        <PortfolioBase
            {...props}
            writeUp={WriteUp(props)}
            carouselImgs={carouselImgs}
        />
    );
};

const carouselImgs : ICarouselImg[] =[
    {
        src: "https://raw.githubusercontent.com/sidfishus/scriptabletemplate/master/output_html_borders.jpg",
        text: "This is the output file produced by the above application when viewed in a web browser."
    },

    {
        src: "https://raw.githubusercontent.com/sidfishus/scriptabletemplate/master/output_html_noborders.jpg",
        text: "This is the output file produced by the above application but with the 'TableBorder' variable specified as 'false' in Main.cs."
    }
];

const WriteUp = (props: IScriptableTemplatePortfolioProps): JSX.Element => {

    const { mediaMatching } = props;
    if(!mediaMatching) return null;

    const firstMatching = mediaMatching.FirstMatching();
    const wrapCSharp = ((firstMatching == eScreenResolution.Mobile)?
        true:false);

    const wrapTablet = ((firstMatching == eScreenResolution.Mobile)?
        true:false);

    const isTablet = ((firstMatching == eScreenResolution.Tablet)?true:false);

    return (
        <>
            <SegmentDemo heading="Scriptable Template">
                <SegmentSubSection>
                    <p>ScriptableTemplate is a .NET Framework C# library I developed to remove code and text duplication in a generic way. Duplicated code and text is held within templates. Output files are then created via embedded script within the templates as well as C# code which parameterises the script according to it's own purpose.</p>
                </SegmentSubSection>
            </SegmentDemo>

            <SegmentDemo heading="Example Usage">
                <SegmentSubSection>
                    <p>I have used this for creating classic ASP web pages which follow the same general structure and contain a lot of repeated code by deriving from the 'Template' class and using templates for the web page and child controls. The resulting .asp files are produced according to a single C# class per output file which contains the page specific values and parameters. The benefits of this are the removal of repeated code (#1 rule of pragmatic programming...), an increase in productivity, as well as the ability to make wholesale changes to an entire application by changing the intermediary templates which the application is produced from.</p>
                    <p>I have also used this for generating statically parameterisable SQL stored procedures and views which share the same concepts and repeated code but with the performance benefits of inline SQL as opposed to moving anything that is repeated in to sub SQL views and functions. Also, bug fixes to the shared code can be deployed to all of the SQL functions and views which use it by a click of a button.</p>
                    <p>ScriptableTemplate will benefit any code/text that is repetitive, but the full applications of it is only limited by your imagination!</p>
                </SegmentSubSection>
            </SegmentDemo>

            <SegmentDemo heading="Notes">
                <SegmentSubSection>
                    <p>I created this on my lunch break at work because I could see it being a massive benefit to the productivity of my department at the time. Particularily on the 2 classic ASP applications we supported and developed due to the large swathes of repeated / similar code they both contained. Subsequently the syntax of the template script language this uses has been centered around the ease of parsing by a computer (to arrive at a working application quicker) as opposed to the ease of readability for a human. I would definitely consider improving the syntax in future versions if it was going to be used heavily and I had the resources to do it. </p>
                    <p>Features that are missing or that could be improved:</p>
                    <ul>
                        <li>The ability to comment the script code does not exist.</li>
                        <li>Whitespace in between text and script in templates carries across to the output file.</li>
                    </ul>
                </SegmentSubSection>
            </SegmentDemo>

            <SegmentDemo heading="Example">
                <SegmentSubSection>
                    <p>This is a simple example that can be used to create a HTML page based on a set of parameters and a dynamic dataset to illustrate basic usage of ScriptableTemplate. It consists of a HTML file which contains the static HTML template and the embedded script to output the dynamic parts, as well as a .cs file that uses the ScriptableTemplate engine to parameterise and use the template to generate the output file.</p>
                </SegmentSubSection>

                <SegmentSubSection heading="template.html">
                    <p>Script is encapsulated in between &#123;&#125; blocks. To escape a '&#123;', use '&#123;&#123;'. The full features and keywords that are available can be found by reading the ScriptableTemplate class code.</p>
                    <Code mediaMatching={mediaMatching}>
                    &lt;!DOCTYPE html&gt;<br /><br/>
                    &lt;html&gt;<br/>

                    &#9;&lt;head&gt;<br/>
                    &#9;&lt;title&gt;&#123;var:Title&#125;&lt;/title&gt;<br/>
                    &#9;&lt;style&gt;<br/>
                    &#9;&#9;&#123;if:IsTrue(var:TableBorder)&#125;<br/>
                    &#9;&#9;table, th, td &#123;&#123;<br/>
                    &#9;&#9;&#9;border: 1px solid black;<br/>
                    &#9;&#9;&#9;border-collapse: collapse;<br/>
                    &#9;&#9;&#125;<br/>
                    &#9;&#9;&#123;endIf&#125;<br/>
                    &#9;&lt;/style&gt;<br/>
                    &#9;&lt;/head&gt;<br/><br/>
                    &#9;&lt;body&gt;<br/>
                    &#9;&lt;table&gt;<br/>
                    &#9;&#9;&lt;thead&gt;<br/>
                    &#9;&#9;&#9;&lt;tr&gt;<br/>
                    &#9;&#9;&#9;&#9;&#123;for:i = 0 to {wrapTablet && <><br/>&#9;&#9;&#9;&#9;</>}
                        func:subtract(var:ColumnCount,1)&#125;<br/>
                    &#9;&#9;&#9;&#9;&#9;&lt;th&gt;&#123;var:Column[var:i]&#125;&lt;/th&gt;<br/>
                    &#9;&#9;&#9;&#9;&#123;endFor&#125;<br/>
                    &#9;&#9;&#9;&lt;/tr&gt;<br/>
                    &#9;&#9;&lt;/thead&gt;<br/><br/>

                    &#9;&#9;&lt;tbody&gt;<br/>
                    &#9;&#9;&#9;&#123;for:iRow = 0 to func:subtract(var:RowCount,1)&#125;<br/>
                    &#9;&#9;&#9;&#9;&lt;tr&gt;<br/>
                    &#9;&#9;&#9;&#9;&#123;assign:iterRow = var:Row[var:iRow]&#125;<br/>
                    &#9;&#9;&#9;&#9;&#123;for:iColumn = 0 to {wrapTablet && <><br/>&#9;&#9;&#9;&#9;</>}
                        func:subtract(var:ColumnCount,1)&#125;<br/>
                    &#9;&#9;&#9;&#9;&#9;&lt;td&gt;&#123;var:iterRow[var:iColumn]&#125;&lt;/td&gt;<br/>
                    &#9;&#9;&#9;&#9;&#123;endFor&#125;<br/>
                    &#9;&#9;&#9;&#9;&lt;/tr&gt;<br/>
                    &#9;&#9;&#9;&#123;endFor&#125;<br/>
                    &#9;&#9;&lt;/tbody&gt;<br/>
                    &#9;&lt;/table&gt;<br/>
                    &#9;&lt;/body&gt;<br/>
                    &lt;/html&gt;
                    </Code>
                </SegmentSubSection>

                <SegmentSubSection heading="Main.cs">
                    <p>Includes a main entry point to generate the output file when the application is executed.</p>
                    <Code mediaMatching={mediaMatching}>using System.Collections.Generic;<br/>
                    using Sid.ScriptableTemplate;<br/><br/>

                    namespace ConsoleApp2<br/>
                    &#123;<br/>
                    &#9;class Program<br/>
                    &#9;&#123;<br/>
                    &#9;&#9;static void Main(string[] args)<br/>
                    &#9;&#9;&#123;<br/>
                    &#9;&#9;&#9;var templ = new Template();<br/>
                    &#9;&#9;&#9;templ.TemplateDirectory = "..\\..\\";<br/><br/>

                    &#9;&#9;&#9;// Parameters<br/>
                    &#9;&#9;&#9;var variables = {wrapCSharp && <><br/>&#9;&#9;&#9;&#9;</>}
                        new Dictionary&lt;string, object&gt;();<br/>
                    &#9;&#9;&#9;variables.Add("Title","Example Web Page");<br/>
                    &#9;&#9;&#9;var columnHeadings = new string[] &#123;{wrapCSharp && <><br/>&#9;&#9;&#9;&#9;</>}
                        "String Column", "Int Column" &#125;;<br/>
                    &#9;&#9;&#9;variables.Add("Column",columnHeadings);<br/>
                    &#9;&#9;&#9;variables.Add("ColumnCount", {wrapCSharp && <><br/>&#9;&#9;&#9;&#9;</>}columnHeadings.Length);<br/>
                    &#9;&#9;&#9;variables.Add("TableBorder", true); //Toggle<br/><br/>

                    &#9;&#9;&#9;var data = GetDynamicData();<br/>
                    &#9;&#9;&#9;variables.Add("Row", data);<br/>
                    &#9;&#9;&#9;variables.Add("RowCount", data.Length);<br/><br/>

                    &#9;&#9;&#9;System.IO.File.WriteAllText({wrapCSharp && <><br/>&#9;&#9;&#9;&#9;</>}
                        "..\\..\\output.html",{(wrapCSharp || isTablet) && <><br/>&#9;&#9;&#9;&#9;</>}
                        templ.FormatTemplate("template.html",{wrapCSharp && <><br/>&#9;&#9;&#9;&#9;</>}
                        variables));<br/>
                    &#9;&#9;&#125;<br/><br/>

                    &#9;&#9;// Dynamic data e.g. via executing a SQL query<br/>
                    &#9;&#9;// To access column values from a row use array{wrapCSharp && <><br/>&#9;&#9;</>}
                        // index notation<br/>
                    &#9;&#9;static object[] GetDynamicData()<br/>
                    &#9;&#9;&#123;<br/>
                    &#9;&#9;&#9;var rv = new List&lt;object[]&gt;();<br/>
                    &#9;&#9;&#9;rv.Add(new object[] &#123; "Test", 1111 &#125;);<br/>
                    &#9;&#9;&#9;rv.Add(new object[] &#123; "Data", 23 &#125;);<br/>
                    &#9;&#9;&#9;rv.Add(new object[] &#123; "More data", 999 &#125;);<br/>
                    &#9;&#9;&#9;return rv.ToArray();<br/>
                    &#9;&#9;&#125;<br/>
                    &#9;&#125;<br/>
                    &#125;</Code>
                </SegmentSubSection>
            </SegmentDemo>
        </>
    );
};