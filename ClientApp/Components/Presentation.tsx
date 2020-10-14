
import * as React from "react";
import { HEADING_COLOUR } from "../theme";
import { Segment, Label, Container } from "semantic-ui-react";

export interface ICodeProps {
    children: React.ReactNode;
};

const Code_codeStyle = {
    backgroundColor: "whitesmoke",
    padding: "16px"
};

//// Component for displaying code
export const Code: React.FunctionComponent<ICodeProps> = (props) => {

    const { children } = props;

    return (
        <pre style={Code_codeStyle}>
            <code>
                {children}
            </code>
        </pre>
    );
};


export interface ISegmentDemoProps {
    children: React.ReactNode;
    heading: React.ReactNode;
};

export const SegmentDemo: React.FunctionComponent<ISegmentDemoProps> = (props) => {

    const { children, heading } = props;

    return (
        <>
            <Segment padded>
                <Label color={HEADING_COLOUR} attached="top" content={heading} />
                {children}
            </Segment>
        </>
    );
};

export interface IContainerDemoProps {
    children: React.ReactNode;
};

//// All pages should be wrapped by a container
export const ContainerDemo: React.FunctionComponent<IContainerDemoProps> = (props) => {
    return <Container>{props.children}</Container>
}

export interface ISegmentSubSection {
    heading?: string;
    children: React.ReactNode;
    nested?: number;
};

export const SegmentSubSection: React.FunctionComponent<ISegmentSubSection> = (props) => {

    const { heading, children, nested} = props;

    //sidtodo use the nesting level.
    const Heading = (): JSX.Element => {
        if(!heading) return null;
        if(nested===undefined || nested===null) return <h3>{heading}</h3>;
        return <h4>{heading}</h4>
    };

    return (
        <>
            {Heading()}
            {children}
        </>
    );
};