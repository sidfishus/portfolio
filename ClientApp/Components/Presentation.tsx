
import * as React from "react";
import { HEADING_COLOUR } from "../theme";
import { Segment, Label, Container, Modal } from "semantic-ui-react";
import { MatchMediaResult } from "../Library/MediaMatching";
import { eScreenResolution } from "./Client App";

export interface ICodeProps {
    children: React.ReactNode;
    inline?: boolean;
    mediaMatching?: MatchMediaResult;
};

const fCode_codeStyle = (props: ICodeProps) => {

    const { inline, mediaMatching } = props;

    let styles: any={
        backgroundColor: "whitesmoke"
    };

    if(!inline) {
        styles.padding="16px";
        styles.tabSize="3";

        if(mediaMatching) {
            const firstMatching=mediaMatching.FirstMatching();
            if(firstMatching === eScreenResolution.Mobile) {
                // Smaller font when viewed on a mobile
                styles.fontSize = "10px";
                styles.padding="1px";
                styles.tabSize="2";
                styles.lineHeight="12px";
            }
            else if(firstMatching === eScreenResolution.Tablet) {
                styles.fontSize = "12px";
                styles.padding="1em";
                styles.tabSize="3";
                styles.lineHeight="14px";
            }
        }
    }

    return styles;
};

//// Component for displaying code
export const Code: React.FunctionComponent<ICodeProps> = (props) => {

    const { children, inline } = props;

    if(inline) return <code style={fCode_codeStyle(props)}>{children}</code>;

    return (
        <pre style={fCode_codeStyle(props)}>
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

    //TODO use the nesting level - assumes max nesting level of 1.
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

export interface IFullScreenModalImageProps {
    open: boolean;
    src: string;
    fClose: () => void;
};

export const FullScreenModalImage: React.FunctionComponent<IFullScreenModalImageProps> = (props) => {

    const { open, src, fClose } = props;

    return (
        <Modal
            open={open}
            //size="fullscreen"
            style={{
                backgroundImage: `url(${src})`,
                width: "100%",
                height: "99%",
                marginTop: "-0.9%",

                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundColor: "rgba(0,0,0,.1)"
            }}
        >
            <a onClick={fClose} className="closeButton"></a>
            {/*<span style={{fontSize: "36", marginLeft: "98%", marginTop: "5%"}}>x</span>*/}
        </Modal>
    );
};