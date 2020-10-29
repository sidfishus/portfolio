
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { Table, TableHeaderProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ContainerDemo, SegmentDemo, SegmentSubSection} from "../Presentation";

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
            <ContainerDemo>
                <SegmentDemo heading="Skills Matrix">
                    <SegmentSubSection>
                        <p>Below is a list of the computer programming related technologies and concepts that I have used
                            with an approximation of how much experience in years, and the specific areas that I remember working on.
                        </p>
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
                    </SegmentSubSection>
                </SegmentDemo>
            </ContainerDemo>
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
    if(!skill.experienceCommercial) {
        if(!skill.experienceTotal) return "N/A";
        return YearString(skill.experienceTotal);
    }
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

const AreaLinkBreak: React.SFC = () => {
    return <><br/><br/></>;
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
            low level ODBC API's, Microsoft SAL and more.</>
    },
    {
        technology: "C",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: <>Handheld barcode scanner drivers for vendors such as Motorola and Datalogic, Unix, TCP/IP sockets,
            GCC.</>
    },
    {
        technology: "SQL",
        experienceTotal: 14, 
        experienceCommercial: 14,
        areas: <>Microsoft SQL Management Studio various versions, large scale database creation, 
            indexing and performance, partitioning, highly complex queries involving millions of records.</>
    },
    {
        technology: "Git / Github",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: <>Command lines, repository creation, Github/NuGet package creation, integration with Team Foundation Server and
            Visual Code, I manage my own <a href="https://github.com/sidfishus">Github account</a> which has 8 repositories.</>
    },
    {
        technology: "Delphi / Pascal",
        experienceTotal: 12, 
        experienceCommercial: 12,
        areas: <>Large scale Windows executables incorporating C++ COM ActiveX controls.</>
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
            hot module replacement, aspnet-webpack, Flow (Facebook), Identity Server 4 OIDC client, Axios.<AreaLinkBreak/>
           It is used in the <Link to="/portfolio/misc">intranet application</Link>,
            <Link to="/portfolio/hands">data capture and reporting application</Link>,
            <Link to="/portfolio/dpa">distributed SPA</Link>,
            <Link to="/textparse">text parse user interface</Link> and the social media application which is in the
            early stages.</>
    },
    {
        technology: "Typescript",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: <>Modern object oriented programming features (classes/interfaces/types e.t.c.), static type checking
            and compilation, incorporation with Webpack.<AreaLinkBreak/>
            It is used in the <Link to="/portfolio/misc">intranet application</Link>,
            <Link to="/portfolio/dpa">distributed SPA</Link> and the
            <Link to="/textparse">text parse user interface</Link>.</>
    },
    {
        technology: "React",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: <>Hooks (React.FunctionComponent), class components (React.Component and React.PureComponent),
            stateless function components (React.SFC), Semantic UI React, React Bootstrap, Material UI, signature capture,
            drop zone, Recharts, React Router, React GA (Google Analytics), SPFX (Sharepoint O365),
            lazy loading (React.Lazy). <AreaLinkBreak/>
            It is used in the <Link to="/portfolio/misc">intranet application</Link>,
            <Link to="/portfolio/hands">data capture and reporting application</Link>,
            <Link to="/portfolio/dpa">distributed SPA</Link>,
            <Link to="/textparse">text parse user interface</Link> and the social media application which
            is in progress.</>
    },
    {
        technology: ".NET",
        experienceTotal: 6, 
        experienceCommercial: 5,
        areas: <>Entity Framework various versions, installer/deployment system, COM interop, Windows services,
            SQL database interaction, Rosylyn compiler framework, desktop and mobile GUI applications, 
            various command line utilities, SQL Server Compact Remote Data Access,
            LINQ and LINQ extensions.</>
    },
    {
        technology: "Unix",
        experienceTotal: 2, 
        experienceCommercial: 0,
        areas: <>Emacs, GCC, complex C programs including TCP/IP sockets.</>
    },
    {
        technology: "Microsoft Visual Studio and Team Foundation Server (TFS)",
        experienceTotal: 17, 
        experienceCommercial: 14,
        areas: <>Versions 6.0 / 2008 / 2012 / 2017, TFS using both TFS and Git modes, macros,
            keyboard shortcuts, advanced debugging, disassembly for native Windows C/C++ programs.</>
    },
    {
        technology: "Azure Dev Ops",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: <>The usual Git functionality, building and deployment to Azure, repos and pipelines
            and is used in the <Link to="/portfolio/misc">intranet application</Link> which I manage.</>
    },
    {
        technology: "Azure",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: <>App services, function apps, storage accounts, Cosmos DB, Azure Active Directory,
            Redis Cache, Kudu.
            <AreaLinkBreak/> 
            It is used to host <a href="https://github.com/sidfishus/react-spa-demo">THIS</a> application using an Azure
            account I created and manage and the <Link to="/portfolio/misc">intranet application</Link> which I also manage.</>
    },
    {
        technology: "IIS",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: <>Versions 6 - 10, development, test, and live on-premise web site hosting.</>
    },
    {
        technology: "ASP .NET",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: <>MVC, MVC Core, Web Forms, Web Services, dedicated protected API's using inbuilt authorisation,
            dedicated identity servers, server side pre-rendering, hot module replacement,
            SPA's and SPA/Node services.<AreaLinkBreak/>
            It is used in the <Link to="/portfolio/misc">intranet application</Link>, 
            <Link to="/portfolio/hands">data capture and reporting application</Link>,
            <Link to="/portfolio/dpa">distributed SPA</Link>,
            <Link to="/textparse">text parse user interface</Link> and the social media application which
            is in progress.</>
    },
    {
        technology: "C#",
        experienceTotal: 6, 
        experienceCommercial: 5,
        areas: <>Object oriented programming, functional programming, generics, multiple threading,
            'Task' / async / await, see .NET for more.<AreaLinkBreak/>
            Used in the majority of my <a href="">Github repositories</a> but specifically in the
            <Link to="/portfolio/textparse">text parse library</Link> and the
            <Link to="/portfolio/scriptabletemplate">scriptable template</Link>.</>
    },
    {
        technology: "Authentication / authorisation",
        experienceTotal: 3, 
        experienceCommercial: 2,
        areas: <>Identity Server 4 (ASP .NET), OAuth2 bearer tokens (ASP .NET), custom implementation of IUserStore
            and IUser (ASP .NET) for validating user authorisation, API's secured using Azure AD and single sign on
            (ASP .NET).
            <AreaLinkBreak/>
            Used in the <Link to="/portfolio/dpa">distributed SPA</Link>
            and the <Link to="/portfolio/hands">data capture and reporting application</Link>. <AreaLinkBreak/>
            Out of everything I find this subject the most complex and challenging.</>
    },
    {
        technology: "VB Script",
        experienceTotal: 8, 
        experienceCommercial: 7,
        areas: <>Largescale classic ASP web applications, warehouse management scripts,
            order allocation and splitter scripts (complex bespoke algorithms),
            bespoke extensions and features, syntax conversion to VB .NET.</>
    },
    {
        technology: "Visual Basic/VB .NET",
        experienceTotal: 3, 
        experienceCommercial: 1,
        areas: <>ASP .NET, Windows GUI, Winsock TCP/IP, Win API, COM.</>
    },
    {
        technology: "Microsoft Visual Code",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: <>C#, Javascript, Typescript, React, Webpack, Babel, Gulp, NuGet, Git, extensions,
            .NET command line applications, ASP .NET / MVC / MVC Core.</>
    },
    {
        technology: "Object Oriented Programming",
        experienceTotal: 17, 
        experienceCommercial: 14,
        areas: <>C++, C#, Javascript, Typescript, Eiffel, Action Script, VB, React, Java.</>
    },
    {
        technology: "Functional Programming",
        experienceTotal: 5, 
        experienceCommercial: 3,
        areas: <>C++, C#, Javascript, Typescript.</>
    },
    {
        technology: "Unit Testing",
        experienceTotal: 4, 
        experienceCommercial: 2,
        areas: <>Automated testing of pure functions, integration with libraries for making assertions, 
            I use this where necessary taking in to account time constraints and the importance of the
            code being tested. <AreaLinkBreak/>
            I have not used a testing framework. <AreaLinkBreak/>
            You can see examples of unit testing in my <Link to="/portfolio/textparse">text parse library</Link> and
            my <a href="https://github.com/sidfishus/BlockAllocator">C++ heap memory management library</a>.</>
    },
    {
        technology: "Assembly Language",
        experienceTotal: 3, 
        experienceCommercial: 2,
        areas: <>I have created small ASM programs that run on 16 bit Windows DOS for pleasure and a deeper understanding.
            <AreaLinkBreak/>I have used program disassembly of native Windows 32bit executables for low level performance
            comparisons.</>
    },
    {
        technology: "Miscellaneous and Minor",
        experienceTotal: 0, 
        experienceCommercial: 0,
        areas: <><a href="https://github.com/sidfishus/PowerBIManageEngineExtension">Power BI custom data connectors
            using the M language</a>, DOS scripting, Perl scripting, MS Graph (O365), Flow/Power Automate (O365),
            Sharepoint and SPFX consuming data from AAD authorised API's, Java, HTML, CSS (a weakness) and more which
            has now faded from my memory!</>
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