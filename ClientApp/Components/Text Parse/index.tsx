
import React, {useState, useRef, Fragment} from "react";
import { Dropdown, Label, Form, Segment, Container, Input, InputProps, Checkbox, Modal, Button, Icon, Table, Loader, List, Message, Header, ButtonProps, DropdownItemProps, TableRowProps } from "semantic-ui-react";
import { eStatementType, TextParseStatement, StringComparisonStatement, SkipWSStatement, ITextParseStatementState, OrComparisonStatement, StatementListComparisonStatement, StatementTypeInfo, AdvanceToEndStatement, EndOfStringComparisonStatement, StartOfStringComparisonStatement, CaptureComparisonStatement, IsWhitespaceComparisonStatement, StringOffsetComparisonStatement, StorePosAsVariableStatement, SetVariableStatement, AdvanceUntilComparisonStatement, AdvanceStatement, CustomComparisonStatement, eCustomComparisonOperator, ComparisonStatement } from "./StatementTypes";
import { IRoutedCompProps } from "../../routes";
import { SimpleDelayer } from "../../Library/UIHelper";
import { Extract, Match, Replace, ExecuteBuiltInExample } from "./ExecuteParse";
import { TextParseFunction, CopyTextParsefunction, eCustomFunctionOperator, CreateTextParseFunctionCreator } from "./CustomFunctions";
import { CopyParseOperand, IParseOperand, eParseOperandType, CreateLengthOperand, CreateCurrentPositionOperand, CreateFunctionOperand, CreateVariableOperand, CreateArbitraryValueOperand } from "./Operands";
import { IsA32BitSignedNumber } from "../../Library/Misc";
import useConstant from "use-constant";
import { ParseExamplesDropdown, eParseExample, eParseBuiltInExample} from "./Examples";
import { ffGetVariables, TextParseVariable, VariablesMatch } from "./Variables";
import { HEADING_COLOUR } from "../../theme";
import { eScreenResolution } from "../Client App";
import { MatchMediaResult } from "../../Library/MediaMatching";

export interface ITextParseProps {
};

interface ISelectedStatement {
    UID: number;
    type: eStatementType;
};

interface IStatementListCtrlProps {
    statements: Array<TextParseStatement>;
    SetStatements: (statements: Array<TextParseStatement>) => void;
    selStatement?: ISelectedStatement;
    SetSelStatement: (statement: TextParseStatement) => void;
    ChangeStatementOrder: (selStmt: ISelectedStatement,orderDiff: number) => void;
    RemoveStatement: (selStmt: ISelectedStatement) => void;
    modalState: IModalState|null;
    SetModalState: (state: IModalState|null) => void;
    isMobile: boolean;
    mediaMatching: MatchMediaResult;
};

interface IAddInsertParseStatementCtrlProps {
    statements: Array<TextParseStatement>;
    SetStatements: (
        statements: Array<TextParseStatement>,
        selStmt?: TextParseStatement
    ) => void;
    selectedStatementType: eStatementType;
    nameIndexes: Array<number | undefined>;
    selStmtIndex?: number;
    insert: boolean;
    comparisonOnly: boolean;
};

interface ITypeDropdownProps {
    selectedStatementType: eStatementType;
    SetSelectedStatementType: (type?: eStatementType) => void;
    comparisonOnly: boolean;
};

interface ITypeExplanationProps {
    selectedStatementType: eStatementType;
};

interface IParseStatementInputCtrlProps extends ITextParseStatementState {
    placeholder: string;
    title: string;
    GetValue: (statement: TextParseStatement) => string;
    SetValue: (statement: TextParseStatement, value: string) => void;
    Validate?: (statement: TextParseStatement) => boolean;
    updater: SimpleDelayer;
    name: string;
};

interface IOrComparisonInputCtrlProps {
    nameIndexes: Array<number | undefined>;
    subSelectedStatementType: eStatementType;
    SetSubSelectedStatementType: (type?: eStatementType) => void;
    SetSelStatement: (statement: TextParseStatement) => void;
};

interface IStatementListComparisonInputCtrlProps {
    nameIndexes: Array<number | undefined>;
    subSelectedStatementType: eStatementType;
    SetSubSelectedStatementType: (type?: eStatementType) => void;
    SetSelStatement: (statement: TextParseStatement) => void;
};

interface ICaptureComparisonInputCtrlProps {
    nameIndexes: Array<number | undefined>;
    subSelectedStatementType: eStatementType;
    SetSubSelectedStatementType: (type?: eStatementType) => void;
    SetSelStatement: (statement: TextParseStatement) => void;
};

interface IModalCtrlProps {
    title: string;
    message: string;
    trigger: React.ReactNode;
    onNo?: () => void;
    onYes?: () => void;
    onCancel?: () => void;
    show: boolean;
};

interface IStringOffsetComparisonCtrlProps extends ITextParseStatementState {
    fGetVariables: () => TextParseVariable[];
    functions: Array<TextParseFunction>;
    updatePending: boolean;
};

enum eModalType {
    mtClearAllStatements=1,
    mtClearSingleStatement=2,
    mtDeleteCustomFunction=3,
};

interface IModalState {
    type: eModalType;
    selStmt?: ISelectedStatement;
    funcIdx?: number;
};

export enum eParseOutputType {
    potMatch=1,
    potExtractSingle=2,
    potExtractAll=3,
    potReplace=4
};

interface IParseInputTextCtrlProps {
    text: string;
    SetText: (text: string) => void;
    onBlur: () => void;
    parseInputTextRef: any; // I'm not sure what the type is..
};

interface IParseOutputTypeCtrlProps {
    type: eParseOutputType,
    SetType: (type: eParseOutputType) => void
};

interface IExecuteParseButtonCtrlProps {
    statements: Array<TextParseStatement>;
    type: eParseOutputType;
    input: string;
    disabled: boolean; // True when a parse is in progress
    SetParseInProgress: (inProgress: boolean) => void;
    SetExtractResults: (result: IParseExtractResult) => void;
    SetCompileErrors: (errs: string[]) => void;
    SetGeneralError: (error: string) => void;
    SetMatchResult: (res: number) => void;
    replaceFormat: string;
    SetReplaceResult: (result: IParseReplaceResult) => void;
    updatePending: boolean;
    functions: Array<TextParseFunction>;
    firstFailingStatement: TextParseStatement;
    firstFailingFunction: TextParseFunction;
    parseInputError: string;
    fGetVariables: () => TextParseVariable[];
    builtInExample: eParseBuiltInExample;
};

interface IParseOutputGeneralErrorCtrlProps {
    msg: string;
};

interface ICompileErrorsCtrlProps {
    compileErrors: string[];
}

interface IParseExtractResult {
    success: boolean;
    extracted: string[];
};

interface IParseReplaceResult {
    numMatching: number;
    replacedText: string;
}

interface IExtractResultsCtrlProps {
    extractResults: IParseExtractResult;
};

interface IMatchResultCtrlProps {
    matchResult: number;
};

interface IReplaceFormatCtrlProps {
    replaceFormat: string;
    SetReplaceFormat: (fmt: string) => void;
    updater: SimpleDelayer;
};

interface IReplaceResultCtrlProps {
    replaceResult: IParseReplaceResult;
    builtInExample: eParseBuiltInExample;
};

interface ICustomFunctionsProps {
    functions: Array<TextParseFunction>;
    SetFunctions: (functions: TextParseFunction[]) => void;
    SetModalState: (state: IModalState) => void;
    modalState: IModalState;
    selFunctionIdx: number;
    SetSelFunctionIdx: (idx: number) => void;
    SetCustomFunction: (func: TextParseFunction) => void;
    updater: SimpleDelayer;
    fGetVariables: () => TextParseVariable[];
    updatePending: boolean;
    firstFailingFunction: TextParseFunction;
    CreateTextParsefunction: (ctrName: string) => TextParseFunction;
    builtInExample: eParseBuiltInExample;
    mediaMatching: MatchMediaResult;
};

interface ICustomFunctionCtrlProps {
    placeholder: string;
    title: string;
    value: string;
    SetValue: (func: TextParseFunction, value: string) => void;
    Validate?: () => boolean;
    updater: SimpleDelayer;
    ctrlName: string;
    customFunction: TextParseFunction;
    SetCustomFunction: (func: TextParseFunction) => void;
    funcIdx: number;
};

interface ICustomFunctionOperandDropdownProps {
    fGetVariables: () => TextParseVariable[];
    functions: TextParseFunction[];
    selFunctionIdx: number; // The index of the function currently being displayed
    data: IParseOperand;
    customFunction: TextParseFunction;
    SetCustomFunction: (func: TextParseFunction) => void;
    SetOperand: (func: TextParseFunction, operand: IParseOperand) => void;
    // Used for defining a unique key for the react ctrl
    name: string;
    updater: SimpleDelayer;
    updatePending: boolean;
    title: string;
};

interface IParseOperandDropdownProps {
    fGetVariables: () => TextParseVariable[];
    functions: TextParseFunction[];
    data: IParseOperand;
    SetOperand: (operand: IParseOperand) => void;
    // Used for defining a unique key for the react ctrl
    name: string;
    updater: SimpleDelayer;
    updatePending: boolean;
    includeLength?: boolean;
    includeCurrentPosition?: boolean;
    placeholder: string;
    title: string;
};

interface ICustomFunctionsOperatorDropdownProps {
    SetCustomFunction: (func: TextParseFunction) => void;
    function: TextParseFunction;
};

interface IInputModalProps {
    open: boolean;
    headerIcon: string;
    headerText: string;
    valid?: boolean;
    value: string;
    onChange: (value: string) => void;
    okAvailable?: boolean;
    onOk: () => void;
    onCancel: () => void;
};

interface IAdvanceInputProps extends ITextParseStatementState {
    fGetVariables: () => TextParseVariable[];
    functions: Array<TextParseFunction>;
    updatePending: boolean;
    updater: SimpleDelayer;
};

interface IAdvanceUntilInputCtrlProps extends ITextParseStatementState {
    nameIndexes: Array<number | undefined>;
    subSelectedStatementType: eStatementType;
    SetSubSelectedStatementType: (type?: eStatementType) => void;
    SetSelStatement: (statement: TextParseStatement) => void;
};

interface ICustomComparisonInputCtrlProps extends ITextParseStatementState {
    fGetVariables: () => TextParseVariable[];
    functions: Array<TextParseFunction>;
    updater: SimpleDelayer;
    updatePending: boolean;
};

interface ICustomComparisonOperatorProps extends ITextParseStatementState {
};

interface ISetVariableInputCtrlProps extends ITextParseStatementState {
    updater: SimpleDelayer;
    fGetVariables: () => TextParseVariable[];
    functions: Array<TextParseFunction>;
    updatePending: boolean,
};

// ~interface

// Select a row in the statement list control
const fSelectStatement: (
    SetSelStatement: (selStmt: ISelectedStatement) => void,
    subSelectedStatementType: number,
    SetSubSelectedStatementType: (newType: eStatementType) => void
) =>
    (newSelStatement: TextParseStatement) => void = (SetSelStatement, subSelectedStatementType, SetSubSelectedStatementType) => {

    return newSelStatement => {

        if(newSelStatement === null) {
            SetSelStatement(null);
        } else {

            // This will trigger the first time an item is clicked but not subsequent click events until
            // the component is re-rendered
            SetSelStatement(CreateSelStatement(newSelStatement));

            // If the selected statement allows comparison only children, and the selected sub comparison type is not
            // a comparison type statement, select the first comparison type parse statement in the sub comparison type
            // selection control
            const subStatementTypeInfo = StatementTypeInfo[subSelectedStatementType];
            if(!subStatementTypeInfo.isComparison) {
                const selectedStatementTypeInfo = StatementTypeInfo[newSelStatement.type];
                if(selectedStatementTypeInfo.comparisonOnlyChildren) {
                    SetSubSelectedStatementType(eStatementType.String_Comp);
                }
            }
        }
    };
};

