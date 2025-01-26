
import * as React from "react";
import {ReactNode, useState} from "react";
import { IRoutedCompProps } from "../../routes";
import { Table } from "semantic-ui-react";
import { SegmentDemo, ContainerDemo, FullScreenModalImage } from "../Presentation";
import "react-cscarousel/styles.css";
import "react-csfilegrid/styles.css";
import "../CarouselStyles.scss";
import {ICarouselImg, PortfolioCarousel} from "../PortfolioCarousel.tsx";

export interface IPortfolioBaseProps extends IRoutedCompProps {
    heading: JSX.Element|null;
    writeUp: JSX.Element;
    carouselImgs: ICarouselImg[];
    additionalCarouselFileClass?: string;
    additionalThumbnailFileClass?: string;
    thumbnailImgs?: string[];
};

export const PortfolioBase = (props: IPortfolioBaseProps) => {

    const [openImg, SetOpenImg] = useState<number|null>(null);

    const { writeUp, carouselImgs, heading,additionalCarouselFileClass, additionalThumbnailFileClass,
        thumbnailImgs } = props;

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
                            SetOpenImg={SetOpenImg}
                            carouselImgs={carouselImgs}
                            additionalCarouselFileClass={additionalCarouselFileClass}
                            additionalThumbnailFileClass={additionalThumbnailFileClass}
                            thumbnailImgs={thumbnailImgs}
                            showThumbnails={true}
                        />
                    </SegmentDemo>
                }

                {writeUp}
            </ContainerDemo>
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
    return (src: string, text: ReactNode, additionalClass?: string, url?: string): ICarouselImg => {
        id = id + 1n;
        return {
            src: src,
            id: id,
            text: text,
            additionalClass: additionalClass,
            url: url
        };
    };
})();