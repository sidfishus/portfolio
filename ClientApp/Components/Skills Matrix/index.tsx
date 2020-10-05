
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { Container, Segment, Label, Table, TableHeaderProps } from "semantic-ui-react";
import { HEADING_COLOUR } from "../../theme";
import { Link } from "react-router-dom";

export interface ISkillsMatrixProps {
};

enum eSkillsMatrixSortColumn {
    smcTechnology=1,
    smcExperience=2,
};

enum eSortDirection {
    sdAsc=1,
    scDesc=2
};

export const SkillsMatrix: React.FunctionComponent<ISkillsMatrixProps & IRoutedCompProps> = (props) => {

    const [sortColumn, SetSortColumn] = React.useState<eSkillsMatrixSortColumn>(eSkillsMatrixSortColumn.smcTechnology);
    const [sortDirection, SetSortDirection] = React.useState<eSortDirection>(eSortDirection.sdAsc);

    return (
        <>
            <Container>
                <Segment padded>
                    <Label color={HEADING_COLOUR} attached="top" content={"Skills Matrix"} />
                    <Table sortable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell
                                    {...SkillsMatrixSortProps(eSkillsMatrixSortColumn.smcTechnology, sortColumn,
                                        SetSortColumn, sortDirection, SetSortDirection)}
                                >
                                    Technology
                                </Table.HeaderCell>
                                <Table.HeaderCell
                                    style={{minWidth: 200}}
                                    {...SkillsMatrixSortProps(eSkillsMatrixSortColumn.smcExperience, sortColumn,
                                        SetSortColumn, sortDirection, SetSortDirection)}
                                >
                                    Experience</Table.HeaderCell>
                                <Table.HeaderCell>Areas</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {SortedSkillsMatrix(sortColumn,sortDirection).map(CreateSkillRow)}
                        </Table.Body>
                    </Table>
                </Segment>
            </Container>
        </>
    );
};

const SkillsMatrixSortProps = (thisColumn: eSkillsMatrixSortColumn, sortColumn: eSkillsMatrixSortColumn,
    SetSortColumn: (update: eSkillsMatrixSortColumn) => void, sortDirection: eSortDirection,
    SetSortDirection: (update: eSortDirection) => void): TableHeaderProps => {

    const sort=((sortColumn !== thisColumn)?{}:{
        sorted: ((sortDirection === eSortDirection.scDesc)?"descending":"ascending")
    });

    const onClick = ((sortColumn === thisColumn)?
        () => SetSortDirection((sortDirection === eSortDirection.scDesc)?eSortDirection.sdAsc:eSortDirection.scDesc):
        () => {
            SetSortColumn(thisColumn);
            SetSortDirection(eSortDirection.sdAsc);
        }
    );

    return {
        ...sort,
        onClick: onClick
    };
};

const CreateSkillRow = (skill: ISkillRow): JSX.Element => {

    return (
        <Table.Row key={skill.technology}>
            <Table.Cell>{skill.technology}</Table.Cell>
            <Table.Cell>{SkillsExperienceString(skill)}</Table.Cell>
            <Table.Cell>{skill.areas}</Table.Cell>
        </Table.Row>
    );
};

const YearString = (years: number): string => {
    if(years === 1) return "1 year";
    return `${years} years`;
};

const SkillsExperienceString = (skill: ISkillRow): string => {
    if(!skill.experienceCommercial) return YearString(skill.experienceTotal);
    if(skill.experienceTotal>skill.experienceCommercial) {
        return `${YearString(skill.experienceTotal)} (${YearString(skill.experienceCommercial)} commercial)`;
    }

    return `${YearString(skill.experienceCommercial)} commercial`;
};

interface ISkillRow {
    technology: string;
    experienceTotal: number;
    experienceCommercial: number;
    areas: JSX.Element;
};