const MoveStatementGeneric =
    (statements: Array<TextParseStatement>,
    SetStatements: (statements: Array<TextParseStatement>) => void,
    selStmt: ISelectedStatement,
    fMove: (statements: Array<TextParseStatement>, selectedIdx: number, parentStmt: TextParseStatement|null) => Array<TextParseStatement>,
    parentStmt: TextParseStatement|null
): void => {

    // Find the index of the item that changed
    let changedIdx: number=null;
    let isChangedAtThisLevel=false;

    for(let i=0;i<statements.length;++i) {

        const iterStmt=statements[i];

        // Is this statement or any of it's children the selected one?
        const selected=GetSelectedStatementNested(selStmt,iterStmt);
        if(selected) {
            changedIdx=i;

            isChangedAtThisLevel=CompareSelectedStatement(selStmt,iterStmt);
            break;
        }
    }

    if(isChangedAtThisLevel) {

        SetStatements(fMove(statements,changedIdx,parentStmt));
    } else {

        // Copy each item within the array except for the item that's changed
        SetStatements(statements.map((iterStmt,idx) => {

            if(idx === changedIdx) {
                const copy=iterStmt.Copy(false);
                MoveStatementGeneric(iterStmt.Children(),newStatements => copy.SetChildren(newStatements),selStmt,fMove,copy);
                return copy;

            } else {
                return iterStmt.Copy(true);
            }
        }));
    }
};

const ChangeStatementOrder = (
    statements: Array<TextParseStatement>,
    selectedIdx: number,
    orderDiff: number
): Array<TextParseStatement> => {

    let changeRangeBegin: number;
    let changeRangeEnd: number;

    const newPos=selectedIdx+orderDiff;

    let shift: number;
    if(orderDiff>0) {
        changeRangeBegin=selectedIdx;
        changeRangeEnd = selectedIdx + orderDiff;
        shift=-1;

    } else {
        changeRangeBegin=selectedIdx + orderDiff;
        changeRangeEnd = selectedIdx;
        shift=1;
    }

    const rv=new Array<TextParseStatement>(statements.length);
    statements.forEach((iterStmt,idx) => {

        const copy=iterStmt.Copy(true);
        let updatedIdx;

        if(idx === selectedIdx) {
            // The change
            updatedIdx=newPos;

        } else if(idx>=changeRangeBegin && idx<=changeRangeEnd) {
            // Shift up/down by one
            updatedIdx =idx+shift;
            
        } else {
            // No change
            updatedIdx=idx;
        }

        rv[updatedIdx]=copy;
    });

    return rv;
};

// Remove a text parse statement
const RemoveStatement = (
    statements: Array<TextParseStatement>,
    idxToRemove: number,
    parentStmt: TextParseStatement|null,
    selStatement: ISelectedStatement,
    SetSelStatement: (stmt: TextParseStatement) => void,
): Array<TextParseStatement> => {

    // Copy all elements except for the specific index
    const rv=new Array<TextParseStatement>(statements.length-1);
    {
        let updIdx=0;
        statements.forEach((iterStmt,idx) => {
            if(idx !== idxToRemove) {
                rv[updIdx]=iterStmt.Copy(true);
                ++updIdx;
            }
        });
    }

    // If the statement being removed is the selected one
    if(CompareSelectedStatement(selStatement,statements[idxToRemove])) {

        let newSelected=null;
        if(parentStmt) {
            // Select the parent if there is one
            newSelected=parentStmt;

        } else if(rv.length>0) {
            // Select one of the siblings

            if(idxToRemove === rv.length) {
                newSelected=rv[rv.length-1];

            } else {
                newSelected=rv[idxToRemove];
            }
        }

        // Update the selected statement
        SetSelStatement(newSelected);
    }

    return rv;
};

// Update a single statement within a list of statements and return a copy of everything
const UpdateStatement =
    (stmt: TextParseStatement,
    selStmt: ISelectedStatement,
    statements: Array<TextParseStatement>,
    SetStatements: (statements: Array<TextParseStatement>) => void
): void => {

    const updated=statements.map((iterStmt) => {
        return UpdateStatement_Inner(stmt, iterStmt, selStmt);
    });

    SetStatements(updated);

};

const UpdateCustomFunction = (
    func: TextParseFunction,
    selFunctionIdx: number,
    functions: TextParseFunction[],
    SetFunctions: (functionList: TextParseFunction[]) => void
): void => {

    const updated=functions.map((iterFunc, iterFuncIdx) => {
        if(iterFuncIdx===selFunctionIdx) return func;

        return CopyTextParsefunction(iterFunc);
    });

    SetFunctions(updated);
};

// Given a text parse statement, update the entire state
const UpdateStatement_Inner = (
    updatedStmt: TextParseStatement,
    iterStmt: TextParseStatement,
    selStmt: ISelectedStatement,
): TextParseStatement => {

    // If this statement and none of it's children are selected, simply do a copy
    const selected=GetSelectedStatementNested(selStmt,iterStmt);
    if(!selected) {
        return iterStmt.Copy(true);
    }

    let copy,children;
    if(CompareSelectedStatement(selStmt,iterStmt)) {
        // The iter statement is the selected one.
        copy = updatedStmt;
        children=updatedStmt.Children();
    } else {
        // One of it's children is the selected one. Copy the statement excluding the children
        copy = iterStmt.Copy(false); 
        children=iterStmt.Children();
    }

    if(children) {

        // Update the children manually by updating the one that's changed
        children=children.map((iterChild) => {
            return UpdateStatement_Inner(updatedStmt,iterChild,selStmt);
        });
    }

    copy.SetChildren(children);

    return copy;
};

const CompareSelectedStatement = (
    selStmt: ISelectedStatement,
    stmt: TextParseStatement
): boolean => {

    const rv=((selStmt && stmt.type === selStmt.type && stmt.UID===selStmt.UID)?true:false);

    return rv;
};

const StatementIsAChildOf = (
    parent: TextParseStatement,
    potentialChild: ISelectedStatement
) => {
    const children=parent.Children();
    if(!children) return false;

    const findPred=(iterChild: TextParseStatement): boolean => {
        if(CompareSelectedStatement(potentialChild, iterChild)) return true;

        return StatementIsAChildOf(iterChild, potentialChild);
    };

    return (children.find(findPred) !== undefined);
};

const GetSelectedStatementNested = (
    selStmt: ISelectedStatement,
    stmt: TextParseStatement
): TextParseStatement | null => {

    if(CompareSelectedStatement(selStmt,stmt)) {
        return stmt;
    }

    const children=stmt.Children();
    if(children) {
        const [selected]=GetSelectedStatementFromListNested(selStmt,children);
        if(selected) return selected;
    }

    return null;
};

const GetSelectedStatementFromListNested =
    (selStmt: ISelectedStatement,
    statements: Array<TextParseStatement>
): [TextParseStatement|null,number|null] => {

    if(selStmt===null || statements === null) return [null,null];

    for(let i=0;i<statements.length; ++i) {
        const iterStmt=statements[i];

        const selected=GetSelectedStatementNested(selStmt,iterStmt);
        if(selected) return [selected,i];
    }

    return [null,null];
};

const CreateSelStatement = (
    stmt: TextParseStatement
): ISelectedStatement => {

    return {
        type: stmt.type,
        UID: stmt.UID
    };
};

