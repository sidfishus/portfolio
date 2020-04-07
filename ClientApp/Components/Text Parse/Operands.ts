
import { TextParseFunction } from "./CustomFunctions";
import { TextParseVariable } from "./StatementTypes";

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
    arbitraryValue?: string;
    arbitraryValueUpdate?: string; // Temporary arbitrary value
    showArbitraryValueDialog?: boolean;
};

export const ParseOperandIsValid = (oper: IParseOperand) => {
    return oper && (
        oper.type!=eParseOperandType.arbitraryValue ||
        (oper.type===eParseOperandType.arbitraryValue && oper.arbitraryValue!==undefined)
    );
};

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
                return `Operand.Variable("${variable.Name()}")`;
            }

        case eParseOperandType.function:
            {
                const func=functions.find(iterFunc => oper.MatchesFunction(iterFunc));
                return `Operand.CallFunction<int>("${func.Name()}")`;
            }
    }
};

// At the moment of writing, a shallow copy is sufficient
export const CopyParseOperand = (src: IParseOperand): IParseOperand => {
    if(!src) return null;
    return {...src};
};