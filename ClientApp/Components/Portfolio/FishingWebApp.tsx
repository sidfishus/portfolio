import {IRoutedCompProps} from "../../routes.tsx";
import {CreateImage, ICarouselImg, ITechnologyInfo, PortfolioBase, TechnologyTable} from "./PortfolioBase.tsx";
import {CreateRepoUrl} from "../../CreateRepoUrl.ts";
import * as React from "react";
import {SegmentDemo, SegmentSubSection} from "../Presentation.tsx";

export interface IFishingWebAppPortfolioProps extends IRoutedCompProps {
};

//sidtodo order these with best = first
const carouselImgs: ICarouselImg[] = [
    CreateImage(CreateRepoUrl("img/fishingwebapp/dropdownsearch1.png"),
        <>Handmade dropdown search control.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/dropdownsearch2.png"),
        <>Handmade dropdown search control.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/registerfisheryconfirm.png"),
        <>Registering a new fishery.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/registerlake1.png"),
        <>Registering a new fishing lake.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/registerlake2.png"),
        <>Registering a new fishing lake.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/newsession1.png"),
        <>Begin a new fishing session.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/registerswim1.png"),
        <>Register a new swim.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/newsession2.png"),
        <>Begin a new fishing session.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/cast1.png"),
        <>Record the details of individual casts: bait, rig, spot.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/cast2.png"),
        <>Record the details of individual casts: bait, rig, spot.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot1.png"),
        <>Record the details of a spot.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot2.png"),
        <>Record a spot details</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot3.png"),
        <>Record a spot details</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot4.png"),
        <>Record a spot details</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/createhook1.png"),
        <>Record rig / bait attributes for generating reports!</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/googleidentity3.png"),
        <>Google One Tap Identity (splash screen unfinished!)</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/googleidentity2.png"),
        <>Google One Tap Identity (splash screen unfinished!)</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/googleidentity1.png"),
        <>Google One Tap Identity (splash screen unfinished!)</>),
];

const thumbnailImgs: string[] = [
    CreateRepoUrl("img/fishingwebapp/dropdownsearch1.png"),
    CreateRepoUrl("img/fishingwebapp/dropdownsearch2.png"),
    CreateRepoUrl("img/fishingwebapp/registerfisheryconfirm.png"),
    CreateRepoUrl("img/fishingwebapp/registerlake1.png"),
    CreateRepoUrl("img/fishingwebapp/registerlake2.png"),
    CreateRepoUrl("img/fishingwebapp/newsession1.png"),
    CreateRepoUrl("img/fishingwebapp/registerswim1.png"),
    CreateRepoUrl("img/fishingwebapp/newsession2.png"),
    CreateRepoUrl("img/fishingwebapp/cast1.png"),
    CreateRepoUrl("img/fishingwebapp/cast2.png"),
    CreateRepoUrl("img/fishingwebapp/editspot1.png"),
    CreateRepoUrl("img/fishingwebapp/editspot2.png"),
    CreateRepoUrl("img/fishingwebapp/editspot3.png"),
    CreateRepoUrl("img/fishingwebapp/editspot4.png"),
    CreateRepoUrl("img/fishingwebapp/createhook1.png"),
    CreateRepoUrl("img/fishingwebapp/googleidentity3.png"),
    CreateRepoUrl("img/fishingwebapp/googleidentity2.png"),
    CreateRepoUrl("img/fishingwebapp/googleidentity1.png"),
];

export const FishingWebAppPortfolio = (props: IFishingWebAppPortfolioProps) => {
    return (
        <PortfolioBase
            {...props}
            writeUp={WriteUp()}
            carouselImgs={carouselImgs}
            thumbnailImgs={thumbnailImgs}
            additionalCarouselFileClass={"PortfolioCarouselResponsiveFileClass"}
            additionalThumbnailFileClass={"FishingWebAppThumbs"}
            heading={heading}
        />
    );
};