export const TextParse: React.FunctionComponent<ITextParseProps & IRoutedCompProps> = (props) => {

    //// Hooks always at the top

    // The list of statements
    const [statements, SetStatements] = useState(() => new Array<TextParseStatement>());

    // For inserting new parse statements
    const [newSelectedStatementType, SetNewSelectedStatementType] = useState(eStatementType.String_Comp);
    const [subSelectedStatementType, SetSubSelectedStatementType] = useState(eStatementType.String_Comp);

    // Selected statement
    let selStatement: ISelectedStatement;
    let SetSelStatement: (stmt: TextParseStatement) => void;
    {
        const state=useState<ISelectedStatement>(null);
        selStatement=state[0];
        SetSelStatement=fSelectStatement(state[1],subSelectedStatementType, SetSubSelectedStatementType);
    }

    // Modal
    const [modalState,SetModalState] = useState<IModalState|null>(null);

    //// Parse input text
    const [parseInputText,SetParseInputText] = useState<string>("");
    // Because the input text is not controlled, we need to have a 'ref' to it so we can update it directly in the
    // DOM programatically.
    const parseInputTextRef=useRef(null);

    //// Parse output type checkbox
    const [outputType,SetOutputType] = useState<eParseOutputType>(eParseOutputType.potMatch);

    // Parse in progress?
    const [parseInProgress,SetParseInProgress] = useState<boolean>(false);

    // Extract results
    const [extractResults,SetExtractResults] = useState<IParseExtractResult>(null);

    // Parse output compile errors
    const [compileErrors,SetCompileErrors] = useState<string[]>(null);

    // General error message
    const [generalError,SetGeneralError] = useState<string>(null);

    // Match result - number of matching entries
    const [matchResult,SetMatchResult] = useState<number>(null);

    // When a new item is created, it is created with a default name and an index. This array holds the indexes.
    // As names are created the indexes come from this array, and are incremented accordingly. There is an index
    // per statement type
    const nameIndexes = useConstant(() => new Array<number|undefined>(eStatementType.phCount));

    // Replace format
    const [replaceFormat,SetReplaceFormat] = useState<string>("");

    // Replace format
    const [replaceResult,SetReplaceResult] = useState<IParseReplaceResult>(null);

    // The list of functions
    const [functions, SetFunctions] = useState(() => new Array<TextParseFunction>());

    // Selected function
    const [selFunctionIdx, SetSelFunctionIdx] = useState<number>(null);

    // Is there an update/ value change pending? Used for enabling/disabling OK buttons
    const [updatePending, SetUpdatePending] = useState<boolean>(false);

    // Update the state with a delay so that the UI experience is more seemless. Needs to be used alongside
    // 'defaultValue' (uncontrolled)
    const updater=useConstant(() => new SimpleDelayer(
        200,
        () => SetUpdatePending(true),
        () => SetUpdatePending(false)
    ));

    const CreateTextParsefunction=useConstant(CreateTextParseFunctionCreator);

    const [parseExample, SetParseExample] = useState<eParseExample>(eParseExample.none);

    const [builtInExample, SetBuiltInExample] = useState<eParseBuiltInExample>(null);

    //// Events/mutators

    let typeSpecificJsx=null;

    const [selectedStatement,topLevelSelStmtIndex]=GetSelectedStatementFromListNested(selStatement,statements);

    const _UpdateStatement = (stmt: TextParseStatement) => UpdateStatement(stmt,selStatement,statements,SetStatements);

    const _ChangeStatementOrder = (selStmt: ISelectedStatement,orderDiff: number) =>
        MoveStatementGeneric(statements,
            SetStatements,
            selStmt,
            (statements,selectedIdx) => ChangeStatementOrder(statements,selectedIdx,orderDiff),
            null
        );

    const _RemoveStatement = (selStmt: ISelectedStatement) =>
        MoveStatementGeneric(statements,
            SetStatements,
            selStmt,
            (statements,selectedIdx,parentStmt) => RemoveStatement(statements,selectedIdx,parentStmt,selStatement,SetSelStatement),
            null
        );

    const _UpdateCustomFunction = (func: TextParseFunction) => UpdateCustomFunction(func,selFunctionIdx,functions,SetFunctions);

    const _CreateParseStatement = (stmtType: eStatementType): TextParseStatement => CreateParseStatement(nameIndexes, stmtType);

    const fGetVariables = ffGetVariables(statements);

    const { mediaMatching } = props;
    if(!mediaMatching) return null;

    const firstMatching = mediaMatching.FirstMatching();
    const isMobile=((firstMatching === eScreenResolution.Mobile)?true:false);
    
    //// Render
    
    if(selectedStatement !== null) {

        switch(selectedStatement.type) {

            case eStatementType.String_Comp:
                typeSpecificJsx=
                    <StringComparisonInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        updater={updater}
                    />;
                break;

            case eStatementType.Or_Comp:
                typeSpecificJsx =
                    <OrComparisonInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        nameIndexes={nameIndexes}
                        subSelectedStatementType={subSelectedStatementType}
                        SetSubSelectedStatementType={SetSubSelectedStatementType}
                        SetSelStatement={SetSelStatement}
                    />;
                break;

            case eStatementType.StatementList_Comp:
                typeSpecificJsx =
                    <StatementListComparisonInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        nameIndexes={nameIndexes}
                        subSelectedStatementType={subSelectedStatementType}
                        SetSubSelectedStatementType={SetSubSelectedStatementType}
                        SetSelStatement={SetSelStatement}
                    />;
                break;

            case eStatementType.Capture_Comp:
                typeSpecificJsx =
                    <CaptureComparisonInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        nameIndexes={nameIndexes}
                        subSelectedStatementType={subSelectedStatementType}
                        SetSubSelectedStatementType={SetSubSelectedStatementType}
                        SetSelStatement={SetSelStatement}
                    />;
                break;

            case eStatementType.StringOffset_Comp:
                typeSpecificJsx =
                    <StringOffsetComparisonInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        updater={updater}
                        fGetVariables={fGetVariables}
                        functions={functions}
                        updatePending={updatePending}
                    />;
                break;

            case eStatementType.StorePosAsVariable_Op:
                typeSpecificJsx=
                    <StorePosAsVariableInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        updater={updater}
                    />;
                break;

            case eStatementType.Advance_Op:
                typeSpecificJsx=
                    <AdvanceInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        updater={updater}
                        fGetVariables={fGetVariables}
                        functions={functions}
                        updatePending={updatePending}
                    />;
                break;

            case eStatementType.AdvanceUntil_Comp:
                typeSpecificJsx=
                    <AdvanceUntilInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        nameIndexes={nameIndexes}
                        subSelectedStatementType={subSelectedStatementType}
                        SetSubSelectedStatementType={SetSubSelectedStatementType}
                        SetSelStatement={SetSelStatement}
                />;
                break;

            case eStatementType.CustomComparison:
                typeSpecificJsx=
                    <CustomComparisonInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        fGetVariables={fGetVariables}
                        functions={functions}
                        updater={updater}
                        updatePending={updatePending}
                    />;
                break;

            case eStatementType.SetVariable_Op:
                typeSpecificJsx=
                    <SetVariableInputCtrl
                        {...props}
                        statement={selectedStatement}
                        SetStatement={_UpdateStatement}
                        fGetVariables={fGetVariables}
                        functions={functions}
                        updater={updater}
                        updatePending={updatePending}
                    />;
                break;
        }
    }

    const firstFailingStatement=statements.find(iterStmt => !iterStmt.CanSave(statements));
    const firstFailingFunction=functions.find((iterFunc, funcIdx) => !iterFunc.IsValid(functions, funcIdx));
    const parseInputError=((parseInputText!==null && parseInputText!=="")?null:"Please enter parse input before attempting to parse.");

    const comparisonSpecificJsx = ComparisonSpecificJsx(selectedStatement, _UpdateStatement);

    return (
        <>
            <Container>
                <Form>
                    {isMobile &&
                        <>Please note this is best used on a larger screen.<br/></>
                    }
                    <CustomFunctions
                        {...props}
                        functions={functions}
                        SetFunctions={SetFunctions}
                        modalState={modalState}
                        SetModalState={SetModalState}
                        selFunctionIdx={selFunctionIdx}
                        SetSelFunctionIdx={SetSelFunctionIdx}
                        SetCustomFunction={_UpdateCustomFunction}
                        updater={updater}
                        fGetVariables={fGetVariables}
                        updatePending={updatePending}
                        firstFailingFunction={firstFailingFunction}
                        CreateTextParsefunction={CreateTextParsefunction}
                        builtInExample={builtInExample}
                        mediaMatching={mediaMatching}
                    />
                    <Segment padded>
                        <Label color={HEADING_COLOUR} attached="top" icon={((builtInExample === null && !statements.length || firstFailingStatement)?"cancel":"check")} content="Parse Statement List" />
                        {builtInExample===null &&
                            <StatementListCtrl
                                {...props}
                                statements={statements}
                                SetStatements={SetStatements}
                                selStatement={selStatement}
                                SetSelStatement={SetSelStatement}
                                ChangeStatementOrder={_ChangeStatementOrder}
                                RemoveStatement={_RemoveStatement}
                                modalState={modalState}
                                SetModalState={SetModalState}
                                isMobile={isMobile}
                                mediaMatching={mediaMatching}
                            />
                        }

                        {builtInExample===null &&
                            <AddNewParseStatementCtrls
                                {...props}
                                statements={statements}
                                SetStatements={(statements, selStmt) => {
                                    SetSelStatement(selStmt);
                                    SetStatements(statements);
                                }}
                                selectedStatementType={newSelectedStatementType}
                                nameIndexes={nameIndexes}
                                SetSelectedStatementType={SetNewSelectedStatementType}
                                selStmtIndex={topLevelSelStmtIndex}
                                insert={true}
                                comparisonOnly={false}
                            />
                        }

                        {builtInExample !== null &&
                            <Form.Field>
                                <i>Cannot display.</i>
                            </Form.Field>
                        }

                        {selStatement !== null &&
                            <Segment padded>
                                <Label attached="top">Update Parse Statement</Label>
                                <Form.Field>

                                    <UpdateInputCtrl
                                        {...props}
                                        statement={selectedStatement}
                                        SetStatement={_UpdateStatement}
                                        GetValue={TextParseStatement.GetName}
                                        SetValue={TextParseStatement.SetName}
                                        placeholder="Name..."
                                        title="Enter a short name to uniquely identify this statement."
                                        updater={updater}
                                        name="name"
                                        Validate={stmt => stmt.CanSaveName(statements)}
                                    />
                                </Form.Field>

                                <Form.Field>

                                    <UpdateInputCtrl
                                        {...props}
                                        statement={selectedStatement}
                                        SetStatement={_UpdateStatement}
                                        GetValue={TextParseStatement.GetKeyedDescription}
                                        SetValue={TextParseStatement.SetKeyedDescription}
                                        placeholder="Description... (optional)"
                                        title="Describe the purpose of this statement."
                                        updater={updater}
                                        name="descr"
                                    />

                                </Form.Field>

                                {comparisonSpecificJsx &&
                                    <Form.Field>
                                        {comparisonSpecificJsx}
                                    </Form.Field>
                                }

                                {typeSpecificJsx &&
                                    <Form.Field>
                                        {typeSpecificJsx}
                                    </Form.Field>
                                }
                                
                            </Segment>
                        }
                    </Segment>

                    <Segment padded>
                        <Label color={HEADING_COLOUR} attached="top" content="Parse Input" icon={((parseInputError!== null)?"remove":"check")}/>
                        <ParseInputText
                            {...props}
                            text={parseInputText}
                            SetText={text => updater.DelayedCall(() => SetParseInputText(text))}
                            onBlur={updater.ImmediateCall}
                            parseInputTextRef={parseInputTextRef}
                        />
                    </Segment>

                    <Segment padded>
                        <Label color={HEADING_COLOUR} attached="top">Parse Output</Label>
                        {builtInExample===null &&
                            <>
                                <ParseOutputType
                                    {...props}
                                    type={outputType}
                                    SetType={SetOutputType}
                                />

                                {outputType!=eParseOutputType.potMatch &&
                                    <ParseOutputReplaceFormat
                                        {...props}
                                        replaceFormat={replaceFormat}
                                        SetReplaceFormat={SetReplaceFormat}
                                        updater={updater}
                                    />
                                }
                            </>
                        }

                        {generalError &&
                            <ParseOutputGeneralError
                                {...props}
                                msg={generalError}
                            />
                        }

                        {compileErrors &&
                            <CompileErrors
                                {...props}
                                compileErrors={compileErrors}
                            />
                        }

                        {extractResults &&
                            <ExtractResults
                                {...props}
                                extractResults={extractResults}
                            />
                        }

                        {matchResult!==null &&
                            <MatchResult
                                {...props}
                                matchResult={matchResult}
                            />
                        }

                        {replaceResult!=null &&
                            <ReplaceResult
                                {...props}
                                replaceResult={replaceResult}
                                builtInExample={builtInExample}
                            />
                        }

                        <Form.Field>
                            <ExecuteParseButton
                                {...props}
                                statements={statements}
                                type={outputType}
                                input={parseInputText}
                                SetParseInProgress={SetParseInProgress}
                                SetExtractResults={SetExtractResults}
                                disabled={parseInProgress}
                                SetCompileErrors={SetCompileErrors}
                                SetGeneralError={SetGeneralError}
                                SetMatchResult={SetMatchResult}
                                replaceFormat={replaceFormat}
                                SetReplaceResult={SetReplaceResult}
                                updatePending={updatePending}
                                functions={functions}
                                firstFailingStatement={firstFailingStatement}
                                firstFailingFunction={firstFailingFunction}
                                parseInputError={parseInputError}
                                fGetVariables={fGetVariables}
                                builtInExample={builtInExample}
                            />

                            {parseInProgress &&
                                <Loader active inline />
                            }
                        
                        </Form.Field>

                        <ParseExamplesDropdown
                            {...props}
                            parseExample={parseExample}
                            SetParseExample={SetParseExample}
                            SetStatements={SetStatements}
                            SetSelStatement={SetSelStatement}
                            SetFunctions={SetFunctions}
                            SetSelFunctionIdx={SetSelFunctionIdx}
                            CreateTextParsefunction={CreateTextParsefunction}
                            CreateParseStatement={_CreateParseStatement}
                            SetParseInputText={(text: string) => {
                                SetParseInputText(text);
                                // Without this the text on the screen will not update
                                if(parseInputTextRef.current) parseInputTextRef.current.value=text;
                            }}
                            SetParseOuputType={SetOutputType}
                            SetBuiltInExample={SetBuiltInExample}
                            SetReplaceFormat={SetReplaceFormat}
                        />
                    </Segment>
                </Form>
            </Container>
        </>
    );
};

const ReplaceResult: React.SFC<ITextParseProps & IReplaceResultCtrlProps> = (props) => {

    const { replaceResult, builtInExample } = props;

    if(replaceResult.numMatching>0) {
        return (
            <Message positive>
                <Message.Header>{`${replaceResult.numMatching} matching entrie(s) were replaced`}</Message.Header>
                <Message.Content>
                    <>
                        {builtInExample === null &&
                            <>
                                The code has been output to the console for further investigation if necessary:
                                <br />
                            </>
                        }
                        <br />
                        <textarea
                            value={replaceResult.replacedText}
                            disabled
                        />
                    </>
                </Message.Content>
            </Message>
        );
    }

    return (
        <Message negative>
            <Message.Header>No text was replaced</Message.Header>
            {builtInExample === null && <Message.Content>
                The full text parse statement code has been output to the console if further investigation is required.
            </Message.Content>}
        </Message>
    );
};

const ParseOutputReplaceFormat: React.SFC<ITextParseProps & IReplaceFormatCtrlProps> = (props) => {

    const { SetReplaceFormat, replaceFormat, updater } = props;

    return (
        <>
            <Form.Field>

                <textarea
                    placeholder="Replace format e.g. 'capture1Name' static text 'capture2Name'"
                    defaultValue={replaceFormat}
                    onChange={e => {
                        const value=e.target.value;

                        updater.DelayedCall(() => {
                            SetReplaceFormat(value);
                        });
                    }}
                    onBlur={updater.ImmediateCall}
                    title={"Replace matching entries according to this format. "+
                        "Use 'capture statement name' to reference captured text."
                    }
                />
            </Form.Field>
        </>
    );
};

const MatchResult: React.SFC<ITextParseProps & IMatchResultCtrlProps> = (props) => {

    const { matchResult } = props;

    let msgProps;
    if(matchResult>0) {
        msgProps = { positive: true};

    } else {
        msgProps = {negative: true};
    }

    let content;
    if(matchResult>0) {
        content=(
            <>
                {"The input text matches the parse statement list "}<b>{matchResult}</b>{" time(s)"}
            </>
        );

    } else {
        content =(
            <>{"The input text does not match the parse statement list"}</>
        );
    }

    return (
        <Message {...msgProps}>
            <Message.Header>{`${((matchResult>0)?"Match":"No match")}`}</Message.Header>
            <Message.Content>
                {content}
            </Message.Content>
        </Message>
    );
};

