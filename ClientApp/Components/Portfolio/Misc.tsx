
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import {
    PortfolioBase,
    ITechnologyInfo,
    TechnologyTable,
    CreateImage
} from "./PortfolioBase";
import { SegmentDemo, SegmentSubSection } from "../Presentation";
import { CreateRepoUrl} from "../../CreateRepoUrl.ts";
import {ICarouselImg} from "../PortfolioCarousel.tsx";

export interface IMiscPortfolioProps extends IRoutedCompProps {
};

export const MiscPortfolio = (props: IMiscPortfolioProps) => {
    return (
        <PortfolioBase
            {...props}
            writeUp={WriteUp()}
            carouselImgs={carouselImgs}
            additionalCarouselFileClass={"SixteenByNineAspectRatio"}
            additionalThumbnailFileClass={"SixteenByNineAspectRatio"}
            heading={null}
        />
    );
};

const carouselImgs : ICarouselImg[] =[
    CreateImage(CreateRepoUrl("img/misc/nextjs-demo-recharts.png"),
        "Next JS weather demo: Recharts temperature graph."),

    CreateImage(CreateRepoUrl("img/misc/nextjs-demo-windgraph.png"),
        "Next JS weather demo: Hand-made HTML and CSS line graph."),

    CreateImage(CreateRepoUrl("img/misc/nextjs-demo-pagespeed.png"),
        <>Next JS weather demo: <a href={"https://pagespeed.web.dev/analysis/https-nextjs-demo-nu-nine-vercel-app/w3egb7oh0p?form_factor=desktop"}>
            Web.dev page speed analysis.</a></>),

    CreateImage(CreateRepoUrl("img/misc/nextjs-demo-pagespeed2.png"),
        <>Next JS weather demo: <a href={"https://pagespeed.web.dev/analysis/https-nextjs-demo-nu-nine-vercel-app/w3egb7oh0p?form_factor=desktop"}>
            Web.dev page speed analysis.</a></>),

    CreateImage(CreateRepoUrl("img/misc/orgchart1.jpg"),
        "Organisational chart: select the top level division."),

    CreateImage(CreateRepoUrl("img/misc/orgchart2.jpg"),
        "Organisational chart: select the department."),

    CreateImage(CreateRepoUrl("img/misc/orgchart3.jpg"),
        "Organisational chart: see the department members along with the department head."),

    CreateImage(CreateRepoUrl("img/misc/orgchart4.jpg"),
        "Organisational chart: select a user and see their team and manager..."),

    CreateImage(CreateRepoUrl("img/misc/orgchart5.jpg"),
        "Organisational chart: ...as well as their direct reports."),

    CreateImage(CreateRepoUrl("img/misc/articles v2.jpg"),
        "Articles React SPFX Webpart."),
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

const nextJsWeatherDemo: ITechnologyInfo[] = [
    {
        name: <><a href={"https://nextjs.org/"}>NEXT.js 15</a></>,
        descr: <>Full stack NodeJS and React web application framework.</>
    },
    {
        name: <><a href={"https://tailwindcss.com/"}>Tailwind CSS</a></>,
        descr: <>A revolutionary way to create CSS based themes and styles.</>
    },
    {
        name: <><a href={"https://react.dev/"}>React 19</a></>,
        descr: <>Including server components for efficient static site generation and server side rendering.</>
    },
    {
        name: <><a href={"https://vercel.com/"}>Vercel</a></>,
        descr: <>Hosts the application for free.</>
    },
    {
        name: <><a href={"https://open-meteo.com/"}>Open Meteo</a></>,
        descr: <>A free scalable weather API.</>
    },
    {
        name: <><a href={"https://recharts.org/"}>Recharts</a></>,
        descr: <>React Javascript graph library.</>
    }
];

const WriteUp = (): JSX.Element => {
    return (
        <>
            <SegmentDemo heading="Nextjs Weather Demo">
                <SegmentSubSection>
                    <p>A full stack isomorphic Nextjs demo application based on create-next-app and hosted for free by
                        Vercel. The application can be viewed <a
                            href={"https://nextjs-demo-nu-nine.vercel.app/"}>here</a> and the sourcecode can be found
                        on <a href={"https://github.com/sidfishus/nextjs-demo"}>Github</a>.
                    </p>
                    <p>
                        The purpose of creating this was to practice and demonstrate my skills in some of the
                        React based web technologies which leverage SSG and SSR, and test whether I am able to create
                        dynamic graphs using HTML instead of SVG.
                    </p>
                </SegmentSubSection>

                <SegmentSubSection heading="Technology">
                    <p>Below is the list of technology incoorporated:</p>
                    {TechnologyTable(nextJsWeatherDemo)}
                </SegmentSubSection>

                <SegmentSubSection heading="Process">
                    <p>
                    The weather data for the default location of Tamworth is cached and re-validated every 5 minutes,
                        this in turn enables the home page to be statically rendered and cached (and re-validated
                        every 5 minutes). This results in a very fast loading experience for the home page.
                    </p>
                    <p>
                        The static HTML of the home page and weather data is passed from the server to the client.
                        The longitude and latitude values can be keyed by the user to display the weather for a
                        different location. This calls an API route on the NextJS app / backend which in turn calls the
                        Open Meteo weather API. Obviously, I could have called the Open Meteo API directly from the
                        client but I specifically wanted to demonstrate and test calling a NextJS API from the client.
                    </p>
                </SegmentSubSection>
            </SegmentDemo>

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
                        Selecting a user propagates their hierarchy by showing their manager, team, and those that report to them.
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