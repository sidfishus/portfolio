import * as React from "react";
import {IRoutedCompProps} from "../../routes";
import {PortfolioBase, ICarouselImg, CreateImage, TechnologyTable, ITechnologyInfo} from "./PortfolioBase";
import {SegmentDemo, SegmentSubSection} from "../Presentation";
import {CreateRepoUrl} from "../../CreateRepoUrl.ts";

export interface IBlytheMillShedsPortfolioProps extends IRoutedCompProps {
};

const carouselImgs: ICarouselImg[] = [
    CreateImage(CreateRepoUrl("img/blythemillsheds/hometopdesktop.jpg"),
        <>Home page for larger devices which leverages my <a
            href={"https://www.npmjs.com/package/react-cscarousel"}>react-cscarousel</a> NPM package.</>),
    CreateImage(CreateRepoUrl("img/blythemillsheds/requestaquotedesktop.png"),
        <>Request a quote for larger devices. Quotes are sent via the SendGrid REST API.</>),
    CreateImage(CreateRepoUrl("img/blythemillsheds/selectstyles.png"),
        <>Hand made multiple select dialog.</>, "SelectStyles"),
    CreateImage(CreateRepoUrl("img/blythemillsheds/customerreviewsdesktop.png"),
        <>Customer reviews via an <a href={"https://elfsight.com/"}>Elf Sight</a> widget.</>),
    CreateImage(CreateRepoUrl("img/blythemillsheds/gallerydesktop.jpg"),
        <>Gallery for larger devices which leverages my <a
            href={"https://www.npmjs.com/package/react-cscarousel"}>react-cscarousel</a> NPM package.</>),
    CreateImage(CreateRepoUrl("img/blythemillsheds/hometopmobile.png"),
        <>Home page for mobile devices which leverages my <a
            href={"https://www.npmjs.com/package/react-cscarousel"}>react-cscarousel</a> NPM package.</>),
    CreateImage(CreateRepoUrl("img/blythemillsheds/homemiddlemobile.png"),
        <>Mobile home page.</>),
    CreateImage(CreateRepoUrl("img/blythemillsheds/gallerymobile.png"),
        <>Mobile gallery.</>),
    CreateImage(CreateRepoUrl("img/blythemillsheds/menumobile.png"),
        <>Mobile menu.</>),
];

const thumbnailImgs: string[] = [
    CreateRepoUrl("img/blythemillsheds/hometopdesktop.jpg"),
    CreateRepoUrl("img/blythemillsheds/requestaquotedesktop.png"),
    CreateRepoUrl("img/blythemillsheds/selectstyles.png"),
    CreateRepoUrl("img/blythemillsheds/customerreviewsdesktop.png"),
    CreateRepoUrl("img/blythemillsheds/Thumbs/gallerydesktop.jpg"),
    CreateRepoUrl("img/blythemillsheds/Thumbs/hometopmobile.jpg"),
    CreateRepoUrl("img/blythemillsheds/homemiddlemobile.png"),
    CreateRepoUrl("img/blythemillsheds/Thumbs/gallerymobile.jpg"),
    CreateRepoUrl("img/blythemillsheds/menumobile.png")
];

export const BlytheMillShedsPortfolio = (props: IBlytheMillShedsPortfolioProps) => {
    return (
        <PortfolioBase
            {...props}
            writeUp={WriteUp()}
            carouselImgs={carouselImgs}
            thumbnailImgs={thumbnailImgs}
            additionalCarouselFileClass={"PortfolioCarouselResponsiveFileClass"}
            additionalThumbnailFileClass={"BlytheMillShedsThumbs"}
            heading={heading}
        />
    );
};

const heading=(
    <SegmentDemo heading="Blythe Mill Sheds">
        <SegmentSubSection>
            <p><a href={"https://blythemillsheds.co.uk"}>Blythe Mill Sheds</a> is a responsive mobile first single page
                application I created for a client in 2023 to their specifications.
                The purpose of the application is to advertise their business and provide a form for customers
                to request quotes.</p>
            <p>It is hosted
                on <a href={"https://www.ionos.co.uk/hosting/windows-hosting#packages"}>Ionos</a> for a small
                monthly fee and incorporates a .NET 6 backend written in C#. The front-end
                leverages React version 18 and Typescript.
            </p>
        </SegmentSubSection>
    </SegmentDemo>
);

const WriteUp = (): JSX.Element => {
    return (
        <>
            <SegmentDemo heading="Features">
                <SegmentSubSection>
                    <ul>
                        <ul>
                            <li>
                                Search engine optimisation (SEO) including directing search engine crawlers to static
                                HTML output for better indexing.
                            </li>
                            <li>Specifically developed and tested on mobiles, tablets and a variety of desktop screen
                                sizes.
                            </li>
                            <li>Entirely customised CSS.
                            </li>
                            <li>My <a href={"https://www.npmjs.com/package/react-cscarousel"}>react-cscarousel</a> responsive React carousel NPM package.</li>
                            <li>An <a href={"https://elfsight.com/"}>Elf Sight</a> widget for displaying customer
                                reviews from Facebook, Google, and Yell.
                            </li>
                            <li>
                                Google maps integration.
                            </li>
                            <li>
                                Email functionality provided by SendGrid and it's REST API.
                            </li>
                            <li>
                                Traffic telemetry is recorded and can be visualised thanks to Google Analytics.
                            </li>
                        </ul>
                    </ul>
                </SegmentSubSection>
            </SegmentDemo>

            <SegmentDemo heading="Technology">
                <SegmentSubSection>
                <p>Below is the list of technology incorporated:</p>
                    {TechnologyTable(technology)}
                </SegmentSubSection>
            </SegmentDemo>
        </>
    );
};

const technology: ITechnologyInfo[] = [
    {
        name: <>C# / .NET 6</>,
        descr: <>The backend server side application is written in C#.</>
    },
    {
        name: <>ASP .NET</>,
        descr: <>Incorporates ASP .NET to host the static content and controller based REST API.</>
    },
    {
        name: <>Typescript version 5x</>,
        descr: <>All of the front-end application is written in Typescript.</>
    },
    {
        name: <><a href={"https://react.dev/"}>React</a> Version 19</>,
        descr: <>Uses the latest features of React such as hooks and ref as direct props to create a react web user interface.</>
    },
    {
        name: <><a href={"https://vite.dev/"}>Vite</a> Version 6</>,
        descr: <>Development and production build front-end application bundler.</>
    },
    {
        name: <><a href={"https://sass-lang.com/"}>Sass</a></>,
        descr: <>I prefer the features Sass offers over purely native CSS.</>
    },
    {
        name: <><a href={"https://reactrouter.com/"}>React Router</a> Version 7</>,
        descr: <>Client side routing.</>
    },
    {
        name: <><a href={"https://sendgrid.com/"}>Send Grid</a> REST API</>,
        descr: <>Quotes are sent from the web application through an Ionos proxy to the SendGrid and to a specified email address.</>
    },
    {
        name: <><a href={"https://www.npmjs.com/package/react-ga4"}>react-ga4</a></>,
        descr: <>Record Google Analytics telemetry within a React single page application.</>
    },
];

