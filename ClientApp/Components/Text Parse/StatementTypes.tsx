
import { SemanticICONS } from "semantic-ui-react";
import { EncodeString} from "./ExecuteParse";

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
    
    // Note: When adding new types don't forget to update 'StatementTypeInfo'

    // Note: Keep this as the last item because it's used to determine the number of statement types
    // In C++ you can assert this kind of thing statically at compile type
    phCount = 9,
};

// Information regarding the statement types
export interface IStatementTypeInfo {
    isComparison: boolean;
    comparisonOnlyChildren: boolean; // Can only have children which are comparison type statements?
};

// The index corresponds to the 'eStatementType' enum
export const StatementTypeInfo:IStatementTypeInfo[] = [

    //String_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
    },

    //SkipWS_Op
    {
        isComparison: false,
        comparisonOnlyChildren: false,
    },

    //Or_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: true,
    },

    //StatementList_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
    },

    // AdvanceToEnd_Op
    {
        isComparison: false,
        comparisonOnlyChildren: false,
    },

    //EndOfString_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
    },

    // StartOfString_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
    },

    // Capture_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false,
    },

    // IsWhitespace_Comp
    {
        isComparison: true,
        comparisonOnlyChildren: false
    }
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
const CanSaveUniqueName = (
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

// Parse statement base class
export abstract class TextParseStatement {

    public CanSave(
        stmtList: TextParseStatement[],
        checkChildren: boolean=true
    ): boolean {
        if(!checkChildren || CanSaveChildren(this.Children(),stmtList)) {
            if(!stmtList || CanSaveUniqueName(this, stmtList)) return true;
        }
        return false;
    }

    public abstract TypeDescription(): string; // This is static but you can't use abstract and static together in TS
    public abstract Copy(copyChildren: boolean): TextParseStatement;
    public abstract Description(): string;
    public abstract Icon(): SemanticICONS;
    public abstract Children(): TextParseStatement[] | null;
    public abstract SetChildren(children?: TextParseStatement[]): void;
    public abstract GenerateCode(log: string, fAddStatement: (stmtCode: string) => string): string; // 'log' is reserved in case in the future we decide to use it

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
};

export class StringComparisonStatement extends TextParseStatement {

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
        return "String Comparison";
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

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string
    ): string {

        const { caseSensitive, str, name } = this;

        //TODO library function.
        const caseSensitiveStr= ((caseSensitive)?"true":"false");

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
        return "Skip Whitespace Operation";
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
        fAddStatement: (stmtCode: string) => string
    ): string {

        const { name } = this;

        var code=
            `{
                var skipWS=TokenComparison.SkipWhitespace(${log});
                skipWS.Name="${name}";
                ${fAddStatement("skipWS")}
            }`;

        return code;
    }
};

export class OrComparisonStatement extends TextParseStatement {

    children: Array<TextParseStatement>;

    constructor(
        copy?: OrComparisonStatement,
        copyChildren: boolean=true) {

        super(copy, copyChildren);
        if(!copy) {

            this.type=eStatementType.Or_Comp;
            this.children = new Array<TextParseStatement>();
        }
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
        return "Or Comparison";
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
        return `orComp.Add(${code});`;
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string
    ): string {

        const {children, name}=this;

        let rv:string =
            `{
                var orComp=new OrComparison(${log});
                orComp.Name="${name}";
            `;

        for(let i=0;i<children.length;++i) {

            const iterChild=children[i];

            rv=rv.concat(iterChild.GenerateCode(log,this.AddStatement));
        }

        rv=rv.concat(
            `${fAddStatement("orComp")}
            }`);
        
        return rv;

    }
}

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
        return "Statement List";
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

    AddStatement(code: string): string {
        return `stmtListInner.Add(${code});`;
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string
    ): string {
        const {children, name}=this;

        let rv:string =
            `{
                var stmtListInner = new StatementList(${log});
                stmtListInner.Name="${name}";
            `;

        for(let i=0;i<children.length;++i) {

            const iterChild=children[i];

            rv=rv.concat(iterChild.GenerateCode(log,this.AddStatement));
        }

        rv=rv.concat(
            `${fAddStatement("stmtListInner")}
            }`);
        
        return rv;
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
        return "Advance to the End Operation";
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
        fAddStatement: (stmtCode: string) => string
    ): string {

        const { name } = this;

        var code=
            `{
                var advanceToEnd=new AdvanceToTheEnd(${log});
                advanceToEnd.Name="${name}";
                ${fAddStatement("advanceToEnd")}
            }`;

        return code;
    }
};

export class EndOfStringComparisonStatement extends TextParseStatement {

    constructor(copy?: EndOfStringComparisonStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.EndOfString_Comp;
        }
    }

    TypeDescription(): string {
        return "End of String Comparison";
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
        return "angle double right"; //sidtodo
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string
    ): string {

        const { name } = this;

        var code=
            `{
                var isEndOfStringComp=new IndexIsOffsetComparison(${log},(pos,str,depth,runState) => pos == str.Length);
                isEndOfStringComp.Name="${name}";
                ${fAddStatement("isEndOfStringComp")}
            }`;

        return code;
    }
};

export class StartOfStringComparisonStatement extends TextParseStatement {

    constructor(copy?: StartOfStringComparisonStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.StartOfString_Comp;
        }
    }

    TypeDescription(): string {
        return "Start of String Comparison";
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
        return "angle double right"; //sidtodo
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string
    ): string {

        const { name } = this;

        var code=
            `{
                var isStartOfStringComp=new IndexIsOffsetComparison(${log},(pos,str,depth,runState) => pos == 0);
                isStartOfStringComp.Name="${name}";
                ${fAddStatement("isStartOfStringComp")}
            }`;

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
        return "list ol"; //sidtodo
    }

    Children(): TextParseStatement[] | null {
        return this.children;
    }

    SetChildren(children?: TextParseStatement[]): void {
        this.children=children;
    }

    AddStatement(code: string): string {
        return `captureStmtList.Add(${code});`;
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string
    ): string {
        const {children, name}=this;

        let rv:string =
            `{
                var captureInner = new Capture(${log});
                captureInner.Name="${name}";
                ${fAddStatement("captureInner")}

                var captureStmtList=new StatementList(${log});
                captureInner.Comparison=captureStmtList;
                capturing.Add("${name}", captureInner);
                `;

        for(let i=0;i<children.length;++i) {

            const iterChild=children[i];

            rv=rv.concat(iterChild.GenerateCode(log,this.AddStatement));
        }

        rv=rv.concat(`
            }`);
        
        return rv;
    }
};

export class IsWhitespaceComparisonStatement extends TextParseStatement {

    constructor(copy?: IsWhitespaceComparisonStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.IsWhitespace_Comp;
        }
    }

    TypeDescription(): string {
        return "Is Whitespace Comparison";
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
        return "angle double right"; //sidtodo
    }

    Children(): TextParseStatement[] | null {
        return null;
    }

    SetChildren(children?: TextParseStatement[]): void {
    }

    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string
    ): string {

        const { name } = this;

        var code=
            `{
                var isWhitespaceComp=TokenComparison.IsWhitespace(${log});
                isWhitespaceComp.Name="${name}";
                ${fAddStatement("isWhitespaceComp")}
            }`;

        return code;
    }
};