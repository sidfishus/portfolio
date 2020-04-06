
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
}

// At the moment of writing, a shallow copy is sufficient
export const CopyParseOperand = (src: IParseOperand): IParseOperand => {
    if(!src) return null;
    return {...src};
};