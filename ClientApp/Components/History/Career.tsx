
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

const HouseConstructionCompany: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="House Construction Company">
            <p>In my later years at Prophet I felt I had reached a plateau and was at the top of the learning curve.
                I had registered my CV on a job board and was receiving a substantial amount of emails from recruiters regarding .NET and web development jobs due to me having .NET experience.
            </p>

            <p>I could see the benefit of being experienced in both an expert in C++/web technologies, and would hopefully open up more job opportunities.</p>
            <p>I began doing some web programming in my spare time, ASP .NET, Javascript, Babel, React and got a job as a senior web developer as part of a 3 person development team for a house construction company in February 2018 so I could get some professional experience.
                They had 2 large scale ERP web applications which ran on classic ASP that they were looking to transition to ASP .NET and I would be the lead on this as well as take over the development leadership.
            </p>

            <p>My experience at Prophet was invaluable here as for example I brought in the use of the Microsoft Team Foundation Server for source code management and introduced processes I had used there.</p>

            <p>My first project was to improve the report page creation process.
                Reports were web pages of the application, written in classic ASP that would query the database to display a list of columns and rows.
                As well as having functionality to generate a PDF and CSV version of the report.
                There were large swathes of repetition in the code base so I created (in my lunch break) and utilised my <a href="https://github.com/sidfishus/ScriptableTemplate">Scriptable Template</a> to greatly speed up the creation of report pages.
                I go in to great detail about this works <Link to="/portfolio/scriptabletemplate">here</Link>.
                I took the aspects of the existing reports that were replicated and moved them in to a template, and passed in the parameters such as the title of report, database query, and columns.
                This reduced the actual code required to produce a report to (depending on the number of columns) usually less than 100 lines of simple C# code.
                The current method of producing CSV and PDF output was tedious because it involved re-executing the SQL query and using a COM object to manually craft the PDF or CSV.
                Effectively the code for each report was replicated 3 times due to the 3 formats (HTML, CSV and PDF).
                There had to be a better way to do it than this surely.
                I did some googling and found a third party library that would convert from <a href="https://www.evopdf.com/html-to-pdf-converter.aspx">HTML to PDF</a>.
                To utilise this I added some markers in the produced HTML of the report which were HTML comments indicating which parts of the HTML that I wanted to convert to PDF.
                I wrote a helper COM object in .NET that would take a HTML string as a parameter, parse it according to the markers, convert it to PDF using the library, and then return that to be viewed through the library.
                I added a HTML button that when clicked would obtain the HTML from the DOM, use the VB script CreateObject function to create my COM object and do the parsing.
                I did a similar concept to convert a HTML table to CSV using the <a href="https://html-agility-pack.net/">HTML Agility Pack</a> .NET library.
                The whole point of this was so that the HTML was only required to be produced once.
            </p>

            <p>
                The next project was to convert the 2 classic ASP web systems to ASP .NET.
                To do this I created my <a href="https://github.com/sidfishus/TextParse">Text Parse</a> library.
                I go in to great detail about this <Link to="/portfolio/textparse">here</Link> and there is a live example <Link to="/textparse">here</Link>.
            </p>

            <h2>Acquisition</h2>
            <p>
                Not long after starting the .NET conversion project the company I was working for was acquired by a FTSE 250 company.
                They already had existing systems in place and would eventually be phasing out our 2 web systems, any large scale development on them was given the kybosh.
                They did not however do any development in house so they took the 3 of us on to take over the support and development of their existing bespoke systems created for them by contractors and software vendors.
                This is the position I am in currently.
            </p>

            <h2>Intranet</h2>
            <p>
                They have an intranet which is a modern web application utilising ASP .NET Core, Webpack, Typescript, React, Cosmos DB, and is hosted in Azure.
                Many Azure features are used such as App Services, the application is split between an API process and a client process.
                Azure storage: queues, blobs.
                Azure webjobs, function apps.
                Azure Acive Directory, single sign on, Redis cache.
                Sharepoint SPFX which is allows a administrator to utilise React and Javascript to create forms.
                Administrator's add content via Sharepoint which is propogated to the backend Cosmos DB via Office365 Flow/Power Automate.
                I go in to detail regarding the organisational chart project I have completed <Link to="/portfolio/misc">here</Link>.
            </p>
            <p>
                I'm currently working on rewriting the process that images are uploaded to articles and announcements by using SPFX and React and the ASP .NET MVC Core API Azure application.
            </p>

            <h2>Health and Safety Application</h2>
            <p>A ASP .NET MVC and React single page application which I created from scratch.
                I go in to a lot of detail about this <Link to="/portfolio/hands">here</Link>. 
            </p>

            <h2>Customer Service Application</h2>
            <p>
                Whenever there is a fault with a recently built house by the company (under warranty), the customer logs the issue with the customer service department.
                They then use a client to log the issue and nominate a sub contractor.
                The application to log the issue is a clientside .NET Windows GUI executable frontend data and transactions are facilitated using Entity Framework and a server side .NET API process.
            </p>
            <p>
                A server side .NET Windows service (Workflow Service) polls for type of various events and it does the work necessary to progress the issue.
                In the case of a subcontractror being nominated, it emails the subcontractor requesting them to accept or reject the nomination.
                The subcontractor email contains a link to the mobile application which is a ASP .NET application set up in IIS on premise.
                Clicking the link shows them a screen where they accept or reject, and the workflow service will update accordingly.
                The Workflow Service moves the issue on iteratively until the subcontractor has been to the appointment, resolved the issue, and the customer has given confirmation of the fix.
            </p>
            <p>
                There is also a dashboard which is another ASP .NET application that the customer service department can use to see a list of all of the open issues and their current state ordered by urgency.
                A service side ASP .NET API process services the data to the mobile, dashboard, and Workflow Service applications.
            </p>
        </SegmentDemo>
    );
};

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