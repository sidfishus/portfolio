
import { TextParseStatement, StorePosAsVariableStatement, StatementTypeInfo, SetVariableStatement } from "./StatementTypes";
import { FilterRecursive } from "../../Library/ContainerMethods";

// If objects are added here, need to update CopyTextParseVariable.
export interface TextParseVariable {
    name: string;
};

export const CreateTextParseVariable = (name: string) => {
    return {
        name: name
    }
};

export const CopyTextParseVariable = (variable: TextParseVariable) => {
    if(!variable) return null;
    return {
        ...variable
    };
};

export const VariablesMatch = (
    lhs: TextParseVariable,
    rhs: TextParseVariable
): boolean => {

    return lhs.name.toLowerCase() === rhs.name.toLowerCase();

};

export const ffGetVariables = (statementList: TextParseStatement[]): () => TextParseVariable[] => {

    let variables: TextParseVariable[]=null;

    return (): TextParseVariable[] => {

        if(!variables)
            variables=GetVariables(statementList);

        return variables;
    };
};

const GetVariables_FilterMethod = (
    filteredItems: TextParseStatement[],
    iterStmt: TextParseStatement,
    i: number
) => {

    // We only care about update variable type statements
    if(StatementTypeInfo[iterStmt.type].isUpdateVariable) {
        if(iterStmt.CanSave(null)) {
            // Only get distinct names
            const stmtAsUpdateVariable = iterStmt as SetVariableStatement;
            const duplicate=filteredItems.find(duplciateIterStmt =>
                VariablesMatch(stmtAsUpdateVariable.variable, (duplciateIterStmt as SetVariableStatement).variable));
            return (duplicate===undefined);
        }
    }

    return false;
};

const GetVariables = (
    statementList: TextParseStatement[]
): TextParseVariable[] => {

    const distinctVariableList=
        FilterRecursive(statementList,
            GetVariables_FilterMethod,
            iterItem => iterItem.Children()
        ).map(
            iterStmt => CopyTextParseVariable((iterStmt as StorePosAsVariableStatement).variable)
        );

    return distinctVariableList;
};