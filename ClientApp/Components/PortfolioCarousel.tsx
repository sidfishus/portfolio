import {useRef, useState} from "react";
import {Carousel, ShowFileFromIndex} from "react-cscarousel";
import {CreateRepoUrl} from "../CreateRepoUrl.ts";
import {FileGrid} from "react-csfilegrid";
import * as React from "react";
import {ICarouselImg, IPortfolioBaseProps} from "./Portfolio/PortfolioBase.tsx";

interface IPortfolioCarouselProps {
    SetOpenImg?: (idx: number) => void;
    carouselImgs: ICarouselImg[];
    additionalCarouselFileClass?: string;
    additionalThumbnailFileClass?: string;
    thumbnailImgs?: string[];
    showThumbnails: boolean;
    autoChangeMs?: number;
    showChevrons?: boolean;
};

export const PortfolioCarousel = (props: IPortfolioCarouselProps) => {

    const { SetOpenImg, carouselImgs, additionalCarouselFileClass,additionalThumbnailFileClass, showThumbnails,
        autoChangeMs, showChevrons } = props;

    const [imageIndex, setImageIndex]=useState(0);

    const carouselRef=useRef<HTMLDivElement>(null);

    const thumbnails = props.thumbnailImgs
        ? props.thumbnailImgs
        : carouselImgs.map(iterImg => iterImg.src);

    const getThumbnailFileClass = (isSelected: boolean) => (isSelected
        ? "CarouselThumbnailsSelectedFile " + additionalThumbnailFileClass
        : "CarouselThumbnailsFile " + additionalThumbnailFileClass);

    return (
        <>
            <Carousel
                files={carouselImgs} selectedId={carouselImgs[imageIndex].id} setSelectedFile={setImageIndex}
                shouldLoad={true} loadingFileUrl={CreateRepoUrl("img/Spinner@1x-1.0s-200px-200px.svg")}
                ref={carouselRef} onFileClick={(SetOpenImg ? (idx => SetOpenImg(idx)) : undefined)}
                additionalFileContainerClass={"PortfolioCarouselContainer"}
                additionalFileClass={()=>additionalCarouselFileClass ?? ""}
                chevronUrl={(showChevrons === false ? undefined : CreateRepoUrl("img/blue-chevron-left.svg"))}
                autoChangeMs={autoChangeMs} overrideLeftChevronClass={"PortfolioCarouselChevronLeft"}
                overrideRightChevronClass={"PortfolioCarouselChevronRight"}
            />

            <div className={"CarouselImageText"}>
                {carouselImgs[imageIndex].text}
            </div>

            {showThumbnails &&
                <div style={{marginLeft: "-10px", marginRight: "-10px"}}>
                    <FileGrid
                        files={thumbnails} selectedIndex={imageIndex}
                        onClick={idx => ShowFileFromIndex(carouselRef.current!, idx, "smooth")}
                        overrideFileClass={getThumbnailFileClass}
                    />
                </div>
            }
        </>
    );
};