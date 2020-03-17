import { TextParseVariable } from "./StatementTypes";

export enum eCustomFunctionOperandType {
    length= 1,
    currentPosition=2,
    arbitraryValue=3,
    variable=4,
    function=5,
};

export enum eCustomFunctionOperator {
    add=1,
    subtract=2,
    multiply=3,
    divide=4
};

// Be mindful: if adding objects to this type in the future, ensure it is copied correctly in the copy function below.
export interface ICustomFunctionOperand {
    type: eCustomFunctionOperandType;
    MatchesVariable?: (variable: TextParseVariable) => boolean;
    MatchesFunction?: (func: TextParseFunction) => boolean;
    arbitraryValue?: string;
    showArbitraryValueDialog?: boolean;
};

// At the moment of writing, a shallow copy is sufficient
export const CopyCustomFunctionOperand = (src: ICustomFunctionOperand): ICustomFunctionOperand => {
    if(!src) return null;
    return {...src};
};

export interface TextParseFunction {
    ID: number,

    Name: () => string;
    SetName: (name: string) => void;

    Description: () => string;
    SetDescription: (descr: string) => void;

    LeftHandOperand: () => ICustomFunctionOperand;
    SetLeftHandOperand: (oper: ICustomFunctionOperand) => void;

    RightHandOperand: () => ICustomFunctionOperand;
    SetRightHandOperand: (oper: ICustomFunctionOperand) => void;

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
    leftHandOper: ICustomFunctionOperand,
    rightHandOper: ICustomFunctionOperand,
    operator: eCustomFunctionOperator): TextParseFunction => {

    const _ID=ID;

    let _name: string=ctrName;
    let _descr: string=ctrDescr;
    let _leftHandOperand: ICustomFunctionOperand=leftHandOper;
    let _rightHandOperand: ICustomFunctionOperand=rightHandOper;
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
        SetLeftHandOperand: (oper: ICustomFunctionOperand) => {
            _leftHandOperand=oper;
        },

        RightHandOperand: () => _rightHandOperand,
        SetRightHandOperand: (oper: ICustomFunctionOperand) => {
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
        CopyCustomFunctionOperand(src.LeftHandOperand()),
        CopyCustomFunctionOperand(src.RightHandOperand()),
        src.Operator()
    );

    return copy;
};