const ExtractResults: React.SFC<ITextParseProps & IExtractResultsCtrlProps> = (props) => {

    const { extractResults } = props;

    if(extractResults.success) {
        return (
            <>
                <Message positive>
                    <Message.Header>{`The extract yielded ${extractResults.extracted.length} result(s)`}</Message.Header>
                    <Message.Content>
                        The code has been output to the console for further investigation if necessary:
                    </Message.Content>
                    <Message.List>
                        {extractResults.extracted.map((iterRes,idx) => {
                            return (
                                <List.Item key={idx}>
                                    {iterRes}
                                </List.Item>
                            );
                        })}
                    </Message.List>
                </Message>
            </>
        );
    }

    return (
        <Message negative>
            <Message.Header>Extract yielded no results</Message.Header>
            <Message.Content>The full text parse statement code has been output to the console if further investigation is required.</Message.Content>
        </Message>
    );
};

const CompileErrors: React.SFC<ITextParseProps & ICompileErrorsCtrlProps> = (props) => {

    const { compileErrors } = props;

    return (
        <>
            <Message negative>
                <Message.Header>Compilation Failure</Message.Header>
                <Message.Content>
                    The code produced for the parse statements fails to compile.
                    This is most likely due to a bug in this application.
                    The full code has been output to the console for further investigation.
                    Compile errors:
                </Message.Content>

                <Message.List>
                    {compileErrors.map((error,idx) => {
                        return <Message.Item key={idx}>{error}</Message.Item>
                    })}
                </Message.List>
            </Message>
        </>
    );
};

const ParseOutputGeneralError: React.SFC<ITextParseProps & IParseOutputGeneralErrorCtrlProps> = (props) => {

    const { msg } = props;

    return (
        <Message negative>
            <Message.Header>Execution Failure</Message.Header>
            <Message.Content>{msg}</Message.Content>
        </Message>
    );
};

//TODO: I've not given the task result a type out of laziness - it would mean replicating the
// parse controller model types. This can be automated using a tool like Swagger.
const HandleParseTask = (
    task: Promise<any>,
    fSucceededWithResult: (data: any) => boolean,
    fHandleSuccessWithResult: (data: any) => void,
    fHandleSuccessWithNoResult: () => void,
    SetCompileErrors: (errors: string[]) => void,
    SetGeneralError: (error: string) => void,
    SetParseInProgress: (inProg: boolean) => void
): void => {

    task.then(res => {

        const { data } = res;

        if(data.FullCode) {
            console.log(data.FullCode);
        }
    
        if(fSucceededWithResult(data)) {
            fHandleSuccessWithResult(data);
        }
        else if(data.CompileErrors && data.CompileErrors.length>0) {
            SetCompileErrors(data.CompileErrors);
    
        } else if(data.ExecuteError) {
            SetGeneralError(data.ExecuteError + " The generated code has been logged to the console.");
        } else {
            fHandleSuccessWithNoResult();
        }
    
        SetParseInProgress(false);

    }).catch(res => {
        SetParseInProgress(false);

        SetGeneralError(
            "There was an unexpected error whilst executing the parse. " +
            ((res.response && res.response.data)?res.response.data:res)
        );
    });
};

const ExecuteParseButtonClick = (
    input: string,
    type: eParseOutputType,
    statements: Array<TextParseStatement>,
    SetParseInProgress: (inProgress: boolean) => void,
    SetExtractResults: (results: IParseExtractResult) => void,
    SetCompileErrors: (errors: string[]) => void,
    SetGeneralError: (error: string) => void,
    SetMatchResult: (res: number) => void,
    replaceFormat: string,
    SetReplaceResult: (result: IParseReplaceResult) => void,
    fGetVariables: () => TextParseVariable[],
    functions: TextParseFunction[],
    builtInExample: eParseBuiltInExample
) => {

    // Makes the code terser
    const _HandleParseTask = (
        task: Promise<any>,
        fSucceededWithResult: (data: any) => boolean,
        fHandleSuccessWithResult: (data: any) => void,
        fHandleSuccessWithNoResult: () => void,
    ) => HandleParseTask(
        task,
        fSucceededWithResult,
        fHandleSuccessWithResult,
        fHandleSuccessWithNoResult,
        SetCompileErrors,
        SetGeneralError,
        SetParseInProgress);

    if(builtInExample!==null) {
        const fHandleSuccess = (dataOptional: any): void => {
            SetReplaceResult({
                numMatching: ((dataOptional)?dataOptional.NumMatching:0),
                replacedText: ((dataOptional)?dataOptional.ReplacedText:"")
            });
        };

        _HandleParseTask(
            ExecuteBuiltInExample(input, builtInExample),
            (data) => data.NumMatching>0,
            (data) => fHandleSuccess(data),
            () => fHandleSuccess(null)
        );

    } else {
        switch(type) {
            case eParseOutputType.potMatch:

                _HandleParseTask(
                    Match(input, statements, fGetVariables, functions),
                    (data) => data.NumMatching>0,
                    (data) => SetMatchResult(data.NumMatching),
                    () => SetMatchResult(0)
                );
                break;

            case eParseOutputType.potExtractSingle:
            case eParseOutputType.potExtractAll:

                {
                    const isSingle = (type == eParseOutputType.potExtractSingle);

                    const fHandleSuccess = (dataOptional: any): void => {
                        SetExtractResults({
                            success: (dataOptional!==null),
                            extracted: ((dataOptional)?dataOptional.ExtractedText:null)
                        })  
                    };

                    _HandleParseTask(
                        Extract(input, statements, isSingle, replaceFormat, fGetVariables, functions),
                        (data) => data.ExtractedText && data.ExtractedText.length>0,
                        (data) => fHandleSuccess(data),
                        () => fHandleSuccess(null)
                    );
                }
                break;

            case eParseOutputType.potReplace:

                {
                    const fHandleSuccess = (dataOptional: any): void => {
                        SetReplaceResult({
                            numMatching: ((dataOptional)?dataOptional.NumMatching:0),
                            replacedText: ((dataOptional)?dataOptional.ReplacedText:"")
                        });
                    };

                    _HandleParseTask(
                        Replace(input, statements, replaceFormat, fGetVariables, functions),
                        (data) => data.NumMatching>0,
                        (data) => fHandleSuccess(data),
                        () => fHandleSuccess(null)
                    );
                }
                break;
        }
    }

    // Update the UI
    SetParseInProgress(true);

    // Clear the slate
    SetExtractResults(null);
    SetCompileErrors(null);
    SetGeneralError(null);
    SetMatchResult(null);
    SetReplaceResult(null);
};

const ExecuteParseButton: React.SFC<ITextParseProps & IExecuteParseButtonCtrlProps> = (props) => {

    const { statements, type, input, SetParseInProgress, SetExtractResults, disabled,
        SetCompileErrors, SetGeneralError, SetMatchResult, replaceFormat, SetReplaceResult, updatePending,
        functions, firstFailingStatement, firstFailingFunction, parseInputError, fGetVariables,
        builtInExample } = props;

    let buttonCaption="";
    let canExecute=false;

    if(!disabled && !updatePending) {

        if(parseInputError!==null) buttonCaption=parseInputError;
        else if(builtInExample===null && !statements.length) buttonCaption="Please create some parse statements before attempting to parse.";
        else if(firstFailingStatement) buttonCaption=`One or more parse statements have missing data and/or are not valid. First failing statement found: ${firstFailingStatement.Heading()}`;
        else if (firstFailingFunction) buttonCaption=`One or more custom functions have missing data and/or are not valid. First failing custom function found: ${firstFailingFunction.Name()}`;
        else canExecute=true;
    }

    return (
        <>
            <Button
                color={((canExecute || disabled)? "green": "red")}
                disabled={!canExecute || updatePending}
                onClick={() => ExecuteParseButtonClick(input, type, statements, SetParseInProgress, SetExtractResults,
                    SetCompileErrors, SetGeneralError, SetMatchResult, replaceFormat, SetReplaceResult,
                    fGetVariables, functions, builtInExample)}
            >
                {((disabled)?"Parse in Progress..":"Execute Parse")}
            </Button>

            {!canExecute && !disabled && !updatePending &&
                <Label pointing="left">
                    {buttonCaption}
                </Label>
            }
        </>
    );

};

const ParseInputText: React.SFC<ITextParseProps & IParseInputTextCtrlProps> = (props) => {

    const { text, SetText, onBlur, parseInputTextRef } = props;

    return (
        <textarea
            placeholder="Text input.."
            defaultValue={text}
            onChange={e => SetText(e.target.value)}
            onBlur={onBlur}
            ref={parseInputTextRef}
        />
    );
};

const ParseOutputType: React.SFC<ITextParseProps & IParseOutputTypeCtrlProps> = (props) => {

    const { type, SetType } = props;

    const matchIsChecked=(type === eParseOutputType.potMatch);
    const extractSingleIsChecked=(type === eParseOutputType.potExtractSingle);
    const extractAllIsChecked=(type === eParseOutputType.potExtractAll);
    const replaceIsChecked=(type === eParseOutputType.potReplace);

    return (
        <>
            <Form.Field>
                <Checkbox
                    radio
                    label="Match"
                    checked={matchIsChecked}
                    onChange={() => SetType(eParseOutputType.potMatch)}
                />

                {matchIsChecked &&
                    <Label pointing="left">
                        Determine whether the input text matches the parse statement list.
                    </Label>
                }
            </Form.Field>

            <Form.Field>
                <Checkbox
                    radio
                    label="Extract Single"
                    checked={extractSingleIsChecked}
                    onChange={() => SetType(eParseOutputType.potExtractSingle)}
                />

                {extractSingleIsChecked &&
                    <Label pointing="left">
                        Extract the first item matching the parse statement list.
                    </Label>
                }
            </Form.Field>

            <Form.Field>
                <Checkbox
                    radio
                    label="Extract All"
                    checked={extractAllIsChecked}
                    onChange={() => SetType(eParseOutputType.potExtractAll)}
                />

                {extractAllIsChecked &&
                    <Label pointing="left">
                        Extract all items matching the parse statement list into a list.
                    </Label>
                }
            </Form.Field>

            <Form.Field>
                <Checkbox
                    radio
                    label="Replace"
                    checked={replaceIsChecked}
                    onChange={() => SetType(eParseOutputType.potReplace)}
                />

                {replaceIsChecked &&
                    <Label pointing="left">
                        Replace entries matching the parse statement list according to the replace format and retain any text which does not match.
                    </Label>
                }
            </Form.Field>
        </>
    );
};

const StatementChildThenOrDescr = (parentStmt: TextParseStatement) => {
    // The main statement list will not have a parent but it is effectively a statement list
    if(parentStmt === null) return "THEN";

    switch(parentStmt.type) {
        case eStatementType.Or_Comp:
            return "OR";
        default:
            return "THEN";
    }
};