//sidtodo
const heading=(
    <SegmentDemo heading="Fishing Web Application">
        <SegmentSubSection>
            <p>Back in 2018 my partner suggested to me, "why don't you make an application for fishing". This
                sparked the cogs ticking in my brain and a burst of ideas came to me in very quick succession.
                A combination of my 2 biggest hobbies.

                In 2022 I decided to start putting this into fruition.

                This initially started as a native mobile application using React Native, but after spending a lot of
                time getting frustrated with what felt like a very raw technology (at least at the time), I had the
                brainwave that the web is the way to go. Ultimately, what these technologies which try to work over
                different platforms are just trying to re-create what a feature packed browser like Chrome already
                achieves: a cross platform way, which has deep linking built in to the operating system.

                . After seeing the direction the web is going in with the explosion of new technologies
                (Web Assembly, Svelte, local first..), and the pleasure I get from developing in web, I decided to go
                web and not look back.

                The purpose of this application is to record telemetry related to fishing, for reporting and viewing trends.

                Unfortunately it is not finished, but watch this space!

                No doubt I'll be re-using some of this code in applications going forward.
                </p>
        </SegmentSubSection>
    </SegmentDemo>
);

//sidtodo
const WriteUp = (): JSX.Element => {
    return (
        <>
            <SegmentDemo heading="Features">
                <SegmentSubSection>
                    <ul>
                        <ul>
                            <li>An integrated web based camera application for visibly recording spots and direct
                                picture taking of fish caught and upload to the cloud. Working for both iOS and
                                Android devices.
                            </li>
                            <li>
                                Google One Tap login for identity and securing the back-end services which provides
                                instant account creation via an official identity provider and the latest in OAuth2
                                technology.
                            </li>
                            <li>Language translated for 22 of the most widely used languages via the <a
                                href={"https://cloud.google.com/translate"}>Google translations</a> API.</li>
                            <li>Highly scalable decentralised SQL architecture using Postgresql on multiple nodes.</li>
                            <li>Microservice REST API architecture.</li>
                            <li>Built from the ground up to be used worldwide.</li>
                            <li>Similar solution as described <a
                                href={"https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c"}>here</a>
                                for unique database ID's across multiple nodes.</li>
                            <li>Entirely customised CSS including my <a
                                href={"https://www.npmjs.com/package/react-cscarousel"}>react-cscarousel</a> responsive
                                React carousel NPM package.
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
        name: <>ASP .NET 8 / C#</>,
        descr: <>Technology used for the backend micro services.</>
    },
    {
        name: <><a href={"https://www.typescriptlang.org/"}>Typescript</a> version 5x</>,
        descr: <>Types for Javascript.</>
    },
    {
        name: <><a href={"https://react.dev/"}>React</a> version 19</>,
        descr: <>.</>
    },
    {
        name: <><a href={"https://vite.dev/"}>Vite</a></>,
        descr: <>Development and production client side application bundling.</>
    },
    {
        name: <><a href={"https://redux-toolkit.js.org/"}>Redux Tookit</a></>,
        descr: <>Client application state management and persistence.</>
    },
    {
        name: <><a href={"https://ngrok.com/"}>NGROK</a></>,
        descr: <>A very handy free tool to aid in debugging an application deployed to locally on a development
            workstation and a remote device such as a mobile phone.</>
    },
    {
        name: <><a href={"https://www.postgresql.org/"}>PostgreSQL</a></>,
        descr: <>Database technology.</>
    },
    {
        name: <><a href={"https://www.npgsql.org/"}>Npgsql</a></>,
        descr: <>ADO .NET data provider for PostgreSQL.</>,
    },
    {
        name: <><a href={"https://www.pgedge.com/"}>pg Edge</a></>,
        descr: <>Free application for providing distributed SQL replication.</>
    },
    {
        name: <>navigator.mediaDevices.getUserMedia and window.ImageCapture</>,
        descr: <>A variety of browser API's for capturing and taking images.</>
    },
    {
        name: <><a href={"https://sass-lang.com/"}>Sass</a></>,
        descr: <>A number of features that improve the use of CSS in my opinion.</>
    }
];