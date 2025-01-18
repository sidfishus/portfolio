import {IRoutedCompProps} from "../../routes.tsx";
import {CreateImage, ICarouselImg, ITechnologyInfo, PortfolioBase, TechnologyTable} from "./PortfolioBase.tsx";
import {CreateRepoUrl} from "../../CreateRepoUrl.ts";
import * as React from "react";
import {SegmentDemo, SegmentSubSection} from "../Presentation.tsx";

export interface IFishingWebAppPortfolioProps extends IRoutedCompProps {
};

//sidtodo order these with best = first
//sidtodo redo the register fishery one: new border
const carouselImgs: ICarouselImg[] = [
    CreateImage(CreateRepoUrl("img/fishingwebapp/dropdownsearch1.png"),
        <>Dropdown search control</>),
    CreateImage(CreateRepoUrl("img/fishingwebapp/dropdownsearch2.png"),
        <>Dropdown search control</>),
];

const thumbnailImgs: string[] = [
    CreateRepoUrl("img/fishingwebapp/Thumbs/dropdownsearch1.jpg"),
    CreateRepoUrl("img/fishingwebapp/dropdownsearch2.png"),
];

export const FishingWebAppPortfolio = (props: IFishingWebAppPortfolioProps) => {
    return (
        <PortfolioBase
            {...props}
            writeUp={WriteUp()}
            carouselImgs={carouselImgs}
            thumbnailImgs={thumbnailImgs}
            additionalCarouselFileClass={"SixteenByNineAspectRatio"}
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
];

/*
features:
- camera app and file upload
- touch screen
- Google Identity for identity and securing the backend API. (show screenshot)
- scalable, Postgresql multiple node, replication via PGEdge.
- language translations
- worldwide
 */
