
import { SemanticICONS } from "semantic-ui-react";
import { EncodeString} from "./ExecuteParse";
import { IsAlpha } from "../../Library/Misc";
import { IParseOperand, ParseOperandIsValid, ParseOperandCode, CopyParseOperand, ParseOperandMultipleCode } from "./Operands";
import { TextParseFunction, eCustomFunctionOperator } from "./CustomFunctions";
import { TextParseVariable, CopyTextParseVariable } from "./Variables";

const BooleanAsString = (bool: boolean) => ((bool)?"true":"false");

export enum eStatementType {

    // String comparison
    String_Comp = 0,
    // Skip whitespace operation
    SkipWS_Op = 1,
    // Or comparison
    Or_Comp = 2,
    // Statement list
    StatementList_Comp=3,
    // Advance until to the end operation
    AdvanceToEnd_Op=4,
    // End of string comparison
    EndOfString_Comp=5,
    // Start of string comparison
    StartOfString_Comp=6,
    // Capturing
    Capture_Comp=7,
    // Is white space comparison
    IsWhitespace_Comp=8,
    // String offset comparison
    StringOffset_Comp=9,
    // Store the current position in a variable
    StorePosAsVariable_Op=10,
    // Advance the current position
    Advance_Op=11,
    // Advance the current position one by one until a comparison matches
    AdvanceUntil_Comp=12,
    // Custom comparison
    CustomComparison=13,
    // Set variable
    SetVariable_Op=14,
    
    // Note: When adding new types don't forget to update 'StatementTypeInfo'

    // Note: Keep this as the last item because it's used to determine the number of statement types
    // In C++ you can assert this kind of thing statically at compile type
    phCount = 15,
};

// Information regarding the statement types
export interface IStatementTypeInfo {
    // False means it's an operation
    isComparison: boolean;
    // Can only have children which are comparison type statements? For e.g. an Or statement. This is only relevant
    // to statement types that have child statements
    comparisonOnlyChildren: boolean;
    // Is this a type of statement that deals with updating variables?
    isUpdateVariable: boolean;
};

// The index corresponds to the 'eStatementType' enum
export const StatementTypeInfo:IStatementTypeInfo[] = [

    //String_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
        isUpdateVariable: false
    },

    //SkipWS_Op
    {
        isComparison: false,
        comparisonOnlyChildren: false,
        isUpdateVariable: false
    },

    //Or_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: true,
        isUpdateVariable: false
    },

    //StatementList_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
        isUpdateVariable: false
    },

    // AdvanceToEnd_Op
    {
        isComparison: false,
        comparisonOnlyChildren: false,
        isUpdateVariable: false
    },

    //EndOfString_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
        isUpdateVariable: false
    },

    // StartOfString_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
        isUpdateVariable: false
    },

    // Capture_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
        isUpdateVariable: false
    },

    // IsWhitespace_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
        isUpdateVariable: false
    },

    // StringOffset_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
        isUpdateVariable: false
    },

    // StorePosAsVariable_Op
    {
        isComparison: false,
        comparisonOnlyChildren: false,
        isUpdateVariable: true
    },

    // Advance_Op
    {
        isComparison: false,
        comparisonOnlyChildren: false,
        isUpdateVariable: false
    },

    // AdvanceUntil_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
        isUpdateVariable: false
    },

    // CustomComparison
    {
        isComparison: true,
        comparisonOnlyChildren: false,
        isUpdateVariable: false
    },

    // SetVariable_Op
    {
        isComparison: false,
        comparisonOnlyChildren: false,
        isUpdateVariable: true
    },
];

export interface ITextParseStatementState {
    statement: TextParseStatement;
    SetStatement: (input: TextParseStatement) => void;
};

const CanSaveChildren = (
    children: TextParseStatement[],
    fullStmtList: TextParseStatement[]
): boolean => {

    if(!children) return true;
    const childThatCantSave=children.find(iterChild => !iterChild.CanSave(fullStmtList));

    return ((childThatCantSave)?false:true);
};