// This was done October 2020 (will need to be updated over time)
const skillsMatrix: ISkillRow[] = [
    {
        technology: "C++",
        experienceTotal: 17, 
        experienceCommercial: 12,
        areas: <>Windows API, COM DLL, COM OCX GUI components, templates, object oriented programming,
            functional programming , Winsock TCP/IP, C++ 11 features,
            STL / Boost (bind, functions and
            adaptors, containers and algorithms, memory management and smart pointers), MFC, low level
            debugging, performance monitoring tools, multiple thread and process pipeline architecture,
            <a href="https://github.com/sidfishus/BlockAllocator">heap memory management</a>, managed database
            records and transactional model framework (same concept as Entity Framework), XML manipulation,
            Windows services, GUI applications, highly complex algorithms, warehouse management, electronic data interchange, 
            checksums and encryption, PC 3D game using <a href="https://www.ogre3d.org/">OGRE</a>,
            IRC bots, raw HTTP connections, remote debugging, SQL database schema upgrades,
            low level ODBC API's, Microsoft SAL and more</>
    },
    {
        technology: "C",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: <>Handheld barcode scanner drivers for vendors such as Motorola and Datalogic, Unix, TCP/IP sockets,
            GCC</>
    },
    {
        technology: "SQL",
        experienceTotal: 14, 
        experienceCommercial: 14,
        areas: <>Microsoft SQL Management Studio various versions, large scale database creation, 
            indexing and performance, partitioning, highly complex queries involving millions of records</>
    },
    {
        technology: "Git / Github",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: <>Command lines, repository creation, Github/NuGet package creation, integration with Team Foundation Server and
            Visual Code, I manage my own <a href="https://github.com/sidfishus">Github account</a> which has 8 repositories</>
    },
    {
        technology: "Delphi / Pascal",
        experienceTotal: 12, 
        experienceCommercial: 12,
        areas: <>Large scale Windows executables incorporating C++ COM ActiveX controls</>
    },
    {
        technology: "Microsoft Windows 32Bit and 64Bit",
        experienceTotal: 19, 
        experienceCommercial: 14,
        areas: <>All versions from Windows 98 upwards.</>
    },
    {
        technology: "Javascript",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: <>Modern features through the use of Babel, Webpack / Babel, Node, Gulp, client and server-side
            pre-rendering, object oriented programming, functional programming, unit testing, React, Redux, 
            hot module replacement, aspnet-webpack, Flow (Facebook), Identity Server 4 OIDC client, Axios,
            used in the <Link to="/portfolio/misc">intranet application</Link> / 
            <Link to="/portfolio/hands">data capture and reporting application</Link> /
            <Link to="/portfolio/dpa">distributed SPA</Link> /
            <Link to="/textparse">text parse user interface</Link> and the social media application which is in the
            early stages</>
    },
    {
        technology: "Typescript",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: <>Modern object oriented programming features (classes/interfaces/types e.t.c.), static type checking
            and compilation, incorporation with Webpack,
            used in the <Link to="/portfolio/misc">intranet application</Link> /
            <Link to="/portfolio/dpa">distributed SPA</Link> and the
            <Link to="/textparse">text parse user interface</Link></>
    },
    {
        technology: "React",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: <>Hooks, class components, Semantic UI React, React Bootstrap, Material UI, signature capture,
            drop zone, Recharts, React Router, React GA (Google Analytics),
            used in the <Link to="/portfolio/misc">intranet application</Link> / 
            <Link to="/portfolio/hands">data capture and reporting application</Link> /
            <Link to="/portfolio/dpa">distributed SPA</Link> /
            <Link to="/textparse">text parse user interface</Link> and the social media application which
            is in progress</>
    },
    {
        technology: ".NET",
        experienceTotal: 6, 
        experienceCommercial: 5,
        areas: <>Entity Framework various versions, installer/deployment system, COM interop, Windows services,
            SQL database interaction, Rosylyn compiler framework, desktop and mobile GUI applications, 
            various command line utilities, SQL Server Compact Remote Data Access</>
    },
    {
        technology: "Unix",
        experienceTotal: 2, 
        experienceCommercial: 0,
        areas: <>Emacs, GCC, complex C programs including TCP/IP</>
    },
    {
        technology: "Microsoft Visual Studio and Team Foundation Server (TFS)",
        experienceTotal: 17, 
        experienceCommercial: 14,
        areas: <>Versions 6.0 / 2008 / 2012 / 2017, TFS using both TFS and Git modes, macros,
            keyboard shortcuts, advanced debugging</>
    },
    {
        technology: "Azure Dev Ops",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: <>The usual Git features, building and deployment to Azure, used by the <Link to="/portfolio/misc">intranet application</Link></>
    },
    {
        technology: "Azure",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: <>This application is hosted in an Azure account that I created and manage, App services,
            function apps, storage accounts, Cosmos DB, Azure Active Directory, Redis Cache, 
            used to host <a href="https://github.com/sidfishus/react-spa-demo">THIS</a> application using an Azure
            account I created and manage /
            the <Link to="/portfolio/misc">intranet application</Link> which I manage</>
    },
    {
        technology: "IIS",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: <>Versions 6 - 10, on-premise web site creation and management</>
    },
    {
        technology: "ASP .NET",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: <>MVC, MVC Core, Web Forms, Web Services, server side pre-rendering, SPA services, //sidtodo</>
    },
    {
        technology: "C#",
        experienceTotal: 6, 
        experienceCommercial: 5,
        areas: <>//sidtodo</>
    },
    {
        technology: "Authentication / authorisation",
        experienceTotal: 3, 
        experienceCommercial: 2,
        areas: <>Identity Server 4, //sidtodo</>
    },
    {
        technology: "VB Script",
        experienceTotal: 10, 
        experienceCommercial: 9,
        areas: <>Classic ASP, //sidtodo</>
    },
    {
        technology: "Visual Basic/VB .NET",
        experienceTotal: 3, 
        experienceCommercial: 1,
        areas: <>ASP .NET, Windows GUI, Winsock TCP/IP, Win API, //sidtodo</>
    },
    {
        technology: "Microsoft Visual Code",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: <>C#, Javascript, Typescript, React, Webpack, Babel, Gulp, NuGet, //sidtodo</>
    },
    {
        technology: "Object Oriented Programming",
        experienceTotal: 17, 
        experienceCommercial: 14,
        areas: <>C++, C#, Javascript, Typescript, Eiffel, Action Script, VB, React, //sidtodo</>
    },
    {
        technology: "Functional Programming",
        experienceTotal: 5, 
        experienceCommercial: 3,
        areas: <>C++, C#, Javascript, Typescript //sidtodo</>
    },
    {
        technology: "Unit Testing",
        experienceTotal: 4, 
        experienceCommercial: 2,
        areas: <>My text parse library, .NET conversion, my C++ allocator, //sidtodo</>
    },
    {
        technology: "Assembly Language",
        experienceTotal: 1, 
        experienceCommercial: 0,
        areas: <>DOS //sidtodo</>
    },
];

