
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { ContainerDemo, SegmentDemo } from "../Presentation";
import { Link } from "react-router-dom";

export interface ICareerProps {
};

export const Career: React.FunctionComponent<ICareerProps & IRoutedCompProps> = (props) => {

    return (
        <ContainerDemo>
            <HouseConstructionCompany />
            <ProphetPLC />
        </ContainerDemo>
    );
};

/* //sidtodo here */
const HouseConstructionCompany: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="House Construction Company">
            <p>In my later years at Prophet I felt I had reached a plateau and was at the top of the learning curve.
                I had registered my CV on a job board and was receiving a substantial amount of emails from recruiters regarding .NET and web development jobs due to me having .NET experience.
            </p>

            <p>I could see the benefit of being experienced in both C++ and .NET/web technologies and it would hopefully open up more job opportunities as well.</p>
            <p>I began doing some web programming in my spare time: ASP .NET, Javascript, Babel/Webpack and React.
                I then got a job as a senior developer as part of a 3 person development team for a house construction company in February 2018 so I could get some professional experience.
                It appealed to me because I had a lot more control over the technologies used and the technical solutions employed, far more leeway than I ever had at Prophet.
                They had 2 large scale ERP SQL web applications hosted in classic ASP which they were looking to transition to ASP .NET and I would be the lead on this as well as take over the development leadership.
            </p>

            <p>My experience at Prophet was invaluable here as for example I introduced them to Microsoft Team Foundation Server as they were not using a source code management tool.</p>

            <p>
                My first project was to improve the report page creation process of the ERP web applications.
                Reports were web pages that contained a table consisting of rows and columns, and the ability to generate a PDF and CSV version of the same data.
                There were large swathes of repeated code in the reports so I created (in my lunch break) and utilised
                my <a href="https://github.com/sidfishus/ScriptableTemplate">Scriptable Template</a> to greatly speed up the process of creating reports.
                I go in to great detail about this works <Link to="/portfolio/scriptabletemplate">here</Link>.
                I took the aspects of the existing reports that were duplicated and moved them in to a template, and passed in the variables such as the
                title of report, database query, and columns as parameters to the template.
                This reduced the actual code required to produce a report to (depending on the number of columns) usually less than 100 lines of simple C# code.
            </p>
            <p>
                The current method of producing CSV and PDF output was also tedious because it involved re-executing the SQL query used to populate the web page and using a COM object
                to manually craft the PDF or CSV.
                Effectively the code for each report was replicated 3 times due to there being 3 formats (HTML, CSV and PDF).
                To me this was/is madness and the solution I came up with was simple: the report is already generated but in HTML format, why not simply convert that HTML to the other formats.
                I did some 'Googling' and found a third party library that can convert <a href="https://www.evopdf.com/html-to-pdf-converter.aspx">HTML into PDF</a>.
                I utilise this I wrote a helper COM object in C#/.NET/Interop that would facilitate the conversion to PDF by:
                <ol>
                    <li>Taking the report HTML string (accessed from the DOM in Javascript) as a parameter,</li>
                    <li>Parse it according to the markers to strip out the relevant parts,</li>
                    <li>Convert it to PDF using the third party library,</li>
                    <li>And then return the binary of the PDF to be viewed in the browser.</li>
                </ol>
                This was executed from the web page via a HTML button that when clicked would obtain the HTML from the DOM, use the VB script CreateObject function to create an instance of
                the COM object and call it to facilitate the conversion.
            </p>
            <p>
                I used a similar process to above to convert a HTML table in to CSV using
                the <a href="https://html-agility-pack.net/">HTML Agility Pack</a> .NET library to traverse the HTML table and churn out a CSV.
            </p>
            <p>
                The funamental principal was that the reports only had to be generated once.
                This principal, plus the use of my new scriptable template library now meant that new report pages could be created in a fraction of the time it was
                previously taking, as well as making them considerably easier to maintain due to there being no repetition.
            </p>

            <p>
                The next significant project I worked on was to convert the 2 classic ASP web systems to ASP .NET.
                To do this I created my <a href="https://github.com/sidfishus/TextParse">Text Parse</a> library.
                I go in to great detail about this <Link to="/portfolio/textparse">here</Link> and there is a live example <Link to="/textparse">here</Link>.
            </p>

            <h2>Acquisition</h2>
            <p>
                Not long after starting the .NET conversion project the company I was working for was acquired by a FTSE 250 housing company.
                They already had existing systems that replicated a lot of the functionality that our 2 ERP applications offered, and therefore any large scale development on them
                was given the kybosh and removed the need to convert the codebase from classic ASP to ASP .NET.
                There was a silver lining though, they did not do software development in house and decided to take on the 3 of us on to take over the support and development of
                their existing systems which were created and supported by a mish-mash of contractors and software houses.
                They were also looking to implement new systems in the future for which they were struggling to find off-the-shelf software solutions for.
                This is the position I am in currently.
                The acquisition has been advantageous to me because it means I'm professionally using the very latest web and cloud technologies such as Azure, React, Typescript
                and ASP .NET MVC Core and have a large opinion in what technologies are used going forward.
            </p>

            <h2>Intranet</h2>
            <p>
                When I joined, the company recently had a intranet built for them by a contractor who was leaving and this was handed over to me to develop and support.
                This is a modern mobile friendly isomorphic web application utilising ASP .NET MVC Core, Webpack, Typescript and React and is hosted as 2 app services in Azure -
                a ASP .NET MVC Core application that deals with authentication and executes and serves the Javascript user interface, and a seperate ASP .NET MVC Core API.
            </p>
            <p>
                It also utilises many Azure features such as:
                <ol>
                    <li>Queue storage for holding messages from Office365 Flow/Power Automate,</li>
                    <li>Blob storage for holding files such as images and logs,</li>
                    <li>Function apps to receive and duplicate articles from the customer facing external website via a HTTP message,</li>
                    <li>Cosmos/Document DB to hold all of the data,</li>
                    <li>Webjobs for handling blob and queue trigger events and for running scheduled processes,</li>
                    <li>Azure Active Directory including single sign on for authentication and access to the companies list of users.</li>
                </ol>
            </p>
            <p>
                Sharepoint is used to manage the content hosted on the intranet but also it's configuration via inbuilt Sharepoint functionality
                and Sharepoint SPFX webparts.
                The SPFX allows developers to create React/Javascript forms within the Sharepoint front-end that have access
                to the Sharepoint functionality and also the .NET API hosted in Azure all of the Azure features used by the intranet.
            </p>
            <p>
                I go in to detail regarding the organisational chart project I have completed <Link to="/portfolio/misc">here</Link>.
                I've also recently drastically improved the way that articles are created by creating a new dedicated SPFX webpart in React that features a better user
                interface and workflow to the original application.
            </p>

            <h2>Health and Safety Application</h2>
            <p>A ASP .NET MVC and React single page application which I created from scratch.
                I go in to a lot of detail about this <Link to="/portfolio/hands">here</Link>. 
                I'm currently working on the second phase of this project.
            </p>

            <h2>Customer Service Application</h2>
            <p>
                Whenever there is a fault with a house built by the company which is still under warranty the dedicated customer services applications are
                used to facilitate the issue being fixed. This consists of a variety of .NET/ASP .NET applications for which I am the lead developer on.
                The process is as follows:
                <ol>
                    <li>The house owner records the issue with the customer service department,</li>
                    <li>The Custom service department uses the client side .NET Windows GUI executable to record the issue and nominate a subcontractor.
                        Data is stored using SQL Server and is read/written by the application using MS Entity Framework and web services,
                    </li>
                    <li>
                        A server side .NET Windows service (Workflow Service) polls for various events and does the work necessary to progress the issue.
                        In the case of a subcontractor being nominated, it emails the subcontractor explaining they have been nominated to fix an issue.
                    </li>
                    <li>
                        The subcontractor email contains a link to the mobile application which is a ASP .NET application set up in IIS on premise.
                        Clicking on the link opens a screen where they can either accept or reject.
                    </li>
                    <li>
                        The Workflow Service sends email reminders and moves the issue on iteratively until the subcontractor has been to the appointment,
                        resolved the issue, and the customer has given confirmation of the fix.
                    </li>
                    <li>
                        The final application is another ASP .NET web application that the customer service department use as a dashboard to list
                        the open issues and their current state ordered by urgency/priority.
                    </li>
                </ol>
            </p>
            <p>
                {/* //sidtodo here */}
                Some features I have developed for this are:
                <ul>
                    <li>Ability for subcontractors to upload images against issues within the mobile application,</li>
                    <li>Switched the front-end of the dashboard from ASP .NET to React for far improved responsiveness,</li>
                    <li>A mass plot address import using Excel and VSTO,</li>
                </ul>
            </p>
        </SegmentDemo>
    );
};