const StatementListItem: React.SFC<ITextParseProps & IStatementListCtrlProps & {
    stmt: TextParseStatement,
    idx: number,
    level: number,
    stmtCount: number,
    siblings: TextParseStatement[],
    parentStmt: TextParseStatement,
    isMobile: boolean,
    mediaMatching: MatchMediaResult
}> = (props) => {

    const { stmt, SetSelStatement, selStatement, idx, level, stmtCount, ChangeStatementOrder, RemoveStatement,
        modalState, SetModalState, statements, siblings, parentStmt, isMobile, mediaMatching } = props;

    const paddingBlankSpace=((level>1)?" ".repeat(10*(level-1)) : "");

    const heading=stmt.Heading();

    const children=stmt.Children();
    
    const childrenListItems=((children) ? children.map((iterStmt,idx) => {
        return (
            <StatementListItem
                {...props}
                stmt={iterStmt}
                idx={idx}
                level={level+1}
                stmtCount={children.length}
                key={CreateStatementKey(iterStmt,"li")}
                siblings={children}
                parentStmt={stmt}
                isMobile={isMobile}
                mediaMatching={mediaMatching}
            />
        );
    }) : null);

    let rowExtraProps;
    const canSave=stmt.CanSave(statements);
    if(canSave) {
        rowExtraProps={positive: true};
    } else {
        rowExtraProps={negative: true};
    }

    const hasUpButton=(idx !==0);
    const hasDownButton=(idx !== stmtCount-1);

    const isTablet = ((mediaMatching.FirstMatching() === eScreenResolution.Tablet)?true:false);

    const upDownCloseButtons = (
        <>
            <Icon name="pencil" onClick={() => SetSelStatement(stmt)} />
            {hasUpButton && <Icon name="caret up" onClick={() => ChangeStatementOrder(CreateSelStatement(stmt),-1)} />}
            {!hasUpButton && <Icon /> }
            {hasDownButton && <Icon name="caret down" onClick={() => ChangeStatementOrder(CreateSelStatement(stmt),1)} />}
            {!hasDownButton && <Icon /> }

            <TextParseModal
                key={`del-${stmt.UID}-${stmt.type}`}
                trigger={<Icon name="close" onClick={() => {
                    SetModalState({
                        type: eModalType.mtClearSingleStatement,
                        selStmt: CreateSelStatement(stmt)
                    });
                }} />}
                title="Confirm Delete"
                message={`Are you sure you want to delete this text parse statement? This action cannot be undone.`}
                onYes={() => {
                    if(CompareSelectedStatement(selStatement,stmt) || StatementIsAChildOf(stmt, selStatement)) {
                        SetSelStatement(null);
                    }
                    SetModalState(null);
                    RemoveStatement(stmt);
                }}
                onNo={() => SetModalState(null)}
                onCancel={() => SetModalState(null)}
                show={(modalState!==null && modalState.type===eModalType.mtClearSingleStatement && CompareSelectedStatement(modalState.selStmt,stmt))}
            />
        </>
    );

    return (
        <Fragment
            key={`${stmt.UID}-${stmt.type}`}
        >
            <Table.Row
                active={CompareSelectedStatement(selStatement,stmt)}
                {...rowExtraProps}
            >
                {isMobile &&
                    <Table.Cell style={{textAlign: "right"}}>
                        {upDownCloseButtons}
                    </Table.Cell>
                }

                <Table.Cell
                    onClick={() => {
                        SetSelStatement(stmt);
                    }}
                >
                    {paddingBlankSpace}
                    <Icon name={stmt.Icon()} color={((canSave)?"green":"red")} />
                    {"   "} 
                    {heading}
                </Table.Cell>

                {!isMobile &&
                    <>
                        <Table.Cell>
                            {idx<(siblings.length -1) && <b>{StatementChildThenOrDescr(parentStmt)}</b>}
                        </Table.Cell>

                        <Table.Cell width={((isTablet)?3:2)} textAlign="right">
                            {upDownCloseButtons}
                        </Table.Cell>
                    </>
                }

                {isMobile && idx<(siblings.length -1) && <Table.Cell><b>{StatementChildThenOrDescr(parentStmt)}</b></Table.Cell>}

            </Table.Row>

            {childrenListItems}
        </Fragment>
    );
};

const StatementListCtrl: React.SFC<ITextParseProps & IStatementListCtrlProps> = (props) => {

    const { statements, modalState, SetModalState, SetStatements, SetSelStatement,
        isMobile, mediaMatching } = props;

    const items=statements.map((stmt,idx) => {
        return (
            <StatementListItem
                {...props}
                stmt={stmt}
                idx={idx}
                level={1}
                stmtCount={statements.length}
                key={CreateStatementKey(stmt,"li")}
                siblings={statements}
                parentStmt={null}
                isMobile={isMobile}
                mediaMatching={mediaMatching}
            />
        );
    });

    const clearListTrigger = (
        <Button
            onClick={() => SetModalState({type: eModalType.mtClearAllStatements})}
        >
            Clear List
        </Button>
    );

    return (
        <>
            {items.length>0 &&
                <>
                    <Table
                        selectable
                        compact
                    >
                        <Table.Body>
                            {items}
                        </Table.Body>
                    </Table>

                    <TextParseModal
                        trigger={clearListTrigger}
                        title="Confirm Clear"
                        message="Are you sure you want to clear the text parse statement list? This action cannot be undone."
                        onYes={() => {
                            SetModalState(null);
                            SetStatements(new Array<TextParseStatement>());
                            SetSelStatement(null);
                        }}
                        onNo={() => SetModalState(null)}
                        onCancel={() => SetModalState(null)}
                        show={(modalState!==null && modalState.type===eModalType.mtClearAllStatements)}
                    />

                    <br />
                    <br />
                </>
            }
        </>
    );
};

const AddNewParseStatementCtrls: React.SFC<ITextParseProps & ITypeDropdownProps & IAddInsertParseStatementCtrlProps> = (props) => {
    
    return (
        <>
            <TypeDropdownCtrl
                {...props}
            />

            <TypeExplanationCtrl
                {...props}
            />

            <br />
            <br />

            <AddInsertParseStatementCtrl
                {...props}
            />
        </>
    );
};

const CreateParseStatement = (
    nameIndexes: Array<number | undefined>,
    stmtType: eStatementType
): TextParseStatement => {

    const CreateStmt = (): TextParseStatement => {
        switch(stmtType) {
            case eStatementType.String_Comp:
                return new StringComparisonStatement();

            case eStatementType.SkipWS_Op:
                return new SkipWSStatement();

            case eStatementType.Or_Comp:
                return new OrComparisonStatement();

            case eStatementType.StatementList_Comp:
                return new StatementListComparisonStatement();

            case eStatementType.AdvanceToEnd_Op:
                return new AdvanceToEndStatement();

            case eStatementType.EndOfString_Comp:
                return new EndOfStringComparisonStatement();

            case eStatementType.StartOfString_Comp:
                return new StartOfStringComparisonStatement();

            case eStatementType.Capture_Comp:
                return new CaptureComparisonStatement();

            case eStatementType.IsWhitespace_Comp:
                return new IsWhitespaceComparisonStatement();

            case eStatementType.StringOffset_Comp:
                return new StringOffsetComparisonStatement();

            case eStatementType.StorePosAsVariable_Op:
                return new StorePosAsVariableStatement();

            case eStatementType.Advance_Op:
                return new AdvanceStatement();

            case eStatementType.AdvanceUntil_Comp:
                return new AdvanceUntilComparisonStatement();

            case eStatementType.CustomComparison:
                return new CustomComparisonStatement();

            case eStatementType.SetVariable_Op:
                return new SetVariableStatement();
        }
    }

    const NewIndex = (): number => {
        // Generate a default name
        if(nameIndexes[stmtType] === undefined) {
            return 1;
        }
        
        return nameIndexes[stmtType] + 1;
    };

    const newIndex=NewIndex();

    nameIndexes[stmtType] = newIndex;

    const newStatement=CreateStmt();

    newStatement.name=`${newStatement.TypeDescription()}${newIndex}`;
    newStatement.UID = newIndex;

    //console.log(`Created parse statement: ${CreateStatementKey(newStatement,"")}`);

    return newStatement;
};

const AddInsertParseStatement =
    (ctrlProps: ITextParseProps & IAddInsertParseStatementCtrlProps,
    isInsert: boolean) : void => {

    const { nameIndexes, statements, selectedStatementType, SetStatements, selStmtIndex } = ctrlProps;

    // Create the new statement based on type.
    const newStatement: TextParseStatement = CreateParseStatement(nameIndexes, selectedStatementType);

    //// Add/insert it
    // Get the new index
    let newSelIndex;
    if(statements.length == 0) {
        newSelIndex = 0;
    } else {
        newSelIndex = ((isInsert) ? selStmtIndex : selStmtIndex + 1);
    }

    let updatedStatements: Array<TextParseStatement>;
    if(newSelIndex>=statements.length) {
        // Add

        // Copy the existing array
        updatedStatements = statements.map(stmt => {
            return stmt.Copy(true);
        });

        // Add the new one
        updatedStatements.push(newStatement);
    } else {
        // Insert

        // Copy the ones up to the insert index
        updatedStatements = new Array<TextParseStatement>();
        for(let i=0;i<newSelIndex; ++i) {
            updatedStatements.push(statements[i]);
        }

        // Add the new one
        updatedStatements.push(newStatement);

        // Add the ones above it
        for(let i=newSelIndex; i<statements.length; ++i) {
            updatedStatements.push(statements[i]);
        }
    }

    SetStatements(updatedStatements, newStatement);
}

const AddInsertParseStatementCtrl: React.SFC<ITextParseProps & IAddInsertParseStatementCtrlProps> = (props) => {

    const {insert} = props;
    
    return (
        <>
            {insert &&
                <Button
                    onClick={() => AddInsertParseStatement(props,true)}
                >
                    Insert
                </Button>
            }

            <Button
                onClick={() => AddInsertParseStatement(props,false)}
            >
                Add
            </Button>
        </>
    );
};

const TypeDropdownCtrl_Options = [
    {
        key: eStatementType.String_Comp,
        text: "String comparison",
        value: eStatementType.String_Comp
    },

    {
        key: eStatementType.SkipWS_Op,
        text: "Skip whitespace",
        value: eStatementType.SkipWS_Op
    },

    {
        key: eStatementType.Or_Comp,
        text: "Or comparison",
        value: eStatementType.Or_Comp
    },

    {
        key: eStatementType.StatementList_Comp,
        text: "Statement list",
        value: eStatementType.StatementList_Comp
    },

    {
        key: eStatementType.AdvanceToEnd_Op,
        text: "Advance to the end",
        value: eStatementType.AdvanceToEnd_Op
    },

    {
        key: eStatementType.EndOfString_Comp,
        text: "End of string comparison",
        value: eStatementType.EndOfString_Comp
    },

    {
        key: eStatementType.StartOfString_Comp,
        text: "Start of string comparison",
        value: eStatementType.StartOfString_Comp
    },

    {
        key: eStatementType.Capture_Comp,
        text: "Capture",
        value: eStatementType.Capture_Comp
    },

    {
        key: eStatementType.IsWhitespace_Comp,
        text: "Is whitespace comparison",
        value: eStatementType.IsWhitespace_Comp
    },

    {
        key: eStatementType.StringOffset_Comp,
        text: "String offset comparison",
        value: eStatementType.StringOffset_Comp
    },

    {
        key: eStatementType.StorePosAsVariable_Op,
        text: "Store the current position in a variable",
        value: eStatementType.StorePosAsVariable_Op
    },

    {
        key: eStatementType.Advance_Op,
        text: "Advance",
        value: eStatementType.Advance_Op
    },

    {
        key: eStatementType.AdvanceUntil_Comp,
        text: "Advance until comparison",
        value: eStatementType.AdvanceUntil_Comp
    },

    {
        key: eStatementType.CustomComparison,
        text: "Custom comparison",
        value: eStatementType.CustomComparison
    },

    {
        key: eStatementType.SetVariable_Op,
        text: "Set variable",
        value: eStatementType.SetVariable_Op
    }
];

const TypeDropdownCtrl: React.SFC<ITextParseProps & ITypeDropdownProps> = (props) => {

    const { selectedStatementType, SetSelectedStatementType, comparisonOnly } = props;

    let options;
    if(comparisonOnly) {
        options = TypeDropdownCtrl_Options.filter((optionsObj) => {
            const statementTypeInfo=StatementTypeInfo[optionsObj.value];
            return statementTypeInfo.isComparison;
        });
    } else {
        options = TypeDropdownCtrl_Options;
    }

    let additionalProps = {};
    if(props.selectedStatementType !== null) {
        additionalProps = {
            value: selectedStatementType
        };
    }

    return (
        <Dropdown
            options={options}
            placeholder={"Statement Type"}
            onChange={(e,value) => SetSelectedStatementType(value.value as number)}
            {...additionalProps}
        />
    );
};

