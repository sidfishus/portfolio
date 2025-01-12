
import * as React from "react";
import {useRef, useState} from "react";
import { IRoutedCompProps } from "../../routes";
import { Table } from "semantic-ui-react";
import { SegmentDemo, ContainerDemo, FullScreenModalImage } from "../Presentation";
import { Carousel, CarouselFileDetails} from "react-cscarousel";
import "react-cscarousel/styles.css";
import { FileGrid } from "react-csfilegrid";
import "react-csfilegrid/styles.css";

export interface ICarouselImg extends CarouselFileDetails {
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

export const PortfolioBase = (props: IPortfolioBaseProps) => {

    const [openImg, SetOpenImg] = useState<number|null>(null);

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

/*
files: FILE_T[];
    selectedId: bigint | null;
    setSelectedFile: SetSelectedFileFunc<FILE_T>;
    fileDir?: string;
    autoChangeMs?: number;
    loadFileOverride?: (url: string) => Promise<string>;
    shouldLoad: boolean;
    autoLoadLeftAndRightFiles?: boolean;
    additionalFileClass?: (isLoading: boolean) => string;
    additionalFileContainerClass?: string;
    loadingFileUrl: string;
    chevronUrl?: string;
    overrideLeftChevronClass?: string;
    overrideRightChevronClass?: string;
    onFileClick?: (idx: number, file: FILE_T) => void;
 */

const PortfolioCarousel = (props: IPortfolioCarouselProps) => {

    const { imgs, SetOpenImg } = props;

    const [imageIndex, setImageIndex]=useState(0);

    const carouselRef=useRef<HTMLDivElement>(null);

    //sidtodo loading file URL

    //sidtodo thumbnails.

    return (
        <>
            <Carousel
                files={imgs} selectedId={imgs[imageIndex].id} setSelectedFile={setImageIndex} shouldLoad={true}
                loadingFileUrl={"//sidtodo"} ref={carouselRef} onFileClick={idx => SetOpenImg(idx)}
            />

            <FileGrid
                files={imgs.map(iterImg => iterImg.src)} selectedIndex={imageIndex}
            />
        </>
    );

    /*return (
        <Carousel
            showArrows={true}
            infiniteLoop={true}
            useKeyboardArrows={true}
            onClickItem={(index: number, _: React.ReactNode)=>{
                SetOpenImg(index);
            }}
        >
            {imgs.map((iterImg, i) => CarouselImgJSX(iterImg, i))}
        </Carousel>
    );*/
};

// You cannot use a React component for this, you get the following error:
// "No images found! Can't build the thumb list without images. If you don't need thumbs, set showThumbs={false} in
//  the Carousel. Note that it's not possible to get images rendered inside custom components"
const CarouselImgJSX: any = (img: ICarouselImg, imgIdx: number) => {

    /*
    const divStyle: React.CSSProperties = {
        width: "fit-content",
        height: "fit-content",
        //objectFit: "cover",


        backgroundSize: "cover",
        //backgroundRepeat: "no-repeat",
        margin: "auto",

        backgroundPosition: "bottom",
    };

    return (
        <div key={`img-${imgIdx}`} style={divStyle}>
            <img src={img.src} />
            <p className="legend">{img.text}</p>
        </div>
    );

     */

    //sidtodo try setting properties on the img directly.
    const imgStyle: React.CSSProperties = {
        objectFit: "contain",
    };

    return (
        <div key={`img-${imgIdx}`} style={{backgroundColor: "red"}}>
            <img src={img.src} style={imgStyle} />
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

export const CreateImage = (() => {
    let id: bigint=0n;
    return (src: string, text: string): ICarouselImg => {
        id = id + 1n;
        return {
            src: src,
            id: id,
            text: text
        };
    };
})();