import {IRoutedCompProps} from "../../routes.tsx";
import {CreateImage, ICarouselImg, ITechnologyInfo, PortfolioBase, TechnologyTable} from "./PortfolioBase.tsx";
import {CreateRepoUrl} from "../../CreateRepoUrl.ts";
import * as React from "react";
import {SegmentDemo, SegmentSubSection} from "../Presentation.tsx";

export interface IFishingWebAppPortfolioProps extends IRoutedCompProps {
};

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
        <>Register a new swim.</>,"RegisterSwim1"),
    CreateImage(CreateRepoUrl("img/fishingwebapp/newsession2.png"),
        <>Begin a new fishing session.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/cast1.png"),
        <>Record the details of individual casts: bait, rig, spot.</>,"Cast1"),
    CreateImage(CreateRepoUrl("img/fishingwebapp/cast2.png"),
        <>Record the details of individual casts: bait, rig, spot.</>,"Cast2"),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot1.png"),
        <>Record the details of a fishing spot.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot2.png"),
        <>Record the details of a fishing spot.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot3.png"),
        <>Record the details of a fishing spot.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot4.png"),
        <>Record the details of a fishing spot and it's history if it changes over time.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/spotsnap1.jpg"),
        <>Take a picture of the fishing swim.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/spotsnap2.jpg"),
        <>Use the touchscreen on the device to pinpoint the exact hot spot (x marks the spot).</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/spotsnap3.jpg"),
        <>Use the touchscreen on the device to pinpoint the exact hot spot (x marks the spot).</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/spotgallery1.jpg"),
        <>Use the gallery to cycle between previously uploaded images and pinpoint the spot (from a mobile).</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/spotgallery2.png"),
        <>Use the gallery to cycle between previously uploaded images and pinpoint the spot (from a desktop device).</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/createhook1.png"),
        <>Record rig / bait attribute telemetry for generating reports and visualising trends.</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/googleidentity3.png"),
        <>Google one tap identity login (splash screen unfinished!)</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/googleidentity2.png"),
        <>Google one tap identity login (splash screen unfinished!)</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/googleidentity1.png"),
        <>Google one tap identity login (splash screen unfinished!)</>),
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
    CreateRepoUrl("img/fishingwebapp/spotsnap1.jpg"),
    CreateRepoUrl("img/fishingwebapp/spotsnap2.jpg"),
    CreateRepoUrl("img/fishingwebapp/spotsnap3.jpg"),
    CreateRepoUrl("img/fishingwebapp/spotgallery1.jpg"),
    CreateRepoUrl("img/fishingwebapp/spotgallery2.png"),
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

const heading=(
    <SegmentDemo heading="Fishing Web Application">
        <SegmentSubSection>
            <p>A synergy of my 2 favourite hobbies.</p>
            <p>
                Back in 2018 my partner suggested to me, "why don't you make an application for fishing".
                With this, a burst of ideas came to me in very quick session and I began writing them down and fleshing
                out the design. Over the next few years I thought about this a lot, and solved a lot of the complexity
                (such as scaling it) but my time was taken up by other things.</p>
            <p>
                In 2022 I decided to start putting my ideas into fruition.
                This initially started as a native mobile application using React Native, but after spending a lot of
                time getting frustrated with what felt like a very raw technology (at least at the time), I had the
                brainwave that the web is the way to go, and any technology such as React Native is just trying to
                reinvent the wheel which the web is already working on fixing.
                Especially with the explosion of new technologies that I am extremely excited about (Web Assembly!!,
                Svelte, local first development..), and the pleasure I get from developing in web.
                </p>
            <p>
                The purpose of this application is to record telemetry related to fishing such as the fish themselves,
                and all the factors of how and where they are caught, so an infinite number of reports can be
                generated. And to create a live catch report of all fish being caught around the globe.
                No longer would we have to rely on anglers like Chris Ball to record the history of the sport,
                but instead this would be provided directly by the anglers and venue owners (who would be incentivised)
                which is secured and backed up in the cloud.
                </p>
            <p>
                It has huge potential but unfortunately is still a work in progress.
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
                        <li>An integrated web based camera application for visibly recording spots and fish caught,
                            and uploading them to the cloud. Working for both iOS and Android devices.
                        </li>
                        <li>
                            Google One Tap login for identity and securing the back-end microservices. This provides
                            instant account creation via an official identity provider utilising bleeding edge OAuth2
                            technology.
                        </li>
                        <li>Language translated for 22 of the most widely used languages via the <a
                            href={"https://cloud.google.com/translate"}>Google translations</a> API.</li>
                        <li>Highly scalable decentralised SQL architecture using Postgresql on multiple nodes.</li>
                        <li>Microservice REST API architecture.</li>
                        <li>Built from the ground up to be used around the globe.</li>
                        <li>Similar solution as described <a
                            href={"https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c"}>
                            here</a> for unique database ID's across multiple nodes.</li>
                        <li>Entirely customised CSS including my <a
                            href={"https://www.npmjs.com/package/react-cscarousel"}>react-cscarousel</a> responsive
                            React carousel NPM package.
                        </li>
                        <li>
                            Extreme amount of attributes and data captured to provide an infinite number of reports and
                            data visualisations.
                        </li>
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
        descr: <>Technology used for the backend micro services and hosting static web content.</>
    },
    {
        name: <><a href={"https://www.typescriptlang.org/"}>Typescript</a> version 5x</>,
        descr: <>Types for Javascript in the client application.</>
    },
    {
        name: <><a href={"https://react.dev/"}>React</a> version 19</>,
        descr: <>Used to create reactive web based user interfaces.</>
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
        name: <><a href={"https://ngrok.com/"}>Ngrok</a></>,
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
        descr: <>A variety of widely supported browser API's for capturing and taking images.</>
    },
    {
        name: <><a href={"https://sass-lang.com/"}>Sass</a></>,
        descr: <>Includes a number of features that improve the use of CSS in my opinion.</>
    }
];