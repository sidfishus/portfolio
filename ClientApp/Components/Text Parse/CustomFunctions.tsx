
import { TextParseVariable } from "./Variables";
import { IParseOperand, CopyParseOperand, ParseOperandMultipleCode } from "./Operands";

export enum eCustomFunctionOperator {
    add=1,
    subtract=2,
    multiply=3,
    divide=4
};

const OperatorCode = (op: eCustomFunctionOperator): string => {
    switch(op) {
        case eCustomFunctionOperator.add: return "+";
        case eCustomFunctionOperator.subtract: return "-";
        case eCustomFunctionOperator.multiply: return "*";
        case eCustomFunctionOperator.divide: return "/";
    }
};

// Create the equivalent C# code from a custom function
export const TextParseFunctionCode = (
    func: TextParseFunction,
    functions: TextParseFunction[],
    fGetVariables: () => TextParseVariable[]): string => {

    const operatorCode=OperatorCode(func.Operator());

    const leftOperandCode=ParseOperandMultipleCode(func.LeftHandOperand(),fGetVariables,functions, "pos", "str", "rs");
    const rightOperandCode=ParseOperandMultipleCode(func.RightHandOperand(),fGetVariables,functions, "pos", "str", "rs");

    return `(int pos, string str, RunState rs) => ${leftOperandCode} ${operatorCode} ${rightOperandCode}`;
};

// A custom / user defined text parse function
export interface TextParseFunction {
    ID: number,

    Name: () => string;
    SetName: (name: string) => void;

    Description: () => string;
    SetDescription: (descr: string) => void;

    LeftHandOperand: () => IParseOperand;
    SetLeftHandOperand: (oper: IParseOperand) => void;

    RightHandOperand: () => IParseOperand;
    SetRightHandOperand: (oper: IParseOperand) => void;

    Operator: () => eCustomFunctionOperator;
    SetOperator: (operator: eCustomFunctionOperator) => void;

    IsValid: (funcList: TextParseFunction[], funcIdx: number) => boolean;

    Matches: (rhs: TextParseFunction) => boolean;
};

export const CreateTextParseFunctionCreator = (): (ctrName: string) => TextParseFunction => {

    let _nextID=1;

    return (ctrName: string): TextParseFunction => {
        return _CreateTextParsefunction(_nextID++, ctrName,"",
            null,null,eCustomFunctionOperator.add);
    }
};

const IsValidTextParseFunction = (
    func: TextParseFunction,
    funcList: TextParseFunction[],
    funcIdx: number): boolean => {

    let rv=((
        func.Name()!==null && func.Name()!=="" &&
        func.LeftHandOperand() !==null && func.LeftHandOperand().type!==undefined &&
        func.RightHandOperand() !==null && func.RightHandOperand().type!==undefined &&
        func.Operator() !== null
    )?true:false);

    if(rv && funcList) {
        // Check for duplicate
        const thisNameLower=func.Name().toLowerCase();
        if(funcList.find((iterFunc, i) => i!==funcIdx && iterFunc.Name().toLowerCase() === thisNameLower)) {
            rv=false;
        }
    }

    return rv;
};

const _CreateTextParsefunction = (
    ID: number,
    ctrName: string,
    ctrDescr: string,
    leftHandOper: IParseOperand,
    rightHandOper: IParseOperand,
    operator: eCustomFunctionOperator): TextParseFunction => {

    const _ID=ID;

    let _name: string=ctrName;
    let _descr: string=ctrDescr;
    let _leftHandOperand: IParseOperand=leftHandOper;
    let _rightHandOperand: IParseOperand=rightHandOper;
    let _operator: eCustomFunctionOperator=operator;

    const rv: TextParseFunction = {
        ID: _ID,

        Name: () => _name,
        SetName: (name: string) => {
            _name=name;
        },

        Description: () => _descr,
        SetDescription: (descr: string) => {
            _descr=descr;
        },

        LeftHandOperand: () => _leftHandOperand,
        SetLeftHandOperand: (oper: IParseOperand) => {
            _leftHandOperand=oper;
        },

        RightHandOperand: () => _rightHandOperand,
        SetRightHandOperand: (oper: IParseOperand) => {
            _rightHandOperand=oper;
        },

        Operator: () => _operator,
        SetOperator: (operator: eCustomFunctionOperator) => {
            _operator=operator;
        },

        IsValid: null,

        Matches: (rhs: TextParseFunction) => (rhs.ID === _ID)
    };

    rv.IsValid=(funcList: TextParseFunction[], funcIdx: number) => IsValidTextParseFunction(rv,funcList,funcIdx);

    return rv;
};

export const CopyTextParsefunction = (src: TextParseFunction) => {

    const copy=_CreateTextParsefunction(
        src.ID,
        src.Name(),
        src.Description(),
        CopyParseOperand(src.LeftHandOperand()),
        CopyParseOperand(src.RightHandOperand()),
        src.Operator()
    );

    return copy;
};