const TypeExplanationCtrl: React.SFC<ITextParseProps & ITypeExplanationProps> = (props) => {

    if(props.selectedStatementType === null) {
        return null;
    }

    var text;

    switch(props.selectedStatementType) {

        case eStatementType.String_Comp:
            text="Compare the text at the current index to a specific string.";
            break;

        case eStatementType.SkipWS_Op:
            text="Advance until the first non-whitespace character is found.";
            break;

        case eStatementType.Or_Comp:
            text="Compare a list of statements. The parser will advance according to the first matching statement " +
                "(if any).";
            break;

        case eStatementType.StatementList_Comp:
            text="Perform an ordered list of text parse statements. The first comparison which fails to match will " +
                "cause the statement list to stop and the overall status will be considered as not matching. Useful " +
                "for creating aggregate comparison statements.";
            break;

        case eStatementType.AdvanceToEnd_Op:
            text="Advance until the end of the input string. Can be used to force a match on a single item as "+
                "opposed to continueing after every match and will improve performance.";
            break;

        case eStatementType.EndOfString_Comp:
            text="Compare the current position to the end of the input string. Can be used to force an exact match.";
            break;

        case eStatementType.StartOfString_Comp:
            text="Compare the current position to the beginning of the input string. Can be used to force an exact match.";
            break;

        case eStatementType.Capture_Comp:
            text="Perform a statement list and capture the matching text. "+
                "The matching text can be referenced within the replace format using the statement name.";
            break;

        case eStatementType.IsWhitespace_Comp:
            text="Validate whether the current text is whitespace.";
            break;

        case eStatementType.StringOffset_Comp:
            text="Compare the string at the current position against a string elsewhere in the input text.";
            break;

        case eStatementType.StorePosAsVariable_Op:
            text="Store the current position in a variable.";
            break;

        case eStatementType.Advance_Op:
            text="Advance the current position / move elsewhere within the input string.";
            break;

        case eStatementType.AdvanceUntil_Comp:
            text="Advance the current position one by one until the statement list matches. Effectively a 'do until' "
                "loop.";
            break;

        case eStatementType.CustomComparison:
            text="User generated comparison. Only use this when specific statements(s) cannot achieve the same goal.";
            break;

        case eStatementType.SetVariable_Op:
            text="Store a value as a variable.";
            break;
    }

    return (
        <Label pointing="left">
            {text}
        </Label>
    );
};

const StringComparisonInputCtrl: React.SFC<ITextParseProps & ITextParseStatementState & {
    updater: SimpleDelayer
}> =
    (props) => {

    const { SetStatement, updater } = props;
    const statement = props.statement as StringComparisonStatement;

    const placeHolderText="Text to compare against...";

    return (
        <>

            <UpdateInputCtrl
                statement={statement}
                SetStatement={SetStatement}
                placeholder={placeHolderText}
                title={placeHolderText}
                GetValue={StringComparisonStatement.GetStr}
                SetValue={StringComparisonStatement.SetStr}
                Validate={StringComparisonStatement.ValidateStr}
                updater={updater}
                name="string"
            />

            <br />
            <br />

            <Checkbox
                label="Case sensitive"
                checked={statement.caseSensitive}
                onChange={() => {

                    const updated=new StringComparisonStatement(statement);
                    updated.caseSensitive=!statement.caseSensitive;

                    SetStatement(updated);
                }}
            />
        </>
    );
};

const OrComparisonInputCtrl: React.SFC<ITextParseProps & ITextParseStatementState & IOrComparisonInputCtrlProps> = (props) => {

    const { nameIndexes, subSelectedStatementType, SetSubSelectedStatementType, SetStatement, SetSelStatement } = props;

    const orStatement = props.statement as OrComparisonStatement;

    const children=orStatement.Children();

    return (
        <AddNewParseStatementCtrls
            {...props}
            statements={children}
            SetStatements={(statements, selStmt) => {

                const copy=new OrComparisonStatement(orStatement,false);
                copy.children=statements;
                SetSelStatement(selStmt);
                SetStatement(copy);
            }}
            selectedStatementType={subSelectedStatementType}
            nameIndexes={nameIndexes}
            SetSelectedStatementType={SetSubSelectedStatementType}
            selStmtIndex={((children)?children.length-1:-1)}
            insert={false}
            comparisonOnly={true}
        />
    );
};

const CaptureComparisonInputCtrl: React.SFC<ITextParseProps & ITextParseStatementState & ICaptureComparisonInputCtrlProps> = (props) => {

    const { nameIndexes, subSelectedStatementType, SetSubSelectedStatementType, SetStatement, SetSelStatement } = props;

    const statementList = props.statement as CaptureComparisonStatement;

    const children=statementList.Children();

    return (
        <AddNewParseStatementCtrls
            {...props}
            statements={children}
            SetStatements={(statements, selStmt) => {

                const copy=new CaptureComparisonStatement(statementList,false);
                copy.children=statements;
                SetSelStatement(selStmt);
                SetStatement(copy);
            }}
            selectedStatementType={subSelectedStatementType}
            nameIndexes={nameIndexes}
            SetSelectedStatementType={SetSubSelectedStatementType}
            selStmtIndex={((children)?children.length-1:-1)}
            insert={false}
            comparisonOnly={false}
        />
    );

};

const StatementListComparisonInputCtrl: React.SFC<ITextParseProps & ITextParseStatementState & IStatementListComparisonInputCtrlProps> = (props) => {

    const { nameIndexes, subSelectedStatementType, SetSubSelectedStatementType, SetStatement, SetSelStatement } = props;

    const statementList = props.statement as StatementListComparisonStatement;

    const children=statementList.Children();

    return (
        <AddNewParseStatementCtrls
            {...props}
            statements={children}
            SetStatements={(statements, selStmt) => {

                const copy=new StatementListComparisonStatement(statementList,false);
                copy.children=statements;
                SetSelStatement(selStmt);
                SetStatement(copy);
            }}
            selectedStatementType={subSelectedStatementType}
            nameIndexes={nameIndexes}
            SetSelectedStatementType={SetSubSelectedStatementType}
            selStmtIndex={((children)?children.length-1:-1)}
            insert={false}
            comparisonOnly={false}
        />
    );
};

const StringOffsetComparisonInputCtrl: React.SFC<IStringOffsetComparisonCtrlProps & {
    updater: SimpleDelayer
}> =
    (props) => {

    const { SetStatement, updater, fGetVariables, functions, updatePending } = props;
    const statement = props.statement as StringOffsetComparisonStatement;

    const fOperandDropdown = (
        name: string,
        operand: IParseOperand,
        fUpdate: (stmt: StringOffsetComparisonStatement,_oper: IParseOperand) => void,
        placeholder: string,
        title: string
    ) => {
        return (
            <ParseOperandDropdown
                {...props}
                functions={functions}
                fGetVariables={fGetVariables}
                SetOperand={_oper => {
                    const updated=new StringOffsetComparisonStatement(statement);
                    fUpdate(updated,_oper);
                    SetStatement(updated);
                }}
                data={operand}
                name={`stringoffsetcomparison${name}`}
                updater={updater}
                updatePending={updatePending}
                includeLength={false}
                includeCurrentPosition={false}
                placeholder={placeholder}
                title={title}
            />
        );
    };

    return (
        <>
            <Form.Field>
                {fOperandDropdown("offset",
                    statement.offset,
                    (comp, _oper) => comp.offset=_oper,
                    "(Offset)...",
                    "The offset index within the input string to begin comparing from"
                )}
            </Form.Field>

            <Form.Field>
                {fOperandDropdown("length",
                    statement.length,
                    (comp, _oper) => comp.length=_oper,
                    "(Length)...",
                    "How many characters to compare"
                )}
            </Form.Field>

            <Form.Field>
                <Checkbox
                    label="Reverse match"
                    checked={statement.reverse}
                    onChange={() => {

                        const updated=new StringOffsetComparisonStatement(statement);
                        updated.reverse=!statement.reverse;

                        SetStatement(updated);
                    }}
                />
            </Form.Field>

            <Form.Field>
                <Checkbox
                    label="Case sensitive"
                    checked={statement.caseSensitive}
                    onChange={() => {

                        const updated=new StringOffsetComparisonStatement(statement);
                        updated.caseSensitive=!statement.caseSensitive;

                        SetStatement(updated);
                    }}
                />
            </Form.Field>
        </>
    );
};

// Create a unique key per statement input ctrl otherwise the 'defaultValue's persist for the same input (e.g. name)
// across multiple text parse statements
const CreateStatementKey = (stmt: TextParseStatement, name: string) => {
    return `${stmt.type}-${stmt.UID}-${name}`;
};

const UpdateInputCtrl: React.SFC<ITextParseProps & IParseStatementInputCtrlProps> =
    (props) => {

    const { statement, SetStatement, placeholder, GetValue, SetValue, title, Validate, updater, name } = props;

    return (
        <>
            {InputCtrl(
                CreateStatementKey(statement,name),
                placeholder,
                GetValue(statement),
                (value: string) => {
                    const updated=statement.Copy(true);
                    SetValue(updated,value);
                    
                    SetStatement(updated);
                },
                updater,
                title,
                ".",
                ((Validate)? !Validate(statement) : false)
            )}
        </>
    );
};

const InputCtrl = (
    key: string,
    placeholder: string,
    defaultValue: string|number,
    SetValue: (value: string) => void,
    updater: SimpleDelayer,
    title: string,
    type: string,
    error: boolean): JSX.Element => {

    let additionalProps = {};
    if(error!==null && error) {
        additionalProps = {
            ...additionalProps,
            error: true
        };
    }

    return (
        <Input
            key={key}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={e => {
                const value=e.target.value;

                updater.DelayedCall(() => {
                    SetValue(value);
                });
            }}
            title={title}
            type={type}
            onBlur={updater.ImmediateCall}
            {...additionalProps}
        />
    );
};

const TextParseModal: React.SFC<IModalCtrlProps> = (props) => {

    const { title, message, onNo, onYes, onCancel, trigger, show } = props;

    return (
        <Modal
            trigger={trigger}
            dimmer="inverted"
            open={show}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>{message}</Modal.Content>
            <Modal.Actions>
                {onYes &&
                    <Button
                        onClick={onYes}
                    >
                        Yes
                    </Button>
                }

                {onNo &&
                    <Button
                        onClick={onNo}
                    >
                        No
                    </Button>
                }

                {onCancel &&
                    <Button
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                }
            </Modal.Actions>
        </Modal>
    );
};

const CreateCustomFunctionName = (functions: TextParseFunction[], currentIndex: number=functions.length+1): string => {

    // Make sure it's unique.
    let newName: string=`CustomFunc ${currentIndex}`;
    const newNameLower=newName.toLowerCase();

    if(functions.find(iterFunc => iterFunc.Name().toLowerCase() === newNameLower))
        return CreateCustomFunctionName(functions,currentIndex+1);

    return newName;
}

const AddCustomFunction = (props: ITextParseProps & ICustomFunctionsProps): void => {

    const { SetFunctions, functions, SetSelFunctionIdx, CreateTextParsefunction } = props;

    const updatedFunctions=[
        ...functions.map(iterObj => CopyTextParsefunction(iterObj)),
        CreateTextParsefunction(CreateCustomFunctionName(functions))
    ];

    SetFunctions(updatedFunctions);

    SetSelFunctionIdx(updatedFunctions.length-1);
};

const UpdateCustomFunctionCtrl: React.SFC<ITextParseProps & ICustomFunctionCtrlProps> =
    (props) => {

    const { placeholder, value, SetValue, title, Validate, updater, ctrlName, customFunction, SetCustomFunction, funcIdx } = props;

    return (
        <>
            {InputCtrl(
                `func-${ctrlName}-${funcIdx}`,
                placeholder,
                value,
                (value: string) => {
                    const updated=CopyTextParsefunction(customFunction);
                    SetValue(updated,value);
                    
                    SetCustomFunction(updated);
                },
                updater,
                title,
                ".",
                ((Validate)? !Validate() : false)
            )}
        </>
    );
};

const ValidateFuncName = (selFunctionIdx: number, functions: TextParseFunction[]) => {

    const thisNameAsLower=functions[selFunctionIdx].Name().toLowerCase();

    if(thisNameAsLower==="") return false;

    for(let i=0;i<functions.length;++i) {

        if(i!==selFunctionIdx) {
            const matches=(functions[i].Name().toLowerCase() === thisNameAsLower);
            if(matches) return false;
        }
    }

    return true;
};

