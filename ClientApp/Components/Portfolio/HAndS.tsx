
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { PortfolioBase, ICarouselImg, ITechnologyInfo, TechnologyTable } from "./PortfolioBase";
import { Link } from "react-router-dom";

export interface IHAndSPortfolioProps extends IRoutedCompProps {
};

export const HAndSPortfolio: React.SFC<IHAndSPortfolioProps> = (props) => {
    return (
        <PortfolioBase
            {...props}
            about={About()}
            aboutHeading="Health and Safety System (CAIRS)"
            carouselImgs={carouselImgs}
        />
    );
};

const technology: ITechnologyInfo[] = [
    {
        name: <>ASP .NET MVC 5 / C#</>,
        descr: <>Hosts the web application as well as providing API's and access to the database, authentication, and more.</>
    },

    {
        name: <>Windows IIS Version 10</>,
        descr: <>Hosts the application on a Windows server/virtual machine.</>
    },

    {
        name: <>React / JSX Version 16.7</>,
        descr: <>The entire Javascript application is rendered by React and it's JSX notation. Data in the Javascript is accessed and mutated via this.state and this.setState respectively.</>
    },

    {
        name: <>React Bootstrap Version 0.32 (https://react-bootstrap.github.io/)</>,
        descr: <>The Bootstrap theme and UI engine but rewritten for React applications (no jQuery).</>
    },

    {
        name: <>React Bootstrap Datatables Version 2.2 (<a href="https://github.com/react-bootstrap-table/react-bootstrap-table2">https://github.com/react-bootstrap-table/react-bootstrap-table2</a>)</>,
        descr: <>The Bootstrap data table feature for React applications (no jQuery).</>
    },

    {
        name: <>Microsoft SQL Server 2018</>,
        descr: <>Persists data on the server and provides read and write access.</>
    },

    {
        name: <>Node Package Manager 6.4.1</>,
        descr: <>For installing and managing the client application third party libraries.</>
    },

    {
        name: <>Webpack Version 4.43</>,
        descr: <>Bundles the client and server script files.</>
    },

    {
        name: <>Babel Loader Version 7.1.5"</>,
        descr: <>Transpilation to allow the use of new Javascript features but with native compatability in a wide range of browsers.</>
    },

    {
        name: <>Microsoft SPA Services and Node JS</>,
        descr: <>Server side pre-rendering of the Javascript.</>
    },

    {
        name: <>Recharts Version 1.8.5 (<a href="https://recharts.org/">https://recharts.org/</a>)</>,
        descr: <>A powerful and extensive React graph library for creating reports.</>
    },

    {
        name: <>React Router Version 4.3.1 (<a href="https://reactrouter.com/web/guides/quick-start">https://reactrouter.com/web/guides/quick-start</a>)</>,
        descr: <>Clientside navigation/routing enables the Javascript application to work as a single page application (does not redirect to the server).</>
    },

    {
        name: <>React Dropzone Version 10.2.2 (<a href="https://github.com/react-dropzone/react-dropzone">https://github.com/react-dropzone/react-dropzone</a>)</>,
        descr: <>A user interface component for uploading files.</>
    },

    {
        name: <>React Signature Canvas Version 1.0.3 (<a href="https://www.npmjs.com/package/react-signature-canvas">https://www.npmjs.com/package/react-signature-canvas</a>)</>,
        descr: <>A user interface component for recording signatures.</>
    },

    {
        name: <>window.matchMedia</>,
        descr: <>Allows the application to be made responsive by querying the screen dimensions and rendering accordingly.
            I do not use media queries/React Responsive because there are multiple copies of the same control on screen which
            can significantly impact clientside performance.</>
    },

    {
        name: <>Evo HTML to PDF (<a href="https://www.evopdf.com/html-to-pdf-converter.aspx">https://www.evopdf.com/html-to-pdf-converter.aspx</a>)</>,
        descr: <>A third party library which converts HTML to PDF. Most of the application's screens have the ability to produce A3 or A4, landscape or portrait PDF's by converting the relevant HTML held in the browser DOM.</>
    },

    {
        name: <>Text Parse Version 1.0.15 (<Link to="/portfolio/textparse">/portfolio/textparse</Link>, <Link to="/textparse">/textparse</Link>, <a href="https://github.com/sidfishus/TextParse">https://github.com/sidfishus/TextParse</a>)</>,
        descr: <>My .NET text parsing library which aids in the process of producing PDF's based on HTML. The HTML output from the browser DOM needs to be transformed in order for it look appropriate on a PDF. For example 'a' tags need to be changed so they do not look like links and pagination buttons must be removed from data tables.</>
    },

    {
        name: <>Scriptable Template (<Link to="/portfolio/scriptabletemplate">/portfolio/scriptabletemplate</Link>, <a href="https://github.com/sidfishus/ScriptableTemplate">https://github.com/sidfishus/ScriptableTemplate</a>)</>,
        descr: <>My .NET library which allows templates to be parameterised and scripted with the aim of removing duplication in code.
            I use this for generating statically parameterisable SQL stored procedures which provide the data for the reports and share the same concepts and repeated code but with the performance benefits of inline SQL as opposed to moving anything that is repeated in to sub SQL views and functions. Also, bug fixes to the shared SQL code can be deployed to all of the stored procedures which use it by a click of a button.</>
    },

    {
        name: <>React Hot Loader Version 4.12.21 (<a href="https://github.com/gaearon/react-hot-loader">https://github.com/gaearon/react-hot-loader</a>)</>,
        descr: <>Changes to the Javascript code update in real time for quicker development.</>
    },

    {
        name: <>Microsoft Entity Framework</>,
        descr: <>Map database records to .NET objects</>
    }
];

const About: any = () => {

    return (
        <>
            <p>A responsive and mobile/tablet friendly web based data capture and reporting health and safety system for a house construction company.</p>
            <h2>Description</h2>
            <p>CAIRS is an on-premise based web application which incoorporates a ASP .NET MVC Core and SQL backend with a Javascript and React single page application frontend.</p>
            <p>It is used to record accidents and incidents, labour returns and safety observations.
                These values are then used to calculate the accident and incident (AI) rate (AIR) across all levels of the company and is used to form a variety of tables and graphs for reports.
            </p>
            <p>The application has been designed and hand crafted to work specifically with 7 different screen sizes ranging from small phones up to a typical computer screen of 1920 x 1200 pixels resolution.</p>
            <p>The Cairs system including the data migration from the existing system was fully live within 9 months and besides help with micro adjustments to the UI layout and existing third party libraries was done entirely by myself from scratch.</p>
            <h2>Task / Design</h2>
            <p>The concept for this came from the original 'system' which consisted of a large set of Excel spreadsheets.</p>
            <p>
                AI reports were recorded by hand on a copy of the dedicated Word document template and added to a spreadsheet by the health and safety administrators.
                Labour return and safety observation figures were sent via email by the site / office managers to the health and safety administrators who then added them to a spreadsheet.
                The totals were then extracted and used to plot the graphs that form the monthly reports.
                This labourious task would take the health and safety administrators at least 2 days to perform per month and was clearly vulnerable to discrepancies.
            </p>
            <h2>Development</h2>
            <h3>User Interface</h3>
            <p>The UI theme was chosen by the users and was originally created for another system which runs on classic ASP and jQuery and Bootstrap.
                I reused the CSS and HTML/layout from the existing system but replaced the jQuery and Bootstrap with React and React Bootstrap.
            </p>
            <p>The AI report form was designed to match the original word document as closely as possible.
                Using controlled React components caused the screen to flicker and appear unresponsive due to the amount of components on screen.
                To get around this I used uncontrolled components where value changes were stored as a Javascript object and applied using setState approx 500ms after the final change via setTimeout.
                A more complex version of my 'SimpleDelayer' class which can be found here <a href="https://github.com/sidfishus/react-spa-demo/blob/master/ClientApp/Library/UIHelper.ts">https://github.com/sidfishus/react-spa-demo/blob/master/ClientApp/Library/UIHelper.ts</a>.
            </p>
            <p>
                The AI report form captures a lot of data and it was found that using media queries with multiple copies of the input components was significantly impeding performance.
                To resolve this I utilised the window.matchMedia function to query which of the 7 screen sizes most closely matched the current dimensions and held this as an enum.
                Each input component has a 'switch case' on this enum and outputs JSX accordingly when rendering.
                The window.matchMedia also allows you to be notified via a callback when the dimensions change and I used this to re-render the application.
            </p>
            <p>
                I created a base component to encapsulate a generic screen for creating and displaying reports, and base components for generic screens to list database records, select, and edit their values.
                This was done again to achieve consistency but also speed up development by hold any duplicated code in the base componenent.
            </p>
            <p>
                Each type of input control in the application was abstracted in to their own Cairs version and parameterised in such a way to simplify their useage and hide details specific to their React Bootstrap implementation and achieve consistency.
                All functionality pertaining to persisting values was done within the base component.
            </p>
            <h3>API and Data Access</h3>
            <p>
                The SQL database was created to mirror the data that was being captured in the existing system.
                Data was initially migrated from the spreadsheets in to the SQL database via an automated process that was ran iteratively until the figures aligned.
            </p>
            <p>The client side Javascript application accesses the database and server side functionality via HTTP messages sent to the relevant controller and method.
                The ASP .NET application holds a version GUID per each database table constituting static data which is regenerated upon changes to that table.
                Static data requests made by the Javascript application are passed with an optional version GUID which represents the current version of that table that the client has.
                If the client side version corresponds to the server side version then no data is returned as a performance enhancement because once initially loaded in to the client Redux store data is only reloaded when there is a change.
            </p>
            <p>
                The data used to populate the graphs and tables is calculated via executing the associated SQL stored procedure with filters such as the date range passed as parameters.
                My scriptable template library which I had previously created was used to generate the report SQL stored procedures as they shared a lot of code.
            </p>
            <h3>Authentication and Authorisation</h3>
            <p>This is achieved using OAuth bearer token functionality built in to the version of ASP .NET used.
            </p>
            <p>
                User's and their access is stored in a database table and is made available to ASP .NET by my own implementation of an IUserStore which has access to the user table.
                Authorisation for each individual piece of functionality available in the server application is held as a boolean column against the user record. Controller method's assert that the user has the associated field set to true against the logged in user as a prerequisite to performing the task.
            </p>
            <h2>Technology</h2>
            <p>Below is the list of technology incoorporated:</p>
            {TechnologyTable(technology)}
        </>
    );
};

const carouselImgs: ICarouselImg[] = [
    {
        src: "/img/hands/homepage1.jpg",
        text: "Home page including live graphs using Recharts."
    },

    {
        src: "/img/hands/aireport1.jpg",
        text: "AI report creation."
    },

    {
        src: "/img/hands/aireport2.jpg",
        text: "AI report creation."
    },

    {
        src: "/img/hands/aireport3.jpg",
        text: "AI report creation."
    },

    {
        src: "/img/hands/aireport4.jpg",
        text: "AI report creation."
    },

    {
        src: "/img/hands/ailist1.jpg",
        text: "AI report list using React Bootstrap Data Tables."
    },

    {
        src: "/img/hands/ailist2.jpg",
        text: "AI report list using React Bootstrap Data Tables."
    },

    {
        src: "/img/hands/ailist3.jpg",
        text: "General PDF export functionality available on all screens."
    },

    {
        src: "/img/hands/ailist4.jpg",
        text: "General PDF export functionality available on all screens."
    },

    {
        src: "/img/hands/boardreportfilter1.jpg",
        text: "Report filters."
    },

    {
        src: "/img/hands/report1.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/report2.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/report3.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/report4.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/report5.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/report6.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/report7.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/staticdataentry1.jpg",
        text: "Static data maintenance."
    },

    {
        src: "/img/hands/staticdataentry2.jpg",
        text: "Static data maintenance."
    },

    {
        src: "/img/hands/usermaintenance1.jpg",
        text: "User maintenance."
    },

    {
        src: "/img/hands/usermaintenance2.jpg",
        text: "User maintenance."
    },

    {
        src: "/img/hands/mobilehome1.jpg",
        text: "Mobile layout for the home page."
    },

    {
        src: "/img/hands/mobileaireport1.jpg",
        text: "Mobile layout for the AI report form."
    },

    {
        src: "/img/hands/tablethome1.jpg",
        text: "Tablet (Ipad) layout for the home page."
    },

    {
        src: "/img/hands/tabletaireport1.jpg",
        text: "Tablet (Ipad) layout for the AI report form."
    },
];