// Statement names must be unique.
// Returns true if this statement's name is unique across them all.
export const CanSaveUniqueName = (
    stmt: TextParseStatement,
    stmtList: TextParseStatement[]
): boolean => {

    const stmtNameLower=stmt.name.toLowerCase();

    const duplicateNameStmt: TextParseStatement= stmtList.find(iterStmt => {

        if(iterStmt.UID !== stmt.UID) {
            if(iterStmt.name.toLowerCase() === stmtNameLower) return true;
            if(iterStmt.Children() && !CanSaveUniqueName(stmt, iterStmt.Children())) return true;
        }
        return false;
    });

    return ((duplicateNameStmt)?false:true);
};

const NumberOfLevelsDeep = (iterChild: TextParseStatement,currentDepth: number): number => {

    const children=iterChild.Children();
    if(!children || children.length === 0) {
        return currentDepth;
    }

    let rv=currentDepth+1;
    children.forEach((iterChild) => {
        const iterNumberOfLevelsDeep=NumberOfLevelsDeep(iterChild,rv);

        if(iterNumberOfLevelsDeep>rv) {
            rv= iterNumberOfLevelsDeep;
        }
    });

    return rv;
};

// For want of a better name...
// When generating the text parse C# code, if a statement array contains multiple statements, create a text parse
// statement list incoorporating them and return the statement list. Otherwise return the single text parse
// statement as is
const CreateStatementListIfMultipleOtherwiseReturnSingle = (
    stmtList: Array<TextParseStatement>,
    fAddStatements: (code: string) => string,
    log: string,
    fGetVariables: () => TextParseVariable[],
    functions: TextParseFunction[],
    fGenerateVarName: () => string
) => {

    if(stmtList.length === 1)
        return stmtList[0].GenerateCode(log, fAddStatements, fGetVariables, functions, fGenerateVarName);

    const stmtListVarName=fGenerateVarName();
    const AddStmtToStmtList = CreateStatementListIfMultipleOtherwiseReturnSingle_AddStmt(stmtListVarName);

    let rv = `var ${stmtListVarName}=new StatementList(${log});`;
    stmtList.forEach(iterStmt => {
        rv=rv.concat(iterStmt.GenerateCode(log, AddStmtToStmtList, fGetVariables, functions, fGenerateVarName));
    });

    return `${rv}
        ${fAddStatements(stmtListVarName)}`;
};

const CreateStatementListIfMultipleOtherwiseReturnSingle_AddStmt = (
    varName: string
): (code: string) => string => {

    return (code) => {
        return `${varName}.Add(${code});`;
    }
};

//// Statement classes

// Parse statement base class
export abstract class TextParseStatement {

    public CanSave(
        stmtList: TextParseStatement[],
        checkChildren: boolean=true
    ): boolean { 

        if(!checkChildren || CanSaveChildren(this.Children(),stmtList)) {
            if(this.CanSaveName(stmtList)) return true;
        }
        return false;
    }

    public abstract TypeDescription(): string; // This is static but you can't use abstract and static together in TS
    public abstract Copy(copyChildren: boolean): TextParseStatement;
    public abstract Description(): string;
    public abstract Icon(): SemanticICONS;
    public abstract Children(): TextParseStatement[] | null;
    public abstract SetChildren(children?: TextParseStatement[]): void;
    public abstract GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string; // 'log' is reserved in case in the future we decide to use it

    public UID: number; // Unique ID to reference this statement / type
    public type: eStatementType;
    public name: string;
    public keyedDescription?: string;

    public static GetName(stmt: TextParseStatement): string {
        return stmt.name;
    }

    public static SetName(stmt: TextParseStatement, name: string): void {
        stmt.name=name;
    }

    public static GetKeyedDescription(stmt: TextParseStatement): string {
        return ((stmt.keyedDescription) ? stmt.keyedDescription : "");
    }

    public static SetKeyedDescription(stmt: TextParseStatement, description?: string): void {
        stmt.keyedDescription=description;
    }

    public Heading(): string {

        const { keyedDescription, name, Description } = this;

        if(keyedDescription) {
            return keyedDescription;
        }

        const description = Description();
        if(description) {
            return description;
        }

        return name;
    }

