
import * as React from "react";
import {ReactNode, useRef, useState} from "react";
import { IRoutedCompProps } from "../../routes";
import { Table } from "semantic-ui-react";
import { SegmentDemo, ContainerDemo, FullScreenModalImage } from "../Presentation";
import {Carousel, CarouselFileDetails, ShowFileFromIndex} from "react-cscarousel";
import "react-cscarousel/styles.css";
import { FileGrid } from "react-csfilegrid";
import "react-csfilegrid/styles.css";
import "./Styles.scss";
import {CreateRepoUrl} from "../../CreateRepoUrl.ts";

export interface ICarouselImg extends CarouselFileDetails {
    text: ReactNode;
};

export interface IPortfolioBaseProps extends IRoutedCompProps {
    heading: JSX.Element|null;
    writeUp: JSX.Element;
    carouselImgs: ICarouselImg[];
    additionalCarouselFileClass?: string; //sidtodo make this mandatory
    additionalThumbnailFileClass?: string;
    thumbnailImgs?: string[];
};

interface IPortfolioCarouselProps {
    mainProps: IPortfolioBaseProps;
    SetOpenImg: (idx: number) => void;
};

export const PortfolioBase = (props: IPortfolioBaseProps) => {

    const [openImg, SetOpenImg] = useState<number|null>(null);

    const { writeUp, carouselImgs, heading } = props;

    return (
        <>
            <FullScreenModalImage
                open={openImg!==null}
                src={((openImg !== null)?props.carouselImgs[openImg].src : "")}
                fClose={()=>SetOpenImg(null)}
            />

            <ContainerDemo>
                {heading}

                {carouselImgs &&
                    <SegmentDemo heading="Images (click to view full screen)">
                        <PortfolioCarousel
                            mainProps={props}
                            SetOpenImg={SetOpenImg}
                        />
                    </SegmentDemo>
                }

                {writeUp}
            </ContainerDemo>
        </>
    );
};

const PortfolioCarousel = (props: IPortfolioCarouselProps) => {

    const { mainProps, SetOpenImg } = props;
    const { carouselImgs, additionalCarouselFileClass,additionalThumbnailFileClass } = mainProps;

    const [imageIndex, setImageIndex]=useState(0);

    const carouselRef=useRef<HTMLDivElement>(null);

    const thumbnails = mainProps.thumbnailImgs
        ? mainProps.thumbnailImgs
        : carouselImgs.map(iterImg => iterImg.src);

    const getThumbnailFileClass = (isSelected: boolean) => (isSelected
        ? "CarouselThumbnailsSelectedFile " + additionalThumbnailFileClass
        : "CarouselThumbnailsFile " + additionalThumbnailFileClass);

    return (
        <>
            <Carousel
                files={carouselImgs} selectedId={carouselImgs[imageIndex].id} setSelectedFile={setImageIndex}
                shouldLoad={true} loadingFileUrl={CreateRepoUrl("img/Spinner@1x-1.0s-200px-200px.svg")}
                ref={carouselRef} onFileClick={idx => SetOpenImg(idx)}
                additionalFileClass={()=>additionalCarouselFileClass ?? ""}
                chevronUrl={CreateRepoUrl("img/blue-chevron-left.svg")}
            />

            <div className={"CarouselImageText"}>
                {carouselImgs[imageIndex].text}
            </div>

            <div style={{marginLeft: "-10px", marginRight: "-10px"}}>
                <FileGrid
                    files={thumbnails} selectedIndex={imageIndex}
                    onClick={idx => ShowFileFromIndex(carouselRef.current!, idx, "smooth")}
                    overrideFileClass={getThumbnailFileClass}
                />
            </div>
        </>
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
    return (src: string, text: ReactNode, additionalClass?: string): ICarouselImg => {
        id = id + 1n;
        return {
            src: src,
            id: id,
            text: text,
            additionalClass: additionalClass
        };
    };
})();