
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { Container, Segment, Label, Table } from "semantic-ui-react";
import { HEADING_COLOUR } from "../../theme";
import { Carousel } from "react-responsive-carousel";

export interface ICarouselImg {
    src: string;
    text: string;
};

export interface IPortfolioBaseProps extends IRoutedCompProps {
    aboutHeading: string;
    about: React.ReactNode;
    carouselImgs: ICarouselImg[];
};

interface IPortfolioCarouselProps {
    imgs: ICarouselImg[];
};

export const PortfolioBase: React.SFC<IPortfolioBaseProps> = (props) => {

    const { aboutHeading, about, carouselImgs } = props;

    return (
        <Container>
            <Segment padded>
                <Label color={HEADING_COLOUR} attached="top" content={aboutHeading} />
                {about}
            </Segment>

            {carouselImgs &&
                <Segment padded>
                    <Label color={HEADING_COLOUR} attached="top" content="Images" />
                    <PortfolioCarousel
                        imgs={carouselImgs}
                    />
                </Segment>
            }
        </Container>
    );
};

const PortfolioCarousel: React.SFC<IPortfolioCarouselProps> = (props) => {

    const { imgs } = props;

    //sidtodo change width for different screen size

    return (
        <Carousel
            showArrows={true}
            width={700}
            infiniteLoop={true}
            useKeyboardArrows={true}
        >
            {imgs.map((iterImg, i) => CarouselImgJSX(iterImg, i))}
        </Carousel>
    );
};

// You cannot use a React component for this, you get the following error:
// "No images found! Can't build the thumb list without images. If you don't need thumbs, set showThumbs={false} in
//  the Carousel. Note that it's not possible to get images rendered inside custom components"
const CarouselImgJSX: any = (img: ICarouselImg, imgIdx: number) => {

    // Credits to 'https://stackoverflow.com/questions/11757537/css-image-size-how-to-fill-not-stretch/43001159' for this.
    // It centers images that are too small to fit with the rest of the images, the key part is the 'background size'.
    // const divStyle: React.CSSProperties = {
    //     width: 700,
    //     height: 394,
    //     backgroundSize: "cover",
    //     backgroundRepeat: "no-repeat",
    //     backgroundPosition: "50% 50%",
    //     margin: "auto",
    // };

    return (
        <div key={`img-${imgIdx}`} >
            <img src={img.src} />
            <p className="legend">{img.text}</p>
        </div>
    );
};

export interface ITechnologyInfo {
    name: JSX.Element;
    descr: JSX.Element;
};

const TechnologyTableRow = (info: ITechnologyInfo): JSX.Element => {

    return (
        <Table.Row>
            <Table.Cell>{info.name}</Table.Cell>
            <Table.Cell>{info.descr}</Table.Cell>
        </Table.Row>
    );
};

export const TechnologyTable = (infoList: ITechnologyInfo[]): JSX.Element => {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Technology</Table.HeaderCell>
                    <Table.HeaderCell>Purpose</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {infoList.map(TechnologyTableRow)}
            </Table.Body>
        </Table>
    );
}