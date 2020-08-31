
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { PortfolioBase, ICarouselImg } from "./PortfolioBase";

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
        text: "Organisational chart created in React, Redux and Semantic UI."
    },

    {
        src: "/img/misc/orgchart2.jpg",
        text: "Organisational chart created in React, Redux and Semantic UI."
    },

    {
        src: "/img/misc/orgchart3.jpg",
        text: "Organisational chart created in React, Redux and Semantic UI."
    },

    {
        src: "/img/misc/orgchart4.jpg",
        text: "Organisational chart created in React, Redux and Semantic UI."
    },

    {
        src: "/img/misc/orgchart5.jpg",
        text: "Organisational chart created in React, Redux and Semantic UI."
    },
];

const About: any = () => {
    return (
        <>
            <p>Miscellaneous work and minor projects.</p>
        </>
    );
};