    constructor(
        copy?: TextParseStatement,
        copyChildren: boolean=false,
    ) {
        if(copy) {
            this.type=copy.type;
            this.name=copy.name;
            this.keyedDescription=copy.keyedDescription;
            this.UID=copy.UID;
            
            let initChildren=false;
            if(copyChildren) {
                const children=copy.Children();
                if(children) {
                    this.SetChildren(children.map(item => item.Copy(true)));
                    initChildren=true;
                }
            }
            
            if(!initChildren) {
                this.SetChildren(new Array<TextParseStatement>());
            }
        }
        else {
            this.name="";
            this.keyedDescription=null;
            this.UID=null;
        }

        this.Heading=this.Heading.bind(this);
        this.CanSave=this.CanSave.bind(this);
        this.TypeDescription=this.TypeDescription.bind(this);
        this.Copy=this.Copy.bind(this);
        this.Description=this.Description.bind(this);
        this.Icon=this.Icon.bind(this);
    }

    NumberOfLevelsDeep(): number {

        return NumberOfLevelsDeep(this,1);
    }

    CanSaveName(
        stmtList: TextParseStatement[]
    ): boolean {

        const { name } = this;

        if(name === null || name === "") return false;

        // Can't lead with a number
        if(name[0]>='0' && name[0]<='9')
            return false;

        // Invalid character?
        if(name.split("").find(iterChr => !IsAlpha(iterChr))) return false;

        if(!stmtList || CanSaveUniqueName(this, stmtList)) return true;

        return false;
    }
};

// Base class for general comparison types which require functionality such as 'not'. Most comparison classes will
// derive from this. Statement types such as capture and statement list feel like a bit of a grey area at the moment,
// I'll only add them if necessary
export abstract class ComparisonStatement extends TextParseStatement {

    public not: boolean; // Invert the result. I.e. if a comparison matches, make it non matching.

    constructor(
        copy?: ComparisonStatement,
        copyChildren: boolean=true
    ) {

        super(copy, copyChildren);

        this.GenerateCodeDerived = this.GenerateCodeDerived.bind(this);

        if(copy!=null) {
            this.not=copy.not;
        } else {
            this.not=false;
        }
    }

    // This doesn't feel like a great design but I can't think of another way without a lot of wholesale changes.
    // The idea is that comparison classes override the derived version so this base class can give all derived
    // comparison classes 'not' functionality (and in future we could add 'no advance' functionality too) for free
    // which requires overriding the code sent to the fAddStatement function.
    protected abstract GenerateCodeDerived(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string;

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string {

        const { GenerateCodeDerived, not } = this;

        let fOverrideAddStatement;
        if(not) {
            fOverrideAddStatement = (code:string) => fAddStatement(`new NotComparison(null,${code})`);
        } else {
            fOverrideAddStatement = fAddStatement;
        }

        return GenerateCodeDerived(log, fOverrideAddStatement, fGetVariables, functions, fGenerateVarName);
    }
}

export class StringComparisonStatement extends ComparisonStatement {

    public str: string;
    public caseSensitive: boolean;

    public static SetStr(stmt: StringComparisonStatement, str: string): void {
        stmt.str=str;
    }

    public static GetStr(stmt: StringComparisonStatement): string {
        return stmt.str;
    }

    public static ValidateStr(stmt: StringComparisonStatement): boolean {
        return (stmt.str !== null && stmt.str !== "");
    }

    constructor(
        copy?: StringComparisonStatement
    ) {
        super(copy);
        if(copy) {
            this.str=copy.str;
            this.caseSensitive=copy.caseSensitive;
        }
        else {
            this.type=eStatementType.String_Comp;
            this.str="";
            this.caseSensitive=true;
        }
    }

    CanSave(
        stmtList: TextParseStatement[],
        checkChildren=true
    ): boolean {
        if(!StringComparisonStatement.ValidateStr(this)) {
            return false;
        }

        return super.CanSave(stmtList, checkChildren);
    }

    TypeDescription(): string {
        return "StringComparison";
    }

    Copy(copyChildren: boolean): StringComparisonStatement {
        const copy=new StringComparisonStatement(this);
        return copy;
    }

    Description(): string {
        const { CanSave, str, caseSensitive} = this;
        
        if(!CanSave(null, false)) {
            return null;
        }

        return `Compare against string '${str}' (case ${((!caseSensitive)?"in":"")}sensitive)`;
    }