const SortedSkillsMatrix = (sortColumn:eSkillsMatrixSortColumn,sortDirection:eSortDirection) => {

    const SortFunction=SkillsMatrixSortFunc(sortColumn, sortDirection);

    if(SortFunction===null) return skillsMatrix;

    // Slice copies an array and returns the copy, so the sort method does not touch the skills matrix array.
    return skillsMatrix.slice().sort(SortFunction);
};

const SkillsMatrixSortFunc = (sortColumn:eSkillsMatrixSortColumn,
    sortDirection:eSortDirection): (lhs: ISkillRow, rhs: ISkillRow) => number => {
    switch(sortColumn) {
        case eSkillsMatrixSortColumn.smcTechnology:
            return ((sortDirection==eSortDirection.sdAsc)?(a,b) =>
                SortSkillsMatrixByTechnology(a,b):(a,b) => SortSkillsMatrixByTechnology(b,a));

        case eSkillsMatrixSortColumn.smcExperience:
            return ((sortDirection==eSortDirection.sdAsc)?(a,b) =>
                SortSkillsByExperience(a,b):(a,b) => SortSkillsByExperience(b,a));

        default:
            return null;
    }
};

const SortSkillsMatrixByTechnology = (lhs: ISkillRow, rhs: ISkillRow): number => {
    return lhs.technology.localeCompare(rhs.technology);
};

const SortSkillsByExperience = (lhs: ISkillRow, rhs: ISkillRow): number => {
    const rv= lhs.experienceTotal-rhs.experienceTotal;
    if(rv) return rv;
    return lhs.experienceCommercial-rhs.experienceCommercial;
};