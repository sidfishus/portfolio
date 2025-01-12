
import * as React from "react";
import {useRef, useState} from "react";
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
    text: string;
};

export interface IPortfolioBaseProps extends IRoutedCompProps {
    writeUp: JSX.Element;
    carouselImgs: ICarouselImg[];
    additionalCarouselFileClass?: string; //sidtodo make this mandatory
    additionalThumbnailFileClass?: string;
};

interface IPortfolioCarouselProps {
    mainProps: IPortfolioBaseProps;
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
                            mainProps={props}
                            SetOpenImg={SetOpenImg}
                        />
                    </SegmentDemo>
                }
            </ContainerDemo>
        </>
    );
};

//sidtodo remove
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

//sidtodo remove
/*
overrideFileClass?: (isSelected: boolean) => string;
    overrideFileGridContainerClass?: string;
 */

const PortfolioCarousel = (props: IPortfolioCarouselProps) => {

    const { mainProps, SetOpenImg } = props;
    const { carouselImgs, additionalCarouselFileClass,additionalThumbnailFileClass } = mainProps;

    const [imageIndex, setImageIndex]=useState(0);

    const carouselRef=useRef<HTMLDivElement>(null);

    //sidtodo loading file URL

    //sidtodo can you stretch the mobile images?

    const getThumbnailFileClass = (isSelected: boolean) => (isSelected
        ? "CarouselThumbnailsSelectedFile " + additionalThumbnailFileClass
        : "CarouselThumbnailsFile " + additionalThumbnailFileClass);

    return (
        <>
            <Carousel
                files={carouselImgs} selectedId={carouselImgs[imageIndex].id} setSelectedFile={setImageIndex}
                shouldLoad={true} loadingFileUrl={"//sidtodo"} ref={carouselRef} onFileClick={idx => SetOpenImg(idx)}
                additionalFileClass={()=>additionalCarouselFileClass ?? ""}
                chevronUrl={CreateRepoUrl("img/blue-chevron-left.svg")}
            />

            <div style={{marginLeft: "-10px", marginRight: "-10px"}}>
                <FileGrid
                    files={carouselImgs.map(iterImg => iterImg.src)} selectedIndex={imageIndex}
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
    return (src: string, text: string): ICarouselImg => {
        id = id + 1n;
        return {
            src: src,
            id: id,
            text: text
        };
    };
})();