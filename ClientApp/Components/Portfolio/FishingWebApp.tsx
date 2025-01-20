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
        <>Handmade dropdown search control</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/dropdownsearch2.png"),
        <>Handmade dropdown search control</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/registerfisheryconfirm.png"),
        <>Registering a new fishery</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/registerlake1.png"),
        <>Registering a new lake</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/registerlake2.png"),
        <>Registering a new lake</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/newsession1.png"),
        <>Begin a new fishing session</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/registerswim1.png"),
        <>Register a new swim</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/newsession2.png"),
        <>Begin a new fishing session</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/cast1.png"),
        <>Cast</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/cast2.png"),
        <>Cast</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot1.png"),
        <>Record a spot details</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot2.png"),
        <>Record a spot details</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot3.png"),
        <>Record a spot details</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/createhook1.png"),
        <>Record end tackle / bait details for generating reports!</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/googleidentity3.png"),
        <>Google One Tap Identity (splash screen unfinished!)</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/googleidentity2.png"),
        <>Google Identity (splash screen unfinished!)</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/googleidentity1.png"),
        <>Google Identity (splash screen unfinished!)</>),
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
                                picture taking of fish caught. Working for both IPhone and Android devices.
                            </li>
                            <li>
                                Google One Tap login for identity and securing the back-end services which provides
                                instant account creation via an official identity provider and the latest in OAuth2
                                technology.
                            </li>
                            <li>Language translated for 22 of the most widely used languages via the <a
                                href={"https://cloud.google.com/translate"}>Google translations</a> API.</li>
                            <li>Entirely customised CSS.</li>
                            <li>
                                My <a
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
        name: <>ASP .NET 6 / C#</>,
        descr: <>.</>
    },
    {
        name: <>Vite</>,
        descr: <>.</>
    },
    {
        name: <>Redux dev tools??</>,
        descr: <>.</>
    },
    {
        name: <>NGROK</>,
        descr: <>.</>
    },
];

/*
features:
- camera app and file upload on both iphone and android. using ...
- Google Identity for identity and securing the backend API. (show screenshot) google one tap: get the link
- scalable decentralised Sql database architecture, Postgresql multiple node, replication via PGEdge.
- language translations
- worldwide
- microservice architecture for scale
- an implementation of https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c for multi node ID.
 */
