
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import {PortfolioBase, ICarouselImg, CreateImage} from "./PortfolioBase";
import { SegmentDemo, SegmentSubSection } from "../Presentation";
import {CreateRepoUrl} from "../../CreateRepoUrl.ts";

export interface IBlytheMillShedsPortfolioProps extends IRoutedCompProps {
};

const carouselImgs: ICarouselImg[] = [
    CreateImage(CreateRepoUrl("img/blythemillsheds/carouselmobile1.png"),
        "Image gallery carousel displayed on a mobile device."),
    CreateImage("https://raw.githubusercontent.com/sidfishus/distributedspa/master/ss2.png",
        "User must grant permissions for the application to impersonate them.")
];

export const BlytheMillShedsPortfolio = (props: IBlytheMillShedsPortfolioProps) => {
    return (
        <PortfolioBase
            {...props}
            writeUp={WriteUp()}
            carouselImgs={carouselImgs}
        />
    );
};

const WriteUp = (): JSX.Element => {
    return (
        <>
            <SegmentDemo heading="Blythe Mill Sheds">
                <SegmentSubSection>
                    <p><a href={"https://blythemillsheds.co.uk"}>Blythe Mill Sheds</a> is a responsive mobile first web
                        application I created for a client in 2023 to their specifications.
                        The purpose of the application is to advertise their business.</p>
                    <p>It is hosted
                        on <a href={"https://www.ionos.co.uk/hosting/windows-hosting#packages"}>Ionos</a> for a small
                        monthly fee and incorporates a .NET 6 backend written in C#. The front-end
                        leverages React version 18 and Typescript.
                    </p>
                    <p>Features:
                        <ul>
                            <li>Entirely customised CSS including a bespoke carousel and checkbox list (see screenshots).</li>
                            <li>A <a href={"https://elfsight.com/"}>Elf Sight</a> widget for displaying customer reviews.</li>
                        </ul>
                    </p>
                </SegmentSubSection>
            </SegmentDemo>
        </>
    );
};

/*
//sidtodo
features:
- all custom CSS (no library)
    - carousel
    - select
- elf sight
- email functionality using SendGrid
- latest React
- webpack dev server
- .NET 6
- SEO
- see if AI can improe
 */