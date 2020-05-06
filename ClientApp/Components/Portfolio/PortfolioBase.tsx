
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { Container, Segment, Label } from "semantic-ui-react";
import { HEADING_COLOUR } from "../../theme";

export interface IPortfolioBaseProps extends IRoutedCompProps {
    aboutHeading: string;
    about: React.ReactNode;
};

export const PortfolioBase: React.SFC<IPortfolioBaseProps> = (props) => {

    const { aboutHeading, about } = props;

    return (
        <Container>
            <Segment padded>
                <Label color={HEADING_COLOUR} attached="top" content={aboutHeading} />
                {about}
            </Segment>
        </Container>
    );
};