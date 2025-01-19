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
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot1.png"),
        <>Record a spot details</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot2.png"),
        <>Record a spot details</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/editspot3.png"),
        <>Record a spot details</>),
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
    CreateRepoUrl("img/fishingwebapp/editspot1.png"),
    CreateRepoUrl("img/fishingwebapp/editspot2.png"),
    CreateRepoUrl("img/fishingwebapp/editspot3.png"),
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
            <p>Fishing web application</p>
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
                            <li>Entirely customised CSS.
                            </li>
                            <li>
                                My <a href={"https://www.npmjs.com/package/react-cscarousel"}>react-cscarousel</a> responsive React carousel NPM package.
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
- camera app and file upload
- touch screen
- Google Identity for identity and securing the backend API. (show screenshot) google one tap: get the link
- scalable decentralised Sql database architecture, Postgresql multiple node, replication via PGEdge.
- language translations
- worldwide
- microservice architecture for scale
- an implementation of https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c for multi node ID.
 */
