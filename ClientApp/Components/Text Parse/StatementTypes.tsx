
export enum eStatementType {
    // String comparison
    String_Comp = 0,
    // Skip whitespace operation
    SkipWS_Op = 1,

    // Keep this as the last item
    phCount = 2,
};

export interface ITextParseStatementState {
    statement: TextParseStatement;
    SetStatement: (input: TextParseStatement) => void;
};

// Parse statement base class
export abstract class TextParseStatement {
    public abstract CanSave(): boolean;
    public abstract TypeDescription(): string; // This is static but you can't use abstract and static together in TS
    public abstract Copy(): TextParseStatement;

    public type: eStatementType;
    public name: string;
    public description?: string;

    public static GetName(stmt: TextParseStatement): string {
        return stmt.name;
    }

    public static SetName(stmt: TextParseStatement, name: string): void {
        stmt.name=name;
    }

    public static GetDescription(stmt: TextParseStatement): string | null {
        return stmt.description;
    }

    public static SetDescription(stmt: TextParseStatement, description?: string): void {
        stmt.description=description;
    }

    constructor(copy?: TextParseStatement) {
        if(copy) {
            this.type=copy.type;
            this.name=copy.name;
            this.description=copy.description;
        }
        else {
            this.name="";
            this.description=null;
        }
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

    constructor(copy?: StringComparisonStatement) {
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

    Copy(): StringComparisonStatement {
        const copy=new StringComparisonStatement(this);
        return copy;
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

    Copy(): SkipWSStatement {
        const copy=new SkipWSStatement(this);
        return copy;
    }
};