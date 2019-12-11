
export enum eStatementType {
    // String comparison
    String_Comp = 0,
    // Skip whitespace operation
    SkipWS_Op = 1,
};

// Parse statement base class
export abstract class TextParseStatement {
    public abstract CanSave(): boolean;
    public abstract TypeDescription(): string; // This is static but you can't use abstract and static together in TS
    public abstract Copy(): TextParseStatement;

    public type: eStatementType;
    public name: string;
    public description?: string;

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
        return this.str!=="";
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
        return "Skip Whitespace";
    }

    Copy(): SkipWSStatement {
        const copy=new SkipWSStatement(this);
        return copy;
    }
};