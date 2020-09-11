
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { PortfolioBase, ICarouselImg, ITechnologyInfo, TechnologyTable } from "./PortfolioBase";

export interface IMiscPortfolioProps extends IRoutedCompProps {
};

export const MiscPortfolio: React.SFC<IMiscPortfolioProps> = (props) => {
    return (
        <PortfolioBase
            {...props}
            about={About()}
            aboutHeading="Miscellaneous Work"
            carouselImgs={carouselImgs}
        />
    );
};

const carouselImgs : ICarouselImg[] =[
    {
        src: "/img/misc/orgchart1.jpg",
        text: "Organisational chart: select the top level division."
    },

    {
        src: "/img/misc/orgchart2.jpg",
        text: "Organisational chart: select the department."
    },

    {
        src: "/img/misc/orgchart3.jpg",
        text: "Organisational chart: see the department members along with the department head."
    },

    {
        src: "/img/misc/orgchart4.jpg",
        text: "Organisational chart: select a user and see their team and manager..."
    },

    {
        src: "/img/misc/orgchart5.jpg",
        text: "Organisational chart: ...as well as their direct reports."
    },
];

const technology: ITechnologyInfo[] = [
    {
        name: "ASP .NET MVC Core 2",
        descr: "Hosts the web application as well as providing API's and access to the database, authentication, and more."
    },

    {
        name: "React / JSX",
        descr: "The entire Javascript application is rendered by React and it's JSX notation."
    },

    {
        name: "Redux",
        descr: "Data accessor and mutator functionality for the browser application is encapsulated in Redux stores and is made accessible as component 'props' via the connect function."
    },

    {
        name: "Semantic UI React",
        descr: "A user interface engine and theme for React which is similar to Bootstrap."
    },

    {
        name: "Webpack",
        descr: "Bundles the client and server script files."
    },

    {
        name: "Babel",
        descr: "Transpilation to allow the use of new Javascript features but with native compatability in a wide range of browsers."
    },

    {
        name: "Typescript",
        descr: "Static type checking in the Javascript code."
    },

    {
        name: "Azure App Services",
        descr: "Hosts the ASP .NET MVC Core application and API processes in the cloud."
    },

    {
        name: "Azure Active Directory",
        descr: "Holds the list of user accounts in Azure and is synchronised from the on-premise Active Directory."
    },

    {
        name: "Azure Cosmos DB",
        descr: "Persists and provides access to the dynamic data which is consumed by the application."
    },

    {
        name: "Azure Web Jobs",
        descr: "A scheduled process which creates and updates user profiles and the organisational structure in Azure Cosmos DB based on Azure Active Directory."
    },
];

const About: any = () => {
    return (
        <>
            <h1>Organisational Chart</h1>
            <p>A web based representation of a company's organisational hierarchy which is generated dynamically according to Azure Active Directory.</p>
            <h2>Technology</h2>
            <p>Below is the list of technology incoorporated:</p>
            {TechnologyTable(technology)}
            <h2>Process</h2>
            <p>The Azure webjob synchronises user details and the organisational structure between Azure Active Directory and Azure Cosmos DB.
            Selecting a division, region, department or user calls a Redux dispatch method to load the associated data from Cosmos DB via a HTTP call to the relevant API controller method.
            As the Redux store updates as a result of the dispatch method, the screen is re-rendered by React to show the updated organisational hierarchy.
            Selecting a user propogates their hierarchy by showing their manager, team, and those that report to them.
            Selecting the manager causes the same information to be loaded and displayed for them and so on until the Group CEO is at the top.</p>
        </>
    );
};