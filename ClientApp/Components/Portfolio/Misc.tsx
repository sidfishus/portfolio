
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { PortfolioBase, ICarouselImg } from "./PortfolioBase";
import { Table } from "semantic-ui-react";

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
            <h1>Organisational Chart</h1>
            <p>Is drawn dynamically according to data supplied by the Azure Active Directory. //sidtodo</p>
            <h2>Technology</h2>
            <p>Below is the list of technology used:</p>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.Cell>Technology</Table.Cell>
                        <Table.Cell>Purpose</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>ASP .NET MVC Core 2</Table.Cell>
                        <Table.Cell>Hosts the web application as well as providing API's and access to the database</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Webpack</Table.Cell>
                        <Table.Cell>Bundles the client and server script files</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Babel</Table.Cell>
                        <Table.Cell>Transpilation to allow the use of new Javascript features but with native compatability in a wide range of browsers</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Typescript</Table.Cell>
                        <Table.Cell>Static type checking in the Javascript code</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>React / JSX</Table.Cell>
                        <Table.Cell>The entire Javascript application is rendered by React and it's JSX syntax</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Redux</Table.Cell>
                        <Table.Cell>Data accessor and mutator functionality for the browser application is encapsulated in Redux stores and is accessible as 'props' via the connect function</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Semantic UI React</Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Azure AD</Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Azure Cosmos DB</Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <h2>Process</h2>
        </>
    );
};