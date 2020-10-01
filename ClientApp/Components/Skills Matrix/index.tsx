
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { Container, Segment, Label, Table, TableHeaderProps } from "semantic-ui-react";
import { HEADING_COLOUR } from "../../theme";

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

const SkillsExperienceString = (skill: ISkillRow): string => {
    if(skill.experienceTotal>skill.experienceCommercial) {
        return `${skill.experienceTotal} year(s) (${skill.experienceCommercial} year(s) commercial)`;
    }

    return `${skill.experienceCommercial} year(s) commercial`;
};

interface ISkillRow {
    technology: string;
    experienceTotal: number;
    experienceCommercial: number;
    areas: string;
};

// This was done October 2020 (will need to be updated over time)
const skillsMatrix: ISkillRow[] = [
    {
        technology: "C++",
        experienceTotal: 17, 
        experienceCommercial: 12,
        areas: "Windows API, COM DLL, COM OCX, STL //sidtodo, Boost //sidtodo"
    },
    {
        technology: "C",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: "Scanner drivers //sidtodo"
    },
    {
        technology: "SQL",
        experienceTotal: 14, 
        experienceCommercial: 14,
        areas: "Indexing / performance //sidtodo"
    },
    {
        technology: "Git command line",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: "//sidtodo"
    },
    {
        technology: "Delphi / Pascal",
        experienceTotal: 12, 
        experienceCommercial: 12,
        areas: "Large scale Windows executables //sidtodo"
    },
    {
        technology: "Microsoft Windows",
        experienceTotal: 19, 
        experienceCommercial: 14,
        areas: "All versions from Windows 98 upwards."
    },
    {
        technology: "Javascript",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: "//sidtodo"
    },
    {
        technology: "React",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: "Hooks //sidtodo"
    },
    {
        technology: ".NET",
        experienceTotal: 6, 
        experienceCommercial: 5,
        areas: "RDA push/pull //sidtodo"
    },
    {
        technology: "Unix",
        experienceTotal: 1, 
        experienceCommercial: 1,
        areas: "//sidtodo"
    },
    {
        technology: "Team Foundation Studio",
        experienceTotal: 1, 
        experienceCommercial: 1,
        areas: "2008, 2012, 2017 //sidtodo"
    },
    {
        technology: "Azure Dev Ops",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: "//sidtodo"
    },
    {
        technology: "Azure",
        experienceTotal: 3, 
        experienceCommercial: 3,
        areas: "App services, function apps, storage accounts, Cosmos DB, Azure Active Directory, Redis Cache."
    },
    {
        technology: "IIS",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: "//sidtodo"
    },
    {
        technology: "ASP .NET",
        experienceTotal: 4, 
        experienceCommercial: 3,
        areas: "MVC, MVC Core //sidtodo"
    },
    {
        technology: "C#",
        experienceTotal: 6, 
        experienceCommercial: 5,
        areas: "//sidtodo"
    },
    {
        technology: "Authentication / authorisation",
        experienceTotal: 3, 
        experienceCommercial: 2,
        areas: "Identity Server 4, //sidtodo"
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
    return lhs.experienceTotal-rhs.experienceTotal;
};