
import * as React from "react";
import { useState } from "react";
import { IRoutedCompProps } from "../../routes";
import { Table, Modal, Image } from "semantic-ui-react";
import { Carousel } from "react-responsive-carousel";
import { SegmentDemo, ContainerDemo, FullScreenModalImage } from "../Presentation";

export interface ICarouselImg {
    src: string;
    text: string;
};

export interface IPortfolioBaseProps extends IRoutedCompProps {
    writeUp: JSX.Element;
    carouselImgs: ICarouselImg[];
};

interface IPortfolioCarouselProps {
    imgs: ICarouselImg[];
    SetOpenImg: (idx: number) => void;
};

export const PortfolioBase: React.FunctionComponent<IPortfolioBaseProps> = (props) => {

    const [openImg, SetOpenImg] = useState<number>(null);

    const { writeUp, carouselImgs } = props;

    return (
        <>
            <FullScreenModalImage
                open={openImg!==null}
                src={((openImg !== null)?props.carouselImgs[openImg].src : "")}
                fClose={()=>SetOpenImg(null)}
            />

            <ContainerDemo>
                {writeUp}

                {carouselImgs &&
                    <SegmentDemo heading="Images (click to view full screen)">
                        <PortfolioCarousel
                            imgs={carouselImgs}
                            SetOpenImg={SetOpenImg}
                        />
                    </SegmentDemo>
                }
            </ContainerDemo>
        </>
    );
};

const PortfolioCarousel: React.SFC<IPortfolioCarouselProps> = (props) => {

    const { imgs, SetOpenImg } = props;

    return (
        <Carousel
            showArrows={true}
            infiniteLoop={true}
            useKeyboardArrows={true}
            onClickItem={(index: number, item: React.ReactNode)=>{
                SetOpenImg(index);
            }}
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

const TechnologyTableRow = (info: ITechnologyInfo, idx: number): JSX.Element => {

    return (
        <Table.Row key={idx}>
            <Table.Cell>{info.name}</Table.Cell>
            <Table.Cell>{info.descr}</Table.Cell>
        </Table.Row>
    );
};

export const TechnologyTable = (infoList: ITechnologyInfo[]): JSX.Element => {
    return (
        <Table compact>
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

export const CreateRepoUrl = (url: string): string => {

    return `https://github.com/sidfishus/react-spa-demo/blob/master/${url}?raw=true`;
}