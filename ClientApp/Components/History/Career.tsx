
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { ContainerDemo, SegmentDemo, SegmentSubSection } from "../Presentation";
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
        <SegmentDemo heading="House Construction Company (Feb 2018 to Present)">
            <p>In my later years at Prophet I felt I had reached a plateau and was at the top of the learning curve.
                I had registered my CV on a job board and was receiving a substantial amount of emails from recruiters regarding .NET and web development jobs due to me having .NET experience.
            </p>

            <p>I could see the benefit of being experienced in both C++ and .NET/web technologies and it would hopefully open up more job opportunities as well.</p>
            <p>I began doing some web programming in my spare time: ASP .NET, Javascript, Babel/Webpack and React.
                I then got a job as a senior developer as part of a 3 person development team for a house construction company in February 2018 so I could get some professional experience.
                This role appealed to me because I had a lot more control over the technologies used and the technical solutions employed, far more leeway than I ever had at Prophet.
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
                I did some 'Googling' and found a third party library that converts <a href="https://www.evopdf.com/html-to-pdf-converter.aspx">HTML into PDF</a>.
                To utilise this I wrote a helper COM object in C#/.NET/Interop that would facilitate the conversion to PDF by:
                <ol>
                    <li>Taking the report HTML string (accessed from the DOM in Javascript) as a parameter,</li>
                    <li>Parse it according to the markers to strip out the unwanted parts,</li>
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
                I go in to great detail about this <Link to="/portfolio/textparse">here</Link> and there is a live example <Link to="/textparse">here </Link>
                (see the 'VB Script add parenthesis' built in example).
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
                and ASP .NET MVC Core and have a big opinion in what technologies are used going forward.
            </p>

            <h2>Intranet</h2>
            <p>
                When I joined, the company recently had a intranet built for them by a contractor who was leaving and this was handed over to me to develop and support.
                This is a modern mobile friendly isomorphic web application utilising ASP .NET MVC Core, Webpack, Typescript and React and is hosted as 2 app services in Azure -
                a ASP .NET MVC Core application that deals with authentication and renders and serves the Javascript user interface, and a seperate ASP .NET MVC Core REST API.
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
                Sharepoint is used to manage the content hosted on the intranet as well as it's configuration via inbuilt Sharepoint functionality
                and Sharepoint React SPFX webparts.
                2 projects I have completed are an organisational chart and a SPFX user interface for creating and editing company articles,
                these are explained in detail on the <Link to="/portfolio/misc">miscellaneous portfolio page</Link>.
            </p>

            <h2>Health and Safety Application</h2>
            <p>A ASP .NET MVC and React single page application which I created from scratch.
                I go in to a lot of detail about this <Link to="/portfolio/hands">here</Link>. 
                I'm currently working on the second phase of this project.
            </p>

            <h2>Customer Service Application</h2>
            <p>
                Whenever there is a fault with a property which is still under warranty the dedicated customer services applications
                facilitate the issue being fixed. This consists of a variety of .NET/ASP .NET applications for which I am the lead developer on.
                The process is as follows:
                <ol>
                    <li>The house owner records the issue with the customer service department,</li>
                    <li>The customer service department uses the client side .NET Windows GUI executable to record the issue and nominate a subcontractor.
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
                Significant features I have developed for this are:
                <ul>
                    <li>Ability for subcontractors to upload images against issues within the mobile application,</li>
                    <li>Switched the dashboard from ASP .NET to pure client-side Javascript/React for improved responsiveness,</li>
                    <li>A mass plot address import using Excel and Visual Studio Tools for Office.</li>
                </ul>
            </p>
        </SegmentDemo>
    );
};