const CustomFunctionsOperatorDropdown: React.SFC<ITextParseProps & ICustomFunctionsOperatorDropdownProps> = (props) => {

    const { function: customFunction, SetCustomFunction } = props;

    // These must be in the same order of the 'eCustomFunctionOperator' enum
    const options=[
        {
            icon: "plus",
            description: "Add",
        },

        {
            icon: "minus",
            description: "Subtract",
        },

        {
            icon: "times",
            description: "Multiply",
        },

        {
            icon: "percent",
            description: "Divide",
        },
    ];

    let selIcon=undefined;
    if(customFunction.Operator() !== null) {
        selIcon = options[customFunction.Operator()-1].icon;
    }

    const onClick = (operator: eCustomFunctionOperator) => {

        const updatedFunction=CopyTextParsefunction(customFunction);

        updatedFunction.SetOperator(operator);
        SetCustomFunction(updatedFunction);
    };

    return (
        <Dropdown
            icon={selIcon}
            inline
            pointing="top left"
        >
            <Dropdown.Menu>
                {options.map((iterOption, i) => {
                    const operatorEnum=i+1;
                    return (
                        <Dropdown.Item
                            icon={iterOption.icon}
                            description={iterOption.description}
                            key={i}
                            value={operatorEnum}
                            onClick={() => onClick(operatorEnum)}
                        />
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

enum eParseOperandOptions {
    length= 1,
    currentPosition= 2,
    arbitraryValue=3,
    selectArbitraryValue=4,
    variablesBegin= 100,
    variablesEnd= 9999,
    functionsBegin= 10000,
    functionsEnd= 19999
};

const GetParseOperandSelIdx = (
    data: IParseOperand,
    variableList: TextParseVariable[],
    functions: TextParseFunction[]
): number | undefined => {

    if(!data || data.type===undefined) return undefined;

    switch(data.type) {
        case eParseOperandType.length:
            return eParseOperandOptions.length;

        case eParseOperandType.currentPosition:
            return eParseOperandOptions.currentPosition;

        case eParseOperandType.arbitraryValue:
            return eParseOperandOptions.arbitraryValue;

        case eParseOperandType.variable:
            {
                const foundIdx=variableList.findIndex(iterVar => data.MatchesVariable(iterVar));
                return ((foundIdx>=0) ? eParseOperandOptions.variablesBegin + foundIdx : undefined);
            }

        case eParseOperandType.function:
            {
                const foundIdx=functions.findIndex(iterFunc => data.MatchesFunction(iterFunc));
                return ((foundIdx >= 0) ? eParseOperandOptions.functionsBegin + foundIdx : undefined);
            }
    }
};

const ParseOperandDropdown_UpdateOperand = (
    selIdx: number,
    orgOperand: IParseOperand,
    variableList: TextParseVariable[],
    functions: TextParseFunction[]
): IParseOperand => {

    switch(selIdx) {

        case eParseOperandOptions.length:
            return CreateLengthOperand();

        case eParseOperandOptions.currentPosition:
            return CreateCurrentPositionOperand();

        case eParseOperandOptions.selectArbitraryValue:

            if(orgOperand) {

                return {
                    ...CopyParseOperand(orgOperand),
                    showArbitraryValueDialog: true,
                    arbitraryValueUpdate: ((orgOperand.arbitraryValue)!==undefined)?orgOperand.arbitraryValue.toString():"",
                };
            }

            return {
                type: eParseOperandType.arbitraryValue,
                showArbitraryValueDialog: true
            };

        default:
            if(selIdx>=eParseOperandOptions.variablesBegin && selIdx <= eParseOperandOptions.variablesEnd) {

                const variableIdx=selIdx-eParseOperandOptions.variablesBegin;

                return CreateVariableOperand(variableList[variableIdx]);
            }

            const dropdownFuncIdx=selIdx-eParseOperandOptions.functionsBegin;

            return CreateFunctionOperand(functions[dropdownFuncIdx]);
    }
};

const CustomFunctionOperandDropdown: React.SFC<ITextParseProps & ICustomFunctionOperandDropdownProps> = (props) => {

    const { selFunctionIdx, name, customFunction, SetCustomFunction } = props;

    const SetOperand= (operand: IParseOperand) => {
        const updatedFunction=CopyTextParsefunction(customFunction);
        props.SetOperand(updatedFunction, operand);
        SetCustomFunction(updatedFunction);
    };

    return (
        <ParseOperandDropdown
            {...props}
            name={`${name}${selFunctionIdx}`}
            SetOperand={SetOperand}
            placeholder="..."
        />
    );
};

const ParseOperandDropdown: React.SFC<ITextParseProps & IParseOperandDropdownProps> = (props) => {

    const { fGetVariables, functions, data, SetOperand, name, updater, updatePending, includeLength, includeCurrentPosition, placeholder, title } = props;

    const functionOptions=functions.map((iterFunc,idx) => {
        const value=eParseOperandOptions.functionsBegin+idx;
        return {
            key: value,
            text: `${iterFunc.Name()} (function)`,
            value: value,
            selected: ((data && data.type === eParseOperandType.function && data.MatchesFunction(iterFunc))?true:false)
        };
    });

    const variableList: TextParseVariable[] = fGetVariables();

    const lengthOption: DropdownItemProps[] = ((includeLength === undefined || includeLength) ?
        (
            [{
                key: eParseOperandOptions.length,
                text: "Length of input string",
                value: eParseOperandOptions.length,
                selected: ((data && data.type === eParseOperandType.length)?true:false)
            }]
        ) :
        []
    );

    const currentPosOption: DropdownItemProps[] = ((includeCurrentPosition === undefined || includeCurrentPosition) ?
        (
            [{
                key: eParseOperandOptions.currentPosition,
                text: "Current position / index (0 based)",
                value: eParseOperandOptions.currentPosition,
                selected: ((data && data.type === eParseOperandType.currentPosition)?true:false)
            }]
        ) :
        []
    );

    const optionalArbitraryValueOption: DropdownItemProps[] = ((data && data.type===eParseOperandType.arbitraryValue) ?
        (
            [{
                key: eParseOperandOptions.arbitraryValue,
                value: eParseOperandOptions.arbitraryValue,
                text: data.arbitraryValue,
                active: true,
                selected: true
            }]
        ) :
        []
    );

    const options: DropdownItemProps[] = [
        ...lengthOption,

        ...currentPosOption,

        ...optionalArbitraryValueOption,

        {
            key: eParseOperandOptions.selectArbitraryValue,
            text: "(Select arbitrary value)...",
            value: eParseOperandOptions.selectArbitraryValue,
            active: false,
            selected: false
        },

        ...variableList.map((variable,iterIdx) => {
            const value=eParseOperandOptions.variablesBegin+iterIdx;
            return {
                key: value,
                text: `${variable.name} (variable)`,
                value: value,
                selected: ((data && data.type === eParseOperandType.variable && data.MatchesVariable(variable))?true:false)
            }
        }),

        ...functionOptions
    ];

    //// Selected index
    const selIdx=GetParseOperandSelIdx(data, variableList, functions);

    return (
        <>
            <InputModal
                key={`${name}handArbitraryValueModal`}
                open={((data && data.showArbitraryValueDialog)?true:false)}
                headerIcon="pencil"
                headerText="Please Enter the Arbitrary Value (32 Bit Signed Integer)"
                valid={((data && IsA32BitSignedNumber(data.arbitraryValueUpdate))?true:false)}
                value={data?.arbitraryValueUpdate}
                onChange={(value) => updater.DelayedCall(() => {

                    const updatedOperand={
                        ...CopyParseOperand(data),
                        arbitraryValueUpdate: value
                    };

                    SetOperand(updatedOperand);
                })}
                okAvailable={!updatePending}
                onOk={() => {
                    const updatedOperand=CreateArbitraryValueOperand(parseInt(data.arbitraryValueUpdate));
                    SetOperand(updatedOperand);
                }}
                onCancel={() => {
                    // Edge case. Nothing was selected before and the user cancelled
                    if(!data || (data.type===eParseOperandType.arbitraryValue && data.arbitraryValue ===undefined)) {
                        SetOperand(null);

                    } else {
                        const updatedOperand: IParseOperand={
                            ...CopyParseOperand(data),
                            arbitraryValueUpdate: undefined,
                            showArbitraryValueDialog: false
                        };
                        SetOperand(updatedOperand);
                    }
                }}
            />

            <Dropdown
                key={`${name}handDropdown`}
                error={!data || data.type===undefined}
                options={options}
                text={((data)?undefined:placeholder)}
                value={selIdx}
                pointing="top left"
                selectOnBlur={false}
                title={title}
                placeholder={placeholder}
                onChange={(e, value) => {
                    const selIdx=(value.value as number);

                    const updatedOperand=ParseOperandDropdown_UpdateOperand(
                        selIdx, data, variableList, functions);

                    SetOperand(updatedOperand);
                }}
            >
            </Dropdown>
        </>
    );
};

const CustomFunctions: React.SFC<ITextParseProps & ICustomFunctionsProps> = (props) => {

    const { selFunctionIdx, SetCustomFunction, updater, fGetVariables, updatePending, firstFailingFunction, 
        functions, builtInExample } = props;

    const selCustomFunc=((selFunctionIdx !== null) ? props.functions[selFunctionIdx] : null);

    // Remove this function from the list of functions dropdown
    const operandFunctions=((selFunctionIdx !== null) ?
        functions.filter((unused, iterIdx) => iterIdx !== selFunctionIdx) :
        functions
    );

    return (
        <Segment padded>
            <Label color={HEADING_COLOUR} attached="top" icon={(firstFailingFunction)?"remove":"check"} content="Custom Functions" />
            <CustomFunctionList
                {...props}
            />

            {builtInExample!==null &&
                <Form.Field>
                    <i>Cannot display.</i>
                </Form.Field>
            }

            {builtInExample===null &&
                <>
                    <Button
                        onClick={() => AddCustomFunction(props)}
                    >
                        Add
                    </Button>

                    {selFunctionIdx !== null &&
                        <Segment padded>
                            <Label attached="top">Update Custom Function</Label>
                            <Form.Field>
                                <UpdateCustomFunctionCtrl
                                    ctrlName="name"
                                    placeholder="Name..."
                                    value={selCustomFunc.Name()}
                                    SetValue={(updated,value) => updated.SetName(value)}
                                    title="Please enter a unique name for the function."
                                    customFunction={selCustomFunc}
                                    SetCustomFunction={SetCustomFunction}
                                    updater={updater}
                                    Validate={() => ValidateFuncName(selFunctionIdx, functions)}
                                    funcIdx={selFunctionIdx}
                                />
                            </Form.Field>

                            <Form.Field>
                                <UpdateCustomFunctionCtrl
                                    ctrlName="descr"
                                    placeholder="Description... (optional)"
                                    value={selCustomFunc.Description()}
                                    SetValue={(updated,value) => updated.SetDescription(value)}
                                    title="Describe the purpose of the function."
                                    customFunction={selCustomFunc}
                                    SetCustomFunction={SetCustomFunction}
                                    updater={updater}
                                    funcIdx={selFunctionIdx}
                                />
                            </Form.Field>

                            <Form.Field>
                                <i>Return:</i>
                                <br />
                                {/* This is the only way I can get a tab to work. I'd love to know of a better way! */}
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <CustomFunctionOperandDropdown
                                    {...props}
                                    functions={operandFunctions}
                                    fGetVariables={fGetVariables}
                                    selFunctionIdx={selFunctionIdx}
                                    customFunction={selCustomFunc}
                                    SetCustomFunction={SetCustomFunction}
                                    SetOperand={(_function,_oper) => _function.SetLeftHandOperand(_oper)}
                                    data={selCustomFunc.LeftHandOperand()}
                                    name="left"
                                    updater={updater}
                                    updatePending={updatePending}
                                    title="Left hand operand"
                                />

                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

                                <CustomFunctionsOperatorDropdown
                                    {...props}
                                    SetCustomFunction={SetCustomFunction}
                                    function={selCustomFunc}
                                />

                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

                                <CustomFunctionOperandDropdown
                                    {...props}
                                    functions={operandFunctions}
                                    fGetVariables={fGetVariables}
                                    selFunctionIdx={selFunctionIdx}
                                    customFunction={selCustomFunc}
                                    SetCustomFunction={SetCustomFunction}
                                    SetOperand={(_function,_oper) => _function.SetRightHandOperand(_oper)}
                                    data={selCustomFunc.RightHandOperand()}
                                    name="right"
                                    updater={updater}
                                    updatePending={updatePending}
                                    title="Right hand operand"
                                />
                            </Form.Field>
                        </Segment>
                    }
                </>
            }
        </Segment>
    );
};

const CustomFuncTableRowProps = (
    func: TextParseFunction,
    funcList: TextParseFunction[],
    funcIdx: number
): TableRowProps => {

    if(func.IsValid(funcList, funcIdx)) return {positive: true};
    return {negative: true};
};

const CustomFunctionList: React.SFC<ITextParseProps & ICustomFunctionsProps> = (props) => {

    const { functions, SetFunctions, SetModalState, modalState, selFunctionIdx,
        SetSelFunctionIdx, mediaMatching } = props;

    if(!functions.length) return null;

    const isMobile=((mediaMatching.FirstMatching()==eScreenResolution.Mobile)?true:false);

    const CreateCloseButton = (iterFunc: TextParseFunction,funcIdx: number): JSX.Element => {
        return (
            <TextParseModal
                key={`del-${funcIdx}`}
                trigger={<Icon name="close" onClick={() => {
                    SetModalState({
                        type: eModalType.mtDeleteCustomFunction,
                        funcIdx: funcIdx
                    });
                }} />}
                title="Confirm Delete"
                message={`Are you sure you want to delete this custom function? This action cannot be undone.`}
                onYes={() => {
                    SetModalState(null);
                    const updatedFunctions=functions.filter((unused,innerFuncIdx) => innerFuncIdx!==funcIdx);
                    SetFunctions(updatedFunctions);

                    // Update the selected row if necessary
                    if(selFunctionIdx>funcIdx) {
                        SetSelFunctionIdx(selFunctionIdx-1);
                    }
                    else if(selFunctionIdx===funcIdx) {
                        SetSelFunctionIdx(null);
                    }
                }}
                onNo={() => SetModalState(null)}
                onCancel={() => SetModalState(null)}
                show={(modalState!==null && modalState.type===eModalType.mtDeleteCustomFunction && modalState.funcIdx === funcIdx)}
            />
        );
    };

    return (
        <Table
            selectable
            compact
        >
            <Table.Body>
                {functions.map((iterFunc,funcIdx) => {

                    const iterIsSelectedRow=(funcIdx === selFunctionIdx);

                    return (
                        <Table.Row
                            active={iterIsSelectedRow}
                            key={funcIdx}
                            {...CustomFuncTableRowProps(iterFunc, functions, funcIdx)}
                        >
                            {isMobile &&
                                <Table.Cell textAlign="right" width={2}>
                                    {CreateCloseButton(iterFunc,funcIdx)}
                                </Table.Cell>
                            }

                            <Table.Cell
                                onClick={() => SetSelFunctionIdx(funcIdx)}
                            >
                                <>
                                    <b>{iterFunc.Name()}</b>
                                    {iterFunc.Description() &&
                                        <>
                                            {` - ${iterFunc.Description()}`}
                                        </>
                                    }
                                </>
                            </Table.Cell>

                            {!isMobile &&
                                <Table.Cell textAlign="right" width={2}>
                                    {CreateCloseButton(iterFunc,funcIdx)}
                                </Table.Cell>
                            }
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

const InputModal: React.SFC<IInputModalProps> = (props) => {

    const { open, headerIcon, headerText, valid, value, onChange, okAvailable, onOk, onCancel } = props;

    let inputFieldExtraProps: InputProps={};
    let okButtonProps: ButtonProps={};

    if(valid !== undefined) {

        if(!valid) {
            inputFieldExtraProps.error=true;
            okButtonProps.disabled=true;
        }
    }

    if(okAvailable !== undefined && !okAvailable) {
        okButtonProps.disabled=true;
    }

    return (
        <Modal
            key={`${name}handArbitraryValueModal`}
            open={open}
        >
            <Header
                icon={headerIcon}
                content={headerText}
            />
            <Modal.Content>
                <Form>
                    <Form.Field {...inputFieldExtraProps} required>
                        <Input defaultValue={value} onChange={e => onChange(e.target.value)} />
                    </Form.Field>
                </Form>
            </Modal.Content>

            <Modal.Actions>
                <Button
                    positive
                    {...okButtonProps}
                    onClick={onOk}
                >
                    OK
                </Button>

                <Button
                    negative
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    );

};

const SelectVariableNameInputCtrl: React.SFC<ITextParseProps & ITextParseStatementState & {updater: SimpleDelayer}> = (props) => {

    const { SetStatement, updater, statement } = props;

    const placeHolderText="Name of variable...";

    return (
        <UpdateInputCtrl
            statement={statement}
            SetStatement={SetStatement}
            placeholder={placeHolderText}
            title={placeHolderText}
            GetValue={SetVariableStatement.GetVarName}
            SetValue={SetVariableStatement.SetVarName}
            Validate={SetVariableStatement.ValidateVarName}
            updater={updater}
            name="varName"
        />
    );
};

const StorePosAsVariableInputCtrl:
    React.SFC<ITextParseProps & ITextParseStatementState & {updater: SimpleDelayer}> = (props) => {

    const { SetStatement, updater } = props;
    const statement = props.statement as StorePosAsVariableStatement;

    return (
        <SelectVariableNameInputCtrl
            statement={statement}
            SetStatement={SetStatement}
            updater={updater}
        />
    );
};

const AdvanceInputCtrl: React.SFC<ITextParseProps & IAdvanceInputProps> = (props) => {

    const { SetStatement, functions, fGetVariables, updater, updatePending } = props;
    const statement = props.statement as AdvanceStatement;

    return (
        <Form.Field>
            <ParseOperandDropdown
                {...props}
                functions={functions}
                fGetVariables={fGetVariables}
                SetOperand={_oper => {
                    const updated=new AdvanceStatement(statement);
                    updated.advanceWhere=_oper;
                    SetStatement(updated);
                }}
                data={statement.advanceWhere}
                name="advancestatementwhere"
                updater={updater}
                updatePending={updatePending}
                includeLength={false}
                includeCurrentPosition={false}
                placeholder="(To Where)..."
                title="Specify where to advance to"
            />
        </Form.Field>
    );

};

const AdvanceUntilInputCtrl: React.SFC<ITextParseProps & IAdvanceUntilInputCtrlProps> = (props) => {

    const { nameIndexes, subSelectedStatementType, SetSubSelectedStatementType, SetStatement, SetSelStatement } = props;

    const statement = props.statement as AdvanceUntilComparisonStatement;

    const children=statement.Children();

    return (
        <>
            <Form.Field>
                <Checkbox
                    label="Forwards"
                    checked={statement.forwards}
                    onChange={() => {

                        const updated=new AdvanceUntilComparisonStatement(statement);
                        updated.forwards=!statement.forwards;

                        SetStatement(updated);
                    }}
                />
            </Form.Field>

            <Form.Field>
                <AddNewParseStatementCtrls
                    {...props}
                    statements={children}
                    SetStatements={(statements, selStmt) => {

                        const copy=new AdvanceUntilComparisonStatement(statement,false);
                        copy.children=statements;
                        SetSelStatement(selStmt);
                        SetStatement(copy);
                    }}
                    selectedStatementType={subSelectedStatementType}
                    nameIndexes={nameIndexes}
                    SetSelectedStatementType={SetSubSelectedStatementType}
                    selStmtIndex={((children)?children.length-1:-1)}
                    insert={false}
                    comparisonOnly={false}
                />
            </Form.Field>
        </>
    );
};

const CustomComparisonInputCtrl: React.SFC<ITextParseProps & ICustomComparisonInputCtrlProps> = (props) => {

    const { fGetVariables, functions, SetStatement, updater, updatePending } = props;
    const statement = props.statement as CustomComparisonStatement;

    return (
        <>
            <i>Return:</i>
            <br />
            {/* This is the only way I can get a tab to work. I'd love to know of a better way! */}
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <ParseOperandDropdown
                name="CustomComparisonLeftOperand"
                SetOperand={_oper => {
                    const updated=new CustomComparisonStatement(statement);
                    updated.leftHandOperand=_oper;
                    SetStatement(updated);
                }}
                placeholder="..."
                functions={functions}
                fGetVariables={fGetVariables}
                data={statement.leftHandOperand}
                updater={updater}
                updatePending={updatePending}
                title="Left hand operand"
            />

            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

            <CustomComparisonOperator
                statement={statement}
                SetStatement={SetStatement}
            />

            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

            <ParseOperandDropdown
                name="CustomComparisonRightOperand"
                SetOperand={_oper => {
                    const updated=new CustomComparisonStatement(statement);
                    updated.rightHandOperand=_oper;
                    SetStatement(updated);
                }}
                placeholder="..."
                functions={functions}
                fGetVariables={fGetVariables}
                data={statement.rightHandOperand}
                updater={updater}
                updatePending={updatePending}
                title="Right hand operand"
            />
        </>
    );
};

const CustomComparisonOperator: React.SFC<ICustomComparisonOperatorProps> = (props) => {

    const { SetStatement } = props;

    const statement = props.statement as CustomComparisonStatement;

    // These must be in the same order of the 'eCustomComparisonOperator' enum
    const options=[
        {
            text: "==",
            description: "Equals"
        },

        {
            text: "!=",
            description: "Not Equal To"
        },

        {
            text: "<",
            description: "Less Than"
        },

        {
            text: "<=",
            description: "Lesser Or Equal To"
        },

        {
            text: ">",
            description: "Greater Than"
        },

        {
            text: ">=",
            description: "Greater Or Equal To"
        }
    ];

    const onClick = (operator: eCustomComparisonOperator) => {

        const updated=new CustomComparisonStatement(statement);

        updated.operator=operator;
        SetStatement(updated);
    };

    const selOption = options[statement.operator];

    return (
        <Dropdown
            inline
            pointing="top left"
            value={statement.operator}
            text={selOption.text}
        >
            <Dropdown.Menu>
                {options.map((iterOption, i) => {
                    const operatorEnum=i as eCustomComparisonOperator;
                    return (
                        <Dropdown.Item
                            text={iterOption.text}
                            description={iterOption.description}
                            key={i}
                            value={operatorEnum}
                            onClick={() => onClick(operatorEnum)}
                            active={operatorEnum === statement.operator}
                            selected={operatorEnum === statement.operator}
                        />
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

const ComparisonSpecificJsx = (
    tpStatement: TextParseStatement,
    SetStatement: (stmt: TextParseStatement) => void
): JSX.Element => {

    if(!tpStatement || !(tpStatement instanceof ComparisonStatement)) {
        return null;
    }

    const statement=tpStatement as ComparisonStatement;

    return (
        <Checkbox
            label="Not - invert the result (the current position will not be updated)"
            checked={statement.not}
            onChange={() => {

                const updated=statement.Copy(true) as ComparisonStatement;
                updated.not=!statement.not;

                SetStatement(updated);
            }}
        />
    );
};

const SetVariableInputCtrl: React.SFC<ITextParseProps & ISetVariableInputCtrlProps> = (props) => {

    const { SetStatement, updater, functions, fGetVariables, updatePending } = props;
    const statement = props.statement as SetVariableStatement;

    return (
        <>
            <Form.Field>
                <SelectVariableNameInputCtrl
                    statement={statement}
                    SetStatement={SetStatement}
                    updater={updater}
                />
            </Form.Field>

            <Form.Field>
                <ParseOperandDropdown
                    functions={functions}
                    fGetVariables={() => {
                        if(statement.variable)
                            return fGetVariables().filter(iterVar => !VariablesMatch(iterVar, statement.variable));
                        return fGetVariables();
                    }}
                    SetOperand={_oper => {
                        const updated=new SetVariableStatement(statement);
                        updated.operand=_oper;
                        SetStatement(updated);
                    }}
                    data={statement.operand}
                    name={`setvariableoperand`}
                    updater={updater}
                    updatePending={updatePending}
                    includeLength={false}
                    includeCurrentPosition={false}
                    placeholder="(Value to assign)..."
                    title="Please select what the variable should be assigned to"
                />
            </Form.Field>
        </>
    );

};