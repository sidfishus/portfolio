
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { PortfolioBase, ICarouselImg, ITechnologyInfo, TechnologyTable, CreateRepoUrl } from "./PortfolioBase";
import { SegmentDemo, SegmentSubSection } from "../Presentation";

export interface IMiscPortfolioProps extends IRoutedCompProps {
};

export const MiscPortfolio: React.SFC<IMiscPortfolioProps> = (props) => {
    return (
        <PortfolioBase
            {...props}
            writeUp={WriteUp()}
            carouselImgs={carouselImgs}
        />
    );
};

const carouselImgs : ICarouselImg[] =[
    {
        src: CreateRepoUrl("wwwroot/img/misc/orgchart1.jpg"),
        text: "Organisational chart: select the top level division."
    },

    {
        src: CreateRepoUrl("wwwroot/img/misc/orgchart2.jpg"),
        text: "Organisational chart: select the department."
    },

    {
        src: CreateRepoUrl("wwwroot/img/misc/orgchart3.jpg"),
        text: "Organisational chart: see the department members along with the department head."
    },

    {
        src: CreateRepoUrl("wwwroot/img/misc/orgchart4.jpg"),
        text: "Organisational chart: select a user and see their team and manager..."
    },

    {
        src: CreateRepoUrl("wwwroot/img/misc/orgchart5.jpg"),
        text: "Organisational chart: ...as well as their direct reports."
    },

    {
        src: CreateRepoUrl("wwwroot/img/misc/articles v2.jpg"),
        text: "Articles React SPFX Webpart."
    },
];

const orgChartTechnology: ITechnologyInfo[] = [
    {
        name: <>ASP .NET MVC Core 2</>,
        descr: <>Hosts the web application as well as providing API's and access to the database, authentication, and more.</>
    },

    {
        name: <>React / JSX</>,
        descr: <>The entire Javascript application is rendered by React and it's JSX notation.</>
    },

    {
        name: <>Redux</>,
        descr: <>Data accessor and mutator functionality for the browser application is encapsulated in Redux stores and is made accessible as component 'props' via the connect function.</>
    },

    {
        name: <>Semantic UI React Version 0.75.1 (<a href="https://react.semantic-ui.com/">https://react.semantic-ui.com/</a>)</>,
        descr: <>A user interface engine and theme for React which is similar to Bootstrap.</>
    },

    {
        name: <>Webpack Version 2.5.1</>,
        descr: <>Bundles the client and server script files.</>
    },

    {
        name: <>Babel Loader Version 7.1.2</>,
        descr: <>Transpilation to allow the use of new Javascript features but with native compatability in a wide range of browsers.</>
    },

    {
        name: <>Typescript Version 2.5.3</>,
        descr: <>Static type checking in the Javascript code.</>
    },

    {
        name: <>Azure App Services</>,
        descr: <>Hosts the ASP .NET MVC Core application and API processes in the cloud.</>
    },

    {
        name: <>Azure Active Directory</>,
        descr: <>Holds the list of user accounts in Azure and is synchronised from the on-premise Active Directory.</>
    },

    {
        name: <>Azure Cosmos DB</>,
        descr: <>Persists and provides access to the dynamic data which is consumed by the application. Data is stored and transported as JSON.</>
    },

    {
        name: <>Azure Web Jobs</>,
        descr: <>A scheduled process which creates and updates user profiles and the organisational structure in Azure Cosmos DB based on Azure Active Directory.</>
    },
];

const articlesTechnology: ITechnologyInfo[] = [

    {
        name: <>ASP .NET MVC Core 2</>,
        descr: <>Provides read and write access to the database through the use of REST API's.</>
    },

    {
        name: <>React / JSX</>,
        descr: <>User interface and clientside dynamic page rendering.</>
    },

    {
        name: <>Sharepoint SPFX</>,
        descr: <>Sharepoint framework which allows you to use React within Sharepoint.</>
    },

    {
        name: <>Typescript Version 2.5.3</>,
        descr: <>Static type checking in the Javascript code.</>
    },

    {
        name: <>Azure Cosmos DB</>,
        descr: <>Persists and provides access to the dynamic data which is consumed by the application.</>
    },

    {
        name: <>React Quill</>,
        descr:<>Rich text and content editor.</>
    },

    {
        name: <>Azure Blob Storage</>,
        descr:<>Stores the images.</>
    },
];

const WriteUp = (): JSX.Element => {
    return (
        <>
            <SegmentDemo heading="Organisational Chart">
                <SegmentSubSection>
                    <p>A web based representation of a company's organisational hierarchy which is generated dynamically
                        according to Sharepoint and Azure Active Directory.
                    </p>
                </SegmentSubSection>

                <SegmentSubSection heading="Technology">
                    <p>Below is the list of technology incoorporated:</p>
                    {TechnologyTable(orgChartTechnology)}
                </SegmentSubSection>

                <SegmentSubSection heading="Process">
                    <p>The Azure webjob synchronises user details between Azure Active Directory and Azure Cosmos DB.
                        User's create the organisational structure in Sharepoint and this is pushed across to Cosmos DB.
                        Selecting a division, region, department or user calls a Redux dispatch method to load the associated
                        data from Cosmos DB via a HTTP call to the relevant API controller method.
                        As the Redux store updates as a result of the dispatch method, the screen is re-rendered by React to
                        show the updated organisational hierarchy.
                        Selecting a user propogates their hierarchy by showing their manager, team, and those that report to them.
                        Selecting the manager causes the same information to be loaded and displayed for them and so on until
                        the Group CEO is at the top.
                    </p>
                </SegmentSubSection>
            </SegmentDemo>

            <SegmentDemo heading="Articles Sharepoint SPFX React Webpart">
                <SegmentSubSection>
                    <p>A user interface for creating and editing company articles that are displayed on an intranet.
                    </p>
                </SegmentSubSection>

                <SegmentSubSection heading="Technology">
                    <p>Below is the list of technology incoorporated:</p>
                    {TechnologyTable(articlesTechnology)}
                </SegmentSubSection>

                <SegmentSubSection heading="Process">
                    <p>
                        The list of articles is persisted in Azure Cosmos DB as an array of JSON objects.
                        The API process provides REST API's
                        for consuming and updating the articles in the database and the React SPFX user interface
                        accesses these via HTTP get and post messages.
                        Images are uploaded to Azure blob storage via the REST API's. A preview feature allows
                        articles to be created as draft and previewed on the intranet before they are published live.
                    </p>
                </SegmentSubSection>
            </SegmentDemo>

        </>
    );
};