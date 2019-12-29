
import { SemanticICONS } from "semantic-ui-react";

export enum eStatementType {

    // String comparison
    String_Comp = 0,
    // Skip whitespace operation
    SkipWS_Op = 1,
    // Or comparison
    Or_Comp = 2,

    // Keep this as the last item because it's used to determine the number of statement types
    phCount = 3,
};

export interface ITextParseStatementState {
    statement: TextParseStatement;
    SetStatement: (input: TextParseStatement) => void;
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
            
            if(copyChildren) {
                const children=copy.Children();
                if(children) this.SetChildren(children.map(item => item.Copy(true)));
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
        const { CanSave } = this;
        
        if(!CanSave()) {
            return null;
        }

        return "Or Comparison"; //sidtodo
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
}