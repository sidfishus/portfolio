
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { PortfolioBase, ICarouselImg } from "./PortfolioBase";

export interface IHAndSPortfolioProps extends IRoutedCompProps {
};

export const HAndSPortfolio: React.SFC<IHAndSPortfolioProps> = (props) => {
    return (
        <PortfolioBase
            {...props}
            about={About()}
            aboutHeading="House Construction Health and Safety Web System (CAIRS)"
            carouselImgs={carouselImgs}
        />
    );
};

//sidtodo improve

// CAIRS is a 

// I built this alongside
// original site jquery / classic ASP

// plethora of existing
// fully live within 9 months
const About: any = () => {
    return (
        <>
            <p>CAIRS is an on-premise house construction health and safety web application.</p>
            <p>It is used by employees to record accidents and incidents, labour returns and safety observations.
                These values are then used to calculate the accident and incident rate (AIR) across all levels of the company and are used to form a variety of tables and graphs.
            </p>
            <p>
                The concept for this came from the original 'system' which consisted of a large set of Excel spreadsheets where totals had to be manually extracted in order to do the reporting.
                The administrators using this system mentioned that it saves them at least 2 working days per month as well as providing more accurate figures.
            </p>
            <p>
                The frontend is a single page application written in Javascript and React and is served by a dedicated ASP .NET MVC Core process.
                Data, transactions and authentication is handled by the dedicated API process which again uses ASP .NET MVC Core.
                The theme used was originally created for another system using classic ASP and jQuery.
                I reused the CSS and layout but rewrote it using React Bootstrap
                
                 a dedicated , a dedicated API which serves 

                SQL backend and serves the data 

                Besides the theme 

                Micro adjustments and look and feel.
            </p>
        </>
    );
};

const carouselImgs: ICarouselImg[] = [
    {
        src: "/img/hands/homepage1.jpg",
        text: "Home page including live graphs using Recharts."
    },

    {
        src: "/img/hands/aireport1.jpg",
        text: "Accident and incident report creation."
    },

    {
        src: "/img/hands/aireport2.jpg",
        text: "Accident and incident report creation."
    },

    {
        src: "/img/hands/aireport3.jpg",
        text: "Accident and incident report creation."
    },

    {
        src: "/img/hands/aireport4.jpg",
        text: "Accident and incident report creation."
    },

    {
        src: "/img/hands/ailist1.jpg",
        text: "Accident and incident report list using React Bootstrap Data Tables."
    },

    {
        src: "/img/hands/ailist2.jpg",
        text: "Accident and incident report list using React Bootstrap Data Tables."
    },

    {
        src: "/img/hands/ailist3.jpg",
        text: "General PDF export functionality available on all screens."
    },

    {
        src: "/img/hands/ailist4.jpg",
        text: "General PDF export functionality available on all screens."
    },

    {
        src: "/img/hands/report1.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/report2.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/report3.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/report4.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/report5.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/report6.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/report7.jpg",
        text: "Reporting."
    },

    {
        src: "/img/hands/staticdataentry1.jpg",
        text: "Static data maintenance."
    },

    {
        src: "/img/hands/staticdataentry2.jpg",
        text: "Static data maintenance."
    },

    {
        src: "/img/hands/usermaintenance1.jpg",
        text: "User maintenance."
    },

    {
        src: "/img/hands/usermaintenance2.jpg",
        text: "User maintenance."
    },
];