const ProphetPLC: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading={<><a href="https://www.prophetize.com/">Prophet PLC</a> (2006 to Feb 2018)</>}>
            <h2>Introduction</h2>
            <p>
                I had my last exam in May 2006 and earned an upper second class batchelors degree with honours in computing.
                Around this time my friend referred me to a job advertisement in a local newspaper looking for junior
                programmers with experience of C++, COM, the Windows API and SQL.
                I applied, had an interview and was given the job!
            </p>

            <p>
                Prophet are (at least at the time) the leading provider of ERP software for supply chain management
                in the food and horticultural industry.
                Data access was provided by SQL and ODBC and the software consisted of a large collection of C++ COM
                objects and a set of ActiveX controls to enhance the user interface.
                The front end of the applications are written in C++, Delphi and C#.
            </p>

            <h2>Object Oriented Architecture</h2>
            <p>Prophet effectively had their own version of the Entity Framework which was entirely written in C++.
                Each database table had an associated C++ wrapper COM object that derived from a core set of
                interfaces. For example there was an interface that dealt with property changes, and an interface
                that dealt with commit validation state checking to enforce business rules.
            </p>

            <p>
                This approach allowed the objects to be used in a generic way.
                Database records could be loaded, viewed, edited and saved on screen through each wrapper object
                supporting the core interfaces. And complex values involving multiple records could be calculated.
            </p>

            <h2>Robotic Warehouse</h2>
            <p>
                Working for Prophet was a steep learning curve but I proved my capabilities by quickly becoming an
                effective part of the business.
                I was continually thrown into the deep end during my time there and within 12 months of joining I was
                the lead programmer on a software project to operate a state of the art robotic warehouse.
                This consisted of various cranes and conveyor belts that transport pallets, and contraptions such as a
                fruit grader, and tipper, and automatic barcode scanners.
                The hardware of the warehouse was controlled via a PLC that ran on a Unix system and my software
                provided the connection between that and the main Prophet ERP application.
            </p>
            <p>
                Communication with the PLC was achieved via a TCP/IP Winsock socket connection and a protocol of
                messages/packets known as "telegrams" which were just a 32 bit number to indicate the type of
                command/event and an array of bytes containing the necessary parameters such as the pallet
                identifier.
                My software ran in real time 24/7 and if it crashed it would literally bring the warehouse to a halt
                and therefore the system had to be bomb proof.
            </p>

            <p>
                My software was a Win32 C++ executable consisting of multiple threads that were programmed with
                different roles, including a "brain" thread which would coordinate work and ensure all threads
                were kept alive.
                Commands issued by the main ERP application, for example to move a pallet, were sent as a text
                file and parsed by my executable and then the appropriate sequence of telegrams were sent
                to the PLC to perform the task.
                If the task could not physically be performed, such as the destination location was inaccessible,
                the PLC would issue a 'change strategy' telgram and my application would flag the location
                as 'suspect' and then determine a new route.
                We also had examples where the PLC would send erroneous rogue telegrams and we had to prove
                this to the vendor as a bug by recording all telegrams sent and received.
            </p>

            <p>
                Other cool parts of the project was a 'putaway' script that based on the type and grade of
                fruit(s) present on a pallet, would determine the most appropriate location for that pallet
                by matching against a row in a user configurable 'cube'. I also created a house keeping
                script that would re-organise the warehouse over night based on the same logic.
            </p>

            <h2>EDI</h2>

            <p>
                My main area of expertise at Prophet was
                <a href="https://en.wikipedia.org/wiki/Electronic_data_interchange">"EDI"</a>, which is the
                transmission of electronic data between trading companies.
                EDI at Prophet was facilitated by the sending of XML files and HTTP messages that were produced
                according to a particular in house XSD standard based on
                <a href="https://en.wikipedia.org/wiki/EDIFACT">EDIFACT</a>.
            </p>

            <p>
                We had a complex pipeline of services that would receive EDI and copy the data to a
                database hierarchy known as the raw message queue, do various levels of validation and process
                it in the appropriate order and trigger the appropriate actions in the ERP database.
                Again these were real time systems where resilience and efficiency was key.
            </p>

            <h2>Paltrack</h2>
            <p>I can't discuss my time at Prophet without mentioning Paltrack because it was such a behemoth of a
                project and formed a significant amount of my experience at Prophet.</p>
            <p>Paltrack was/is the EDI process model used in South Africa for tracking pallet stock data between
                depots. The various depots along a pallet's route from where the fruit was initially grown and through
                the country to one of the ports send text files containing all of the data pertinent to the pallet and
                the event. Companies that require this data (such as companies involved in the selling of the fruit)
                subscribe to and use it to populate their ERP system(s).
            </p>
            <p>
                There are different types of EDI file which
                are sent at the different stages of a pallet's lifetime at the depot:
            </p>
            <ul>
                <li>A PIFI file (intake first intake) is sent when a pallet arrives at the depot that is not
                currently on the Paltrack system,</li>
                <li>A PITI file (transfer intake) is sent when a pallet arrives at the
                depot as a transfer from another depot,</li>
                <li>A PS (stock file) is sent periodically to detail the stock
                currently held at that depot,</li>
                <li>A PO file (outtake) is sent when a pallet leaves the depot,</li>
                <li>And a MT file (ship mates) is sent in relation to pallets being shipped.</li>
            </ul>

            <h3>Out of Sequence (OOS) Detector!</h3>
            <p>A massive complexity with Paltrack was that the EDI files could arrive <u>out of sequence</u> (TIA!).
            For example, a pallet could arrive on a stock file before it had been received on a first intake file.
            The requirement of the system was to create and process a "dummy" intake file
            based on the data in the stock file and then process the stock file as normal.
            </p>

            <p>An even more complex example was when part of a pallet was split/moved to another pallet.
                A normal scenario was to receive a PO file for pallet C which in the main ERP system would cause
                the stock on pallet C to be order allocated, when in actuality pallet C had originally existed
                on pallet A and then moved to pallet B.
                But you could receive a PO (and other files for pallet C) before
                the intake file for pallet A was received.
                If we were lucky to see the intake file for pallet A, the transactions for pallet C would have to be
                wound backwards, effectively rolled back, which included clearing audits, and then replayed in
                a certain way.
            </p>

            <p>The system needed a way of detecting conditions like those above, as well as determining whether a
                EDI file was in sequence, because entirely different processes would need to happen in the ERP
                system and coordinated so they occured in the correct order and at the right time.
            </p>

            <p>
                At the beginning of the project when I was on a site trip with my manager, we realised we had not fully
                understood the paltrack process flow in that you would receive multiple files of the same type for
                a given pallet due to there being multiple depots/warehouses (that send the files).
                This meant the existing EDI file coordinator had to be redesigned and rewritten because it's complexity
                had just exponentially grown. The timescale was short because we were on site to oversee the user
                testing, so late evening on a Sunday around the swimming pool back at the hotel, the concept of the
                "out of sequence (OOS) detector" was hatched between myself and my manager..
            </p>

            <p>
                There were already early versions of a number of applications which update the ERP system
                according to the Paltrack EDI data, however they now needed to be coordinated in a much
                more intelligent way.
                Each pallet stock level row in a given EDI file had a corresponding row in the database once it had
                been imported and
                there was a field to represent the status of each of these applications against it.
                Whilst being processed, the relevant database row was locked.
                On a poll, the OOS detector looks for pallets/files that were waiting to be coordinated
                via a SQL query and using the 'readpast' feature exclude pallets which had any EDI rows that
                were locked in the database (i.e. it was currently being processed).
                For pallets remaining, the entire EDI history was then returned from SQL in the order in which
                the events happened and loaded in to memory in the C++ portion of the application.
                This then included piecing together history where stock was moved from one pallet to another
                and other complex scenarios.
            </p>
            <p>
                Per pallet, it was then a case of determining the current state of it, and tag the relevant
                status field on the EDI database row that was to be processed next 
                as 'pending processing' so the relevant process would trigger and do the work.
                This had to happen as quickly as possible because data was expected
                to be accessible in the ERP system in real time from the point of EDI being received,
                and the system could see up to 60,000 pallets per hour at the busiest times.
                As time went on and more obscure scenarios were found, these were coded in to the detector to
                handle them appropriately and remove the need for user intervention.
            </p>

            <h2>Promotion</h2>
            <p>
                In 2013 I was promoted to the role of "lead developer" and from then on I spent less time
                writing code and more time formally supervising other developers and liasing with the other parts
                of the business.
            </p>
            <p>
                Depending on the size and type of project and developer availability, I would have up to 5 developers working for me.
                The typical process for projects was to disect the design specification which varied in quality and detail,
                ask the designers questions until the design was complete, and then ask any technical questions.
                I then produced a programmer's document detailing the technical changes required (and how) broken up in to
                individual units/parcels of work so it could be distributed among the developers, though I typically did
                the most complex and involved work myself.
                This document would then be used to estimate the time required which would have a bearing on the
                overall cost charged to the customer.
            </p>
            <p>
               Throughout the development stage I would mentor and answer questions, and formally review the code
               and documentation produced to ensure a certain level of quality and confirm my instructions were
               followed.
               I believe this change to my role was very beneficial to the business due to the ability of
               the junior developers and the steep learning journey required to become an effective Prophet developer,
               and the prior lack of technical seniority with time available to provide supervision.
            </p>

            <h2>.NET / C#</h2>
            <p>The majority of the code I wrote was C++, with some Delphi front end work and VB scripting thrown in
                to provide bespoke functionality, however some projects used C# and the .NET framework.
            </p>
            <p>
                For example one project involved a Windows CE mobile scanner device with the .NET framework installed.
                This was a multi-screen GUI application used by delivery drivers where there was limited and
                sporadic internet connectivity when driving around Ireland.
                Using Microsoft SQL RDA push and pull technology, drivers download and store their daily route in a
                hierarchy of SQL tables local to the device and make the deliveries and record various information
                such as signatures and amounts delivered. This would then synchronise back to the main Prophet ERP
                database when a connection was available.
            </p>
            <p>
                I spent time developing the remote installer and deployment system which was built using .NET and C#.
            </p>
            
            <h2>Conclusion</h2>

            <p>My experience working for Prophet had a very positive impact on my personality and skills and mindset
                towards software development. I consider this part of my career invaluable in 'earning my stripes'
                to transition from a talented junior developer with no commercial experience, into a professional and
                confident senior and lead developer wanting to take on responsibility and ownership.
            </p>
            <p>
                I worked alongside and was mentored by some very gifted, intelligent and experienced developers, and
                I was continually challenged and put through my paces.
                I'm not sure if I've gone in to too much detail about my experiences working for Prophet, my intention
                is to express the level of complexity and environment that I have become comfortable working in
                from an early stage in my career.
                Working for Prophet was not for the faint of heart due to the awkward situations and pressure
                you could be put under as well as the general rigors of working there, but I excelled.
            </p>

            <p>
                I think my greatest ability was that I could diligently cope with and progress any task given to me.
                Prophet had a codebase of over 2 million lines of code and regularly the owner's of specific areas of
                code would leave the company and leave knowledge gaps.
                This meant any developer with the ability to do so would instantly be required to take on new areas of the
                system with little handover or training.
                Having to resolve urgent issues with systems and code you had not seen before was a regular occurence
                but was something I feel I was particularly good at.
            </p>

            <p>With the advent of blockchain (Bitcoin), I wonder how it will affect the supply chain management of
                fresh produce
                sector that Prophet is currently the leader in.
                For example there is a blockchain technology named <a href="https://www.vechain.com/">Vechain</a> which
                provides supply chain management via blockchain on the Ethereum network.
                Having a lot of experience working on EDI, and in particular seeing the flakeyness of Paltrack, I can firmly see
                the advantages that would be gained if it was replaced with blockchain technology.
            </p>

        </SegmentDemo>
    );
};