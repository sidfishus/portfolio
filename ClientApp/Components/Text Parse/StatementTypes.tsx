
import { SemanticICONS } from "semantic-ui-react";

export enum eStatementType {

    // String comparison
    String_Comp = 0,
    // Skip whitespace operation
    SkipWS_Op = 1,
    // Or comparison
    Or_Comp = 2,
    // Statement list
    StatementList_Comp=3,
    
    // Note: When adding new types don't forget to update 'StatementTypeInfo'

    // Note: Keep this as the last item because it's used to determine the number of statement types
    phCount = 4,
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
];

export interface ITextParseStatementState {
    statement: TextParseStatement;
    SetStatement: (input: TextParseStatement) => void;
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
    public abstract CanSave(): boolean;
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

    CanSave(): boolean {
        if(!StringComparisonStatement.ValidateStr(this)) {
            return false;
        }

        return true;
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
        
        if(!CanSave()) {
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

    //sidtodo: test with quotes in the string.
    //sidtodo: test with quotes in the name.
    GenerateCode(
        log: string,
        fAddStatement: (stmtCode: string) => string
    ): string {

        const { caseSensitive, str, name } = this;

        //TODO library function.
        const caseSensitiveStr= ((caseSensitive)?"true":"false");

        return fAddStatement(`new StringComparison(${log},new Options(${log}){CaseSensitive=${caseSensitiveStr}},"${str}","${name}")`);
    }
};

export class SkipWSStatement extends TextParseStatement {

    constructor(copy?: SkipWSStatement) {
        super(copy);
        if(!copy) {
            this.type=eStatementType.SkipWS_Op;
        }
    }

    CanSave(): boolean {
        return true;
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
        
        if(!CanSave()) {
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

        return
            `{
                var skipWS=new TokenComparison.SkipWhitespace(${log});
                skipWS.Name="${name}";
                ${fAddStatement("skipWS")}
            }`;
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

    CanSave(): boolean {
        // Must have at least 2 children
        const { children } = this;
        return children && children.length>1;
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

    CanSave(): boolean {
        // Must have at least 1 child
        const { children } = this;
        return children && children.length>0;
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