    Icon(): SemanticICONS {
        return "pencil";
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCodeDerived(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string {

        const { caseSensitive, str, name } = this;
        const caseSensitiveStr= BooleanAsString(caseSensitive);

        return fAddStatement(`new StringComparison(${log},new Options(${log}){CaseSensitive=${caseSensitiveStr}},${EncodeString(str)},"${name}")`);
    }
};

export class SkipWSStatement extends TextParseStatement {

    constructor(copy?: SkipWSStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.SkipWS_Op;
        }
    }

    CanSave(
        stmtList: TextParseStatement[],
        checkChildren=true
    ): boolean {
        return super.CanSave(stmtList, checkChildren);
    }

    TypeDescription(): string {
        return "SkipWhitespaceOperation";
    }

    Copy(copyChildren: boolean): SkipWSStatement {
        const copy=new SkipWSStatement(this);
        return copy;
    }

    Description(): string {
        const { CanSave } = this;
        
        if(!CanSave(null,false)) {
            return null;
        }

        return "Skip whitespace";
    }

    Icon(): SemanticICONS {
        return "angle double right";
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string {

        const { name } = this;

        var code=
            `{
                var ${name}=TokenComparison.SkipWhitespace(${log});
                ${name}.Name="${name}";
                ${fAddStatement(name)}
            }
            `;

        return code;
    }
};

export class OrComparisonStatement extends ComparisonStatement {

    children: Array<TextParseStatement>;

    constructor(
        copy?: OrComparisonStatement,
        copyChildren: boolean=true) {

        super(copy, copyChildren);
        if(!copy) {

            this.type=eStatementType.Or_Comp;
            this.children = new Array<TextParseStatement>();
        }

        this.AddStatement=this.AddStatement.bind(this);
    }

    CanSave(
        stmtList: TextParseStatement[],
        checkChildren=true
    ): boolean {
        // Must have at least 2 children
        const { children } = this;
        if(children && children.length>1) {
            return super.CanSave(stmtList, checkChildren);
        }

        return false;
    }

    TypeDescription(): string {
        return "OrComparison";
    }

    Copy(copyChildren: boolean): OrComparisonStatement {
        const copy=new OrComparisonStatement(this, copyChildren);
        return copy;
    }

    Description(): string {
        const { children } = this;

        return `Or statement consisting of ${children.length} comparison(s)`;
    }

    Icon(): SemanticICONS {
        return "unordered list";
    }

    Children(): TextParseStatement[] | null {
        return this.children;
    }

    SetChildren(children?: TextParseStatement[]): void {
        this.children=children;
    }

    AddStatement(code: string): string {
        const { name } = this;
        return `${name}.Add(${code});`;
    }

    GenerateCodeDerived(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string {

        const {children, name, AddStatement}=this;

        let rv:string =
            `{
                var ${name}=new OrComparison(${log});
                ${name}.Name="${name}";
            `;

        for(let i=0;i<children.length;++i) {

            const iterChild=children[i];

            rv=rv.concat(iterChild.GenerateCode(log,AddStatement, fGetVariables, functions, fGenerateVarName));
        }

        rv=rv.concat(
            `${fAddStatement(name)}
            }
            `);
        
        return rv;

    }
};

const CreateStatementListCode = (
    name: string,
    stmtList: TextParseStatement[],
    log: string,
    fGetVariables: () => TextParseVariable[],
    functions: TextParseFunction[],
    fGenerateVarName: () => string
): string => {

    const AddStatement = (code: string): string => {
        return `${name}.Add(${code});`;
    };

    let rv:string =
        `var ${name} = new StatementList(${log});
        ${name}.Name="${name}";
        `;

    for(let i=0;i<stmtList.length;++i) {

        const iterChild=stmtList[i];

        rv=rv.concat(iterChild.GenerateCode(log,AddStatement, fGetVariables, functions, fGenerateVarName));
    }

    return rv;
};

export class StatementListComparisonStatement extends TextParseStatement {

    children: Array<TextParseStatement>;

    constructor(
        copy?: StatementListComparisonStatement,
        copyChildren: boolean=true) {

        super(copy, copyChildren);
        if(!copy) {

            this.type=eStatementType.StatementList_Comp;
            this.children = new Array<TextParseStatement>();
        }
    }

    CanSave(
        stmtList: TextParseStatement[],
        checkChildren=true
    ): boolean {
        // Must have at least 1 child
        const { children } = this;
        if(children && children.length>0) {
            return super.CanSave(stmtList, checkChildren);
        }
        return false;
    }

    TypeDescription(): string {
        return "StatementList";
    }

    Copy(copyChildren: boolean): StatementListComparisonStatement {
        const copy=new StatementListComparisonStatement(this, copyChildren);
        return copy;
    }

    Description(): string {
        const { children } = this;

        return `Statement list consisting of ${children.length} statement(s)`;
    }

    Icon(): SemanticICONS {
        return "list ol";
    }

    Children(): TextParseStatement[] | null {
        return this.children;
    }

    SetChildren(children?: TextParseStatement[]): void {
        this.children=children;
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string {
        const {children, name}=this;

        const listCode=CreateStatementListCode(
            name,
            children,
            log,
            fGetVariables,
            functions,
            fGenerateVarName
        );

        return `${listCode}
            ${fAddStatement(name)}
            `;
    }
}

export class AdvanceToEndStatement extends TextParseStatement {

    constructor(copy?: AdvanceToEndStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.AdvanceToEnd_Op;
        }
    }

    TypeDescription(): string {
        return "AdvanceToTheEndOperation";
    }

    Copy(copyChildren: boolean): AdvanceToEndStatement {
        const copy=new AdvanceToEndStatement(this);
        return copy;
    }

    Description(): string {
        const { CanSave } = this;
        
        if(!CanSave(null, false)) {
            return null;
        }

        return "Advance to the end";
    }

    Icon(): SemanticICONS {
        return "angle double right";
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string {

        const { name } = this;

        var code=
            `{
                var ${name}=new AdvanceToTheEnd(${log});
                ${name}.Name="${name}";
                ${fAddStatement(name)}
            }
            `;

        return code;
    }
};

export class EndOfStringComparisonStatement extends ComparisonStatement {

    constructor(copy?: EndOfStringComparisonStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.EndOfString_Comp;
        }
    }

    TypeDescription(): string {
        return "EndOfStringComparison";
    }

    Copy(copyChildren: boolean): EndOfStringComparisonStatement {
        const copy=new EndOfStringComparisonStatement(this);
        return copy;
    }

    Description(): string {
        const { CanSave } = this;
        
        if(!CanSave(null, false)) {
            return null;
        }

        return "Compare against the end of the string";
    }

    Icon(): SemanticICONS {
        return "terminal";
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCodeDerived(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string {

        const { name } = this;

        var code=
            `{
                var ${name}=new IndexIsOffsetComparison(${log},(pos,str,depth,runState) => pos == str.Length);
                ${name}.Name="${name}";
                ${fAddStatement(name)}
            }
            `;

        return code;
    }
};

export class StartOfStringComparisonStatement extends ComparisonStatement {

    constructor(copy?: StartOfStringComparisonStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.StartOfString_Comp;
        }
    }

    TypeDescription(): string {
        return "StartOfStringComparison";
    }

    Copy(copyChildren: boolean): StartOfStringComparisonStatement {
        const copy=new StartOfStringComparisonStatement(this);
        return copy;
    }

    Description(): string {
        const { CanSave } = this;
        
        if(!CanSave(null, false)) {
            return null;
        }

        return "Validate that the position is at the beginning of the string.";
    }

    Icon(): SemanticICONS {
        return "pointing left";
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCodeDerived(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string {

        const { name } = this;

        var code=
            `{
                var ${name}=new IndexIsOffsetComparison(${log},(pos,str,depth,runState) => pos == 0);
                ${name}.Name="${name}";
                ${fAddStatement(name)}
            }
            `;

        return code;
    }
};

export class CaptureComparisonStatement extends TextParseStatement {

    children: Array<TextParseStatement>;

    constructor(
        copy?: StatementListComparisonStatement,
        copyChildren: boolean=true) {

        super(copy, copyChildren);
        if(!copy) {

            this.type=eStatementType.Capture_Comp;
            this.children = new Array<TextParseStatement>();
        }

        this.AddStatement=this.AddStatement.bind(this);
    }

    CanSave(
        stmtList: TextParseStatement[],
        checkChildren=true
    ): boolean {
        // Must have at least 1 child
        const { children } = this;
        if(children && children.length>0) {
            return super.CanSave(stmtList, checkChildren);
        }
        return false;
    }

    TypeDescription(): string {
        return "Capture";
    }

    Copy(copyChildren: boolean): CaptureComparisonStatement {
        const copy=new CaptureComparisonStatement(this, copyChildren);
        return copy;
    }

    Description(): string {
        const { children } = this;

        return `Capture statement consisting of ${children.length} statement(s)`;
    }

    Icon(): SemanticICONS {
        return "magnify";
    }

    Children(): TextParseStatement[] | null {
        return this.children;
    }

    SetChildren(children?: TextParseStatement[]): void {
        this.children=children;
    }

    AddStatement(code: string): string {
        const { name } = this;
        return `${name}.Add(${code});`;
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string {
        const {children, name, AddStatement}=this;

        const captureVarName=fGenerateVarName();

        let rv:string =
            `{
                var ${captureVarName} = new Capture(${log});
                ${captureVarName}.Name="${name}";
                ${fAddStatement(captureVarName)}

                var ${name}=new StatementList(${log});
                ${captureVarName}.Comparison=${name};
                capturing.Add("${name}", ${captureVarName});
                `;

        for(let i=0;i<children.length;++i) {

            const iterChild=children[i];

            rv=rv.concat(iterChild.GenerateCode(log, AddStatement, fGetVariables, functions, fGenerateVarName));
        }

        rv=rv.concat(`
            }
            `);
        
        return rv;
    }
};

export class IsWhitespaceComparisonStatement extends ComparisonStatement {

    constructor(copy?: IsWhitespaceComparisonStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.IsWhitespace_Comp;
        }
    }

    TypeDescription(): string {
        return "IsWhitespaceComparison";
    }

    Copy(copyChildren: boolean): IsWhitespaceComparisonStatement {
        const copy=new IsWhitespaceComparisonStatement(this);
        return copy;
    }

    Description(): string {
        const { CanSave } = this;
        
        if(!CanSave(null, false)) {
            return null;
        }

        return "Validate that the current text is white space.";
    }

    Icon(): SemanticICONS {
        return "window minimize outline";
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCodeDerived(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[]
    ): string {

        const { name } = this;

        var code=
            `{
                var ${name}=TokenComparison.IsWhitespace(${log});
                ${name}.Name="${name}";
                ${fAddStatement(name)}
            }
            `;

        return code;
    }
};

export class StringOffsetComparisonStatement extends ComparisonStatement {

    public length: IParseOperand;
    public caseSensitive: boolean;
    public offset: IParseOperand;
    public reverse: boolean;

    constructor(copy?: StringOffsetComparisonStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.StringOffset_Comp;
            this.length=null;
            this.caseSensitive=false;
            this.offset=null;
            this.reverse=false;
        }
        else {
            this.length=copy.length;
            this.caseSensitive=copy.caseSensitive;
            this.offset=copy.offset;
            this.reverse=copy.reverse;
        }
    }

    Copy(copyChildren: boolean): StringOffsetComparisonStatement {
        const copy=new StringOffsetComparisonStatement(this);
        return copy;
    }

    TypeDescription(): string {
        return "StringOffsetComparison";
    }

    CanSave(
        stmtList: TextParseStatement[],
        checkChildren=true
    ): boolean {

        if(!ParseOperandIsValid(this.offset) || !ParseOperandIsValid(this.length))
            return false;

        return super.CanSave(stmtList, checkChildren);
    }

    // Just specify the name or the keyed description
    Description(): string {
        return null;
    }

    Icon(): SemanticICONS {
        return "sign in";
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCodeDerived(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[]
    ): string {

        const {caseSensitive,reverse,length,offset}=this;

        const caseSensitiveStr= BooleanAsString(caseSensitive);

        return fAddStatement(
            `new StringOffsetComparison(
                ${log},
                new Options(${log}){CaseSensitive=${caseSensitiveStr}},
                ${ParseOperandCode(length,fGetVariables,functions)},
                ${ParseOperandCode(offset,fGetVariables,functions)},
                ${reverse}
            )`);
    }
};

export abstract class SetVariableStatementBase extends TextParseStatement {

    public variable: TextParseVariable;

    constructor(copy?: SetVariableStatementBase) {
        super(copy);
        if(!copy) {
            this.variable=null;
        }
        else {
            this.variable=CopyTextParseVariable(copy.variable);
        }
    }

    public static SetVarName(stmt: SetVariableStatementBase, varName: string): void {
        stmt.variable={
            ...stmt.variable,
            name: varName
        };
    }

    public static GetVarName(stmt: SetVariableStatementBase): string {
        return stmt.variable?.name;
    }

    public static ValidateVarName(stmt: SetVariableStatementBase): boolean {
        return (
            stmt.variable !== null &&
            stmt.variable.name !== null &&
            stmt.variable.name !== ""
        );
    }

    CanSave(
        stmtList: TextParseStatement[],
        checkChildren=true
    ): boolean {

        if(!SetVariableStatementBase.ValidateVarName(this)) return false;

        return super.CanSave(stmtList, checkChildren);
    }
};

export class StorePosAsVariableStatement extends SetVariableStatementBase {

    constructor(copy?: StorePosAsVariableStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.StorePosAsVariable_Op;
        }
    }

    Copy(copyChildren: boolean): StorePosAsVariableStatement {
        const copy=new StorePosAsVariableStatement(this);
        return copy;
    }

    TypeDescription(): string {
        return "StoreCurrentPosition";
    }

    Description(): string {
        const { CanSave, variable } = this;
        
        if(!CanSave(null, false)) {
            return null;
        }

        return `Store the current position in a variable named '${variable.name}'`;
    }

    Icon(): SemanticICONS {
        return "thumbtack";
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[]
    ): string {

        const { variable, name } = this;

        return `{
            var ${name}=new StorePosAsVariable(${log}, ${EncodeString(variable.name)});
            ${name}.Name=${EncodeString(name)};
            ${fAddStatement(name)}
        }
        `;
    }
};

export class AdvanceStatement extends TextParseStatement {

    public advanceWhere: IParseOperand;

    constructor(copy?: AdvanceStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.Advance_Op;
        }
    }

    Copy(copyChildren: boolean): AdvanceStatement {
        const copy=new AdvanceStatement(this);
        return copy;
    }

    TypeDescription(): string {
        return "Advance";
    }

    Description(): string {
        const { CanSave } = this;
        
        if(!CanSave(null, false)) {
            return null;
        }

        return "Advance";
    }

    Icon(): SemanticICONS {
        return "step forward";
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[]
    ): string {

        const { name, advanceWhere } = this;

        return `{
            var ${name}=new Advance(${log}, ${ParseOperandCode(advanceWhere, fGetVariables, functions)});
            ${name}.Name=${EncodeString(name)};
            ${fAddStatement(name)}
        }
        `;
    }
};

export class AdvanceUntilComparisonStatement extends TextParseStatement {

    children: Array<TextParseStatement>;
    forwards: boolean; // I.e. the direction in which to move

    constructor(
        copy?: AdvanceUntilComparisonStatement,
        copyChildren: boolean=true) {

        super(copy, copyChildren);
        if(!copy) {

            this.type=eStatementType.AdvanceUntil_Comp;
            this.children = new Array<TextParseStatement>();
        }
    }

    CanSave(
        stmtList: TextParseStatement[],
        checkChildren=true
    ): boolean {
        // Must have at least 1 child
        const { children } = this;
        if(children && children.length>0) {
            return super.CanSave(stmtList, checkChildren);
        }

        return false;
    }

    TypeDescription(): string {
        return "AdvanceUntilComparison";
    }

    Copy(copyChildren: boolean): AdvanceUntilComparisonStatement {
        const copy=new AdvanceUntilComparisonStatement(this, copyChildren);
        return copy;
    }

    Description(): string {

        return "Advance until comparison";
    }

    Icon(): SemanticICONS {
        return "unordered list";
    }

    Children(): TextParseStatement[] | null {
        return this.children;
    }

    SetChildren(children?: TextParseStatement[]): void {
        this.children=children;
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string {

        const {children, name, forwards}=this;

        const AddComparison = (compCodeString: string): string => {
            const code: string=`var ${name}=new AdvanceUntilComparison(${log}, ${compCodeString}, ${BooleanAsString(forwards)});
            ${name}.Name=${EncodeString(name)};
            ${fAddStatement(name)}`;

            return code;
        };

        const code = CreateStatementListIfMultipleOtherwiseReturnSingle(
            children,
            AddComparison,
            log,
            fGetVariables,
            functions,
            fGenerateVarName);
        return code;
    }
};

export enum eCustomComparisonOperator {
    equals=0,               // ==
    notEquals=1,            // !=
    lessThan=2,             // <
    lesserEqual=3,          // <=
    greaterThan=4,          // >
    greaterEquals=5,        // >=
};

export class CustomComparisonStatement extends TextParseStatement {

    public leftHandOperand: IParseOperand;
    public operator: eCustomComparisonOperator;
    public rightHandOperand: IParseOperand;

    constructor(
        copy?: CustomComparisonStatement) {

        super(copy);
        this.type=eStatementType.CustomComparison;

        if(!copy) {
            this.leftHandOperand=null;
            this.rightHandOperand=null;
            this.operator=eCustomComparisonOperator.equals;
        }
        else {
            this.leftHandOperand=CopyParseOperand(copy.leftHandOperand);
            this.rightHandOperand=CopyParseOperand(copy.rightHandOperand);
            this.operator=copy.operator;
        }
    }

    CanSave(
        stmtList: TextParseStatement[],
        checkChildren=true
    ): boolean {
        const { leftHandOperand, rightHandOperand} = this;

        if(!leftHandOperand || !rightHandOperand) return false;

        return super.CanSave(stmtList, checkChildren);
    }

    TypeDescription(): string {
        return "CustomComparison";
    }

    Copy(copyChildren: boolean): CustomComparisonStatement {
        const copy=new CustomComparisonStatement(this);
        return copy;
    }

    Description(): string {

        return "Custom comparison";
    }

    Icon(): SemanticICONS {
        return "code";
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[],
        fGenerateVarName: () => string
    ): string {

        const { leftHandOperand, rightHandOperand, operator, name } = this;

        const leftOperandCode=ParseOperandMultipleCode(leftHandOperand,fGetVariables,functions, "pos", "str", "rs");
        const rightOperandCode=ParseOperandMultipleCode(rightHandOperand,fGetVariables,functions, "pos", "str", "rs");

        const operatorCode=CustomComparisonOperatorCode(operator);

        const fCustomComparisonCode =
            `(int pos, string str, RunState rs) => ${leftOperandCode} ${operatorCode} ${rightOperandCode}`;

        const code=`var ${name} = new CustomComparison(${log}, ${fCustomComparisonCode});
            ${name}.Name=${EncodeString(name)};
            ${fAddStatement(name)}
            `;
        return code;
    }
};

// Returns the equivalent C# code
const CustomComparisonOperatorCode = (operator: eCustomComparisonOperator): string => {
    switch(operator) {
        case eCustomComparisonOperator.equals:
            return "==";

        case eCustomComparisonOperator.notEquals:
            return "!=";

        case eCustomComparisonOperator.lessThan:
            return "<";

        case eCustomComparisonOperator.lesserEqual:
            return "<=";

        case eCustomComparisonOperator.greaterThan:
            return ">";

        case eCustomComparisonOperator.greaterEquals:
            return ">=";
    }
};

export class SetVariableStatement extends SetVariableStatementBase {

    public operand: IParseOperand;

    constructor(copy?: SetVariableStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.SetVariable_Op;
            this.operand=null;
        } else {
            this.operand=copy.operand;
        }
    }

    Copy(copyChildren: boolean): SetVariableStatement {
        const copy=new SetVariableStatement(this);
        return copy;
    }

    TypeDescription(): string {
        return "SetVariable";
    }

    Description(): string {
        const { CanSave, variable } = this;
        
        if(!CanSave(null, false)) {
            return null;
        }

        return `Assign a variable named '${variable.name}'`;
    }

    Icon(): SemanticICONS {
        return "save";
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    CanSave(
        stmtList: TextParseStatement[],
        checkChildren=true
    ): boolean {
        const { operand} = this;

        if(!operand) return false;

        return super.CanSave(stmtList, checkChildren);
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string,
        fGetVariables: () => TextParseVariable[],
        functions: TextParseFunction[]
    ): string {

        const { variable, name, operand } = this;

        return `{
            var ${name}=new SetVariable(${log}, ${EncodeString(variable.name)}, ${ParseOperandCode(operand,fGetVariables,functions)});
            ${name}.Name=${EncodeString(name)};
            ${fAddStatement(name)}
        }
        `;
    }
};