// most complex algorithms
// forgotten over time
const ProphetPLC: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading={<a href="https://www.prophetize.com/">Prophet PLC</a>}>
            <p>
                I had my last exam in May 2006 and was rewarded with an upper second class batchelors degree with honours in computing.
                Around this time my friend had spotted a job in the local newspaper which they thought I suited.
                It was a role looking for junior programmers with experience of C++, COM, Windows API, MFC and SQL.
            </p>
            <p>
                I applied, had an interview which included a C++ test and was given the job!
                Prophet are the leading ERP software provider for the fresh food and horticultural industry.
                Prophet software is a steep learning curve but I proved my capabilities by instantly becoming fluent and quickly becoming an integral part of the programming team.
            </p>
            <p>
                I was continually being thrown into the deep end.
                Within the first 12 months I was the lead programmer on a software project to operate a robotic warehouse.
                This consisted of various cranes and conveyor belts that transport pallets, and contraptions like a fruit grader, and tipper, automatic barcode scanning.
                The warehouse was controlled by a PLC that ran on a Unix system.
                My software did all of the interfacing with the PLC which was via a TCP/IP Winsock socket connection and a protocol of messages known as "telegrams".
                My software ran in real time 24/7, and if it crashed or had a bug, it would literally bring the warehoue to a halt.
                We had examples where the PLC would send erroneous rogue telegrams and we had to prove this to the vendor by recording all telegrams sent and received.
            </p>

            <p>I did make mistakes in the beginning, I don't think I was ready for that sort of pressure but the project succeeded and I learned some valuable lessons.
                Working like this taught me the important aspect of software resilience.
                Forgetting to deallocate memory or using uninitialised variables were costly and also difficult to find errors.
            </p>

            <p>
                My software was a Win32 C++ executable consisting of multiple threads that were assigned different jobs, and the main thread that would continually poll/ping the other threads to ensure they were still alive.
                Commands to for example move a pallet would arrive from the main Prophet ERP application by way of a text file in a specified directory that was polled by one of the threads.
                Commands were then parsed and the appropriate sequence of telegrams were then sent to the PLC to perform the task.
                If there was an issue such as the pallet source location was inaccessible, the PLC would send a telgram back and I would have to determine a different strategy.
                I also created VB scripts that would house keep the warehouse when operating volumes were low, and determine the most appropriate destination location for incoming pallets based on the properties (date/grade/type) of the fresh produce on it.
            </p>

            <p>
                I was also the technical lead on a number of projects involving mobile devices that would run on .NET, for example delivery drivers where there was limited internet connectivity.
            </p>

            <p>
                My main area of expertise at Prophet was "EDI", which is the transmission of electronic data between trading companies.
                The consisted of types of XML files or messages that were produced according to an XSD standard which followed <a href="https://en.wikipedia.org/wiki/EDIFACT">EDIFACT</a>
                For example there was an order type, an <a href="https://en.wikipedia.org/wiki/Advance_ship_notice">ASN</a>, invoice, e.t.c.
                Incoming files/messages went through a complex pipeline of services that held them in a raw message queue, did various levels of validation, and handled them in the appropriate order and trigger the appropriate actions in the ERP database.
                Again these were real time systems where resilience and efficiency was key.
            </p>

            <p>
                In approximately 2013 I was promoted to the role of "lead developer".
                From then on I was writing less code and spent more time supervising other developers.
                Depending on the size and type of project, and developer availability, I could have up to 5 developers working for me.
                For projects I would typically receive a design specification which varied in quality, ask the designers questions until the design was actually complete, ask any technical questions.
                Then produce a programmer's document detailing the technical changes required and breaking the work in to parcels of work that could be distributed among the developers.
                I would answer any questions, and formally review their code to ensure a certain level of quality and that they had followed my instructions.
                I would typically do the harder pieces if I was not confident of the others, or lack of developer availability.
            </p>
            
            <p>Throughout all of this this period of my life I was continually put through my paces, and definitely helped with maturing in to an adult and earning my stripes to transition from a junior to a senior programmer</p>

            <p>The main technologies we used were Windows, C++, COM, STL, SQL, Delphi, C#/.NET, VB script, XML.</p>

            <p>A lot of the work involved highly complicated algorithms such as splitting database records, loading history and drip feeding records to be processed.
            </p>

            <p>Effectively had their own version of Entity Framework, where database records were mapped to C++ COM objects which had a number of interfaces and handled the business logic</p>
        </SegmentDemo>
    );
};