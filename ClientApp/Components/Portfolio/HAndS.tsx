
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

//sidtodo improve

// CAIRS is a 

// I built this alongside
// original site jquery / classic ASP

// plethora of existing
// fully live within 9 months

//sidtodo uses the scriptable template for SQL queries
// textparse for parsing HTML into PDF's

//caching system / versioning
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
            <h2>Task / Design</h2>
            <p>The concept for this came from the original 'system' which consisted of a large set of Excel spreadsheets.</p>
            <p>
                AI reports were recorded by hand on a copy of the dedicated Word document template and added to a spreadsheet by the health and safety administrators.
                Labour return and safety observation figures were sent via email by the site / office managers to the health and safety administrators who then added them to a spreadsheet.
                The totals were then extracted and used to plot the graphs that form the monthly reports.
                This labourious task would take the health and safety administrators at least 2 days to perform per month and was clearly vulnerable to discrepancies.
            </p>
            <h2>Development</h2>
            <p>//sidtodo database structure</p>
            <p>The UI theme was chosen by the users and was originally created for another system which runs on classic ASP and jQuery and Bootstrap.
                I reused the CSS and HTML/layout from the existing system but replaced the jQuery and Bootstrap with React and React Bootstrap.
            </p>
            <p>The AI report form was designed to match the original word document as closely as possible.
                Using controlled React components caused the screen to flicker due to the amount of components on screen.
                To get around this I used uncontrolled components where value changes .. //sidtodo
                
                as a batch via a call to setTimeout similar to my 'SimpleDelayer' class here <a href="https://github.com/sidfishus/react-spa-demo/blob/master/ClientApp/Library/UIHelper.ts">https://github.com/sidfishus/react-spa-demo/blob/master/ClientApp/Library/UIHelper.ts</a>

                

                //sidtodo</p>
            <p>
                The AI report form captures a lot of data and it was found that using media queries with multiple copies of the input components was significantly impeding performance.
                To resolve this I utilised the window.matchMedia function to query which of the 7 screen sizes most closely matched the current dimensions and held this as an enum.
                Each input component has a 'switch case' on this enum and outputs JSX accordingly when rendering.
                The window.matchMedia also allows you to be notified via a callback when the dimensions change and I used this to re-render the application.
            </p>
            <p>//sidtodo base class for the different RB controls.</p>
            <p>//sidtodo base class for the report screen, and static data import screens</p>

            <p>Data copy from spreadsheets to SQL //sidtodo</p>
            <h2>Technology</h2>
            <p>Below is the list of technology incoorporated:</p>
            {TechnologyTable(technology)}
        </>
    );

    // return (
    //     <>
    //         <p>CAIRS is an on-premise house construction health and safety web application.</p>
    //         <p>It is used by employees to record accidents and incidents, labour returns and safety observations.
    //             These values are then used to calculate the accident and incident rate (AIR) across all levels of the company and are used to form a variety of tables and graphs.
    //         </p>
    //         <p>
    //             The concept for this came from the original 'system' which consisted of a large set of Excel spreadsheets where totals had to be manually extracted in order to do the reporting.
    //             The administrators using this system mentioned that it saves them at least 2 working days per month as well as providing more accurate figures.
    //         </p>
    //         <p>
    //             The frontend is a single page application written in Javascript and React and is served by a dedicated ASP .NET MVC Core process.
    //             Data, transactions and authentication is handled by the dedicated API process which again uses ASP .NET MVC Core.
    //             The theme used was originally created for another system using classic ASP and jQuery.
    //             I reused the CSS and layout but rewrote it using React Bootstrap
                
    //              a dedicated , a dedicated API which serves 

    //             SQL backend and serves the data 

    //             Besides the theme 

    //             Micro adjustments and look and feel.
    //         </p>
    //     </>
    // );
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