
import React, {useState} from "react";
import { Dropdown, Label, Form, Segment, Header, Container } from "semantic-ui-react";

enum eStatementType {
    String_Comp = 0,
    SkipWS_Op = 1,
};

type ITextParseProps = {
};

type ITypeDropdownProps = {
    selectedStatementType: eStatementType;
    setSelectedStatementType: (type?: eStatementType) => void;
};

type ITypeExplanationProps = {
    selectedStatementType: eStatementType;
};

export const TextParse: React.FunctionComponent<ITextParseProps> = (props: ITextParseProps) => {

    const [selectedStatementType, setSelectedStatementType] = useState(null);

    return (
        <Container>
            <Form>
                <Segment padded>
                    <Label attached="top">Add New Parse Statement</Label>
                    <Form.Field>

                        <TypeDropdown
                            {...props}
                            selectedStatementType={selectedStatementType}
                            setSelectedStatementType={setSelectedStatementType}
                        />

                        <br />

                        <TypeExplanation
                            {...props}
                            selectedStatementType={selectedStatementType}
                        />
                    </Form.Field>
                </Segment>
            </Form>
        </Container>
    );
};

const TypeDropdown: React.FunctionComponent<ITextParseProps & ITypeDropdownProps> = (props: ITextParseProps & ITypeDropdownProps) => {

    const options = [
        {
            key: eStatementType.String_Comp,
            text: "String comparison",
            value: eStatementType.String_Comp
        },

        {
            key: eStatementType.SkipWS_Op,
            text: "Skip whitespace",
            value: eStatementType.SkipWS_Op
        }
    ];

    let additionalProps = {};
    if(props.selectedStatementType !== null) {
        additionalProps = {
            value: props.selectedStatementType
        };
    }

    return (
        <Dropdown
            options={options}
            placeholder={"Statement Type"}
            onChange={(e,value) => props.setSelectedStatementType(value.value as number)}
            {...additionalProps}
        />
    );
};

const TypeExplanation: React.FunctionComponent<ITextParseProps & ITypeExplanationProps> = (props: ITextParseProps & ITypeExplanationProps) => {

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
    }

    return (
        <Label pointing>
            {text}
        </Label>
    );
};