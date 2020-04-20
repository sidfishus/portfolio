
import { TextParseFunction } from "./CustomFunctions";
import { TextParseVariable, VariablesMatch } from "./Variables";

export enum eParseOperandType {
    length= 1,
    currentPosition=2,
    arbitraryValue=3,
    variable=4,
    function=5,
};

// Be mindful: if adding objects to this type in the future, ensure it is copied correctly in the copy function below.
export interface IParseOperand {
    type: eParseOperandType;
    MatchesVariable?: (variable: TextParseVariable) => boolean;
    MatchesFunction?: (func: TextParseFunction) => boolean;
    arbitraryValue?: number;
    arbitraryValueUpdate?: string; // Temporary arbitrary value
    showArbitraryValueDialog?: boolean;
};

export const ParseOperandIsValid = (oper: IParseOperand) => {
    return oper && (
        oper.type!=eParseOperandType.arbitraryValue ||
        (oper.type===eParseOperandType.arbitraryValue && oper.arbitraryValue!==undefined)
    );
};

// For a single operand
export const ParseOperandCode = (
    oper: IParseOperand,
    fGetVariables: () => TextParseVariable[],
    functions: TextParseFunction[]
) => {

    switch(oper.type) {
        case eParseOperandType.length:
            return "Operand.InputStringLength()";

        case eParseOperandType.currentPosition:
            return "Operand.CurrentPosition()";

        case eParseOperandType.arbitraryValue:
            return `Operand.StaticValue<int>(${oper.arbitraryValue})`;

        case eParseOperandType.variable:
            {
                const variableList=fGetVariables();
                const variable=variableList.find(iterVar => oper.MatchesVariable(iterVar));
                return `Operand.Variable<int>("${variable.name}")`;
            }

        case eParseOperandType.function:
            {
                const func=functions.find(iterFunc => oper.MatchesFunction(iterFunc));
                return `Operand.CallFunction<int>("${func.Name()}")`;
            }
    }
};

// For creating a function/comparison consisting of multiple comparisons
export const ParseOperandMultipleCode = (
    operand: IParseOperand,
    fGetVariables: () => TextParseVariable[],
    functions: TextParseFunction[],
    posVarName: string,
    strVarName: string,
    runStateVarName: string): string => {

    switch(operand.type) {
        case eParseOperandType.length:
            return `${strVarName}.Length`;

        case eParseOperandType.currentPosition:
            return posVarName;

        case eParseOperandType.arbitraryValue:
            return operand.arbitraryValue.toString();

        case eParseOperandType.variable:
            {
                const variableList=fGetVariables();
                const variable=variableList.find(iterVar => operand.MatchesVariable(iterVar));
                return `(int)${runStateVarName}.GetVariable("${variable.name}")`;
            }

        case eParseOperandType.function:
            {
                const func=functions.find(iterFunc => operand.MatchesFunction(iterFunc));
                return `${runStateVarName}.CallFunction<int>("${func.Name()}", ${posVarName}, ${strVarName})`;
            }
    }
};

// At the moment of writing, a shallow copy is sufficient
export const CopyParseOperand = (src: IParseOperand): IParseOperand => {
    if(!src) return null;
    return {...src};
};

export const CreateLengthOperand = (): IParseOperand => {
    return {
        type: eParseOperandType.length,
    };
};

export const CreateCurrentPositionOperand = (): IParseOperand => {
    return {
        type: eParseOperandType.currentPosition,
    };
};

export const CreateFunctionOperand = (func: TextParseFunction): IParseOperand => {
    return {
        type: eParseOperandType.function,
        MatchesFunction: func.Matches
    };
};

export const CreateVariableOperand = (variable: TextParseVariable): IParseOperand => {
    return {
        type: eParseOperandType.variable,
        MatchesVariable: (rhs: TextParseVariable) => VariablesMatch(variable, rhs)
    };
};

export const CreateArbitraryValueOperand = (value: number): IParseOperand => {
    return {
        type: eParseOperandType.arbitraryValue,
        arbitraryValue: value
    };
};