
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { Container, Segment, Label, Table } from "semantic-ui-react";
import { HEADING_COLOUR } from "../../theme";
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import { Code, SegmentDemo, ContainerDemo, SegmentSubSection } from "../Presentation";
import { MatchMediaResult } from "../../Library/MediaMatching";
import { eScreenResolution } from "../Client App";
import { CalcDurationYears } from "../../Library/DateTime";
import {PortfolioCarousel} from "../PortfolioCarousel.tsx";
import {CreateImage, ICarouselImg} from "../Portfolio/PortfolioBase.tsx";
import {CreateRepoUrl} from "../../CreateRepoUrl.ts";
import "./Styles.scss";

interface IHomeProps extends IRoutedCompProps {
};

const CreateCarouselImage = (src: string, link: string, text: string) => {

    return CreateImage(src,
        <Link className="boldLink" to={link} style={{position: "relative"}}>
            <img src={"/img/external-link-svgrepo-com.svg"} className={"CarouselImgText"}/>
            <span style={{marginLeft: "26px"}}>{text}</span>
        </Link>
    );
}

const carouselImgs: ICarouselImg[] = [
    CreateCarouselImage(CreateRepoUrl("img/fishingwebapp/spotsnap1.jpg"),"/portfolio/fishingwebapp",
        "Fishing Web Application"),

    CreateCarouselImage(CreateRepoUrl("img/hands/homepage1.jpg"),"/portfolio/hands","CAIRS"),

    CreateCarouselImage(CreateRepoUrl("img/blythemillsheds/homemiddlemobile.png"),"/portfolio/blythemillsheds",
        "Blythe Mill Sheds"),

    CreateCarouselImage(CreateRepoUrl("img/fishingwebapp/editspot1.png"),"/portfolio/fishingwebapp",
        "Fishing Web Application"),

    CreateCarouselImage(CreateRepoUrl("img/textparse/textparsemobile.jpg"),"/textparse","Text Parse"),

    CreateCarouselImage(CreateRepoUrl("img/blythemillsheds/gallerydesktop.jpg"),"/portfolio/blythemillsheds",
        "Blythe Mill Sheds"),

    CreateCarouselImage(CreateRepoUrl("img/hands/report7.jpg"),"/portfolio/hands","CAIRS"),

    CreateCarouselImage(CreateRepoUrl("img/fishingwebapp/spotsnap3.jpg"),"/portfolio/fishingwebapp",
        "Fishing Web Application"),

    CreateCarouselImage("https://raw.githubusercontent.com/sidfishus/distributedspa/master/ss2.png","/portfolio/dpa",
        "Distributed SPA"),

    CreateCarouselImage(CreateRepoUrl("img/fishingwebapp/googleidentity2.png"),"/portfolio/fishingwebapp",
        "Fishing Web Application"),

    CreateCarouselImage(CreateRepoUrl("img/blythemillsheds/selectstyles.png"),"/portfolio/blythemillsheds",
        "Blythe Mill Sheds"),

    CreateCarouselImage(CreateRepoUrl("img/hands/mobilehome1.jpg"),"/portfolio/hands","CAIRS"),

    CreateCarouselImage(CreateRepoUrl("img/fishingwebapp/spotgallery1.jpg"),"/portfolio/fishingwebapp",
        "Fishing Web Application"),

    CreateCarouselImage(CreateRepoUrl("img/textparse/customcomparison4.jpg"),"/textparse",
        "Text Parse"),

    CreateCarouselImage(CreateRepoUrl("img/misc/orgchart4.jpg"),"/portfolio/misc","Organisation Chart")
];

export const Home = (props: IHomeProps) => {

    const navigate=useNavigate();

    return (
        <>
            <ContainerDemo>
                <PortfolioCarousel
                    carouselImgs={carouselImgs}
                    additionalCarouselFileClass={"PortfolioCarouselResponsiveFileClass"}
                    additionalThumbnailFileClass={"BlytheMillShedsThumbs"}
                    showThumbnails={false} autoChangeMs={6000} showChevrons={false}
                    SetOpenImg={idx => CarouselOnClick(navigate,idx)}
                />
                <Introduction {...props} />
                <AboutThisApplication />
                <UsefulLinks />
            </ContainerDemo>
        </>
    );
};

const CarouselOnClick = (navigate: NavigateFunction,idx: number) => {
    const img=carouselImgs[idx].src.substring(5);
    const slashIndex=img.indexOf('/');
    const portfolioUrl="/portfolio/" + img.substring(0,slashIndex);

    navigate(portfolioUrl);
}

const Introduction = (props: IHomeProps) => {

    return (
        <SegmentDemo heading="Introduction">
            <HelloWorld {...props} />
            <p>
                My name is Chris Siddall, I am {CalcDurationYears("1985-07-11")} years old (1985) and based in
                Tamworth Staffordshire.
                I have had a passion for computer programming since discovering it at the age of 16, and have created
                this application as a means of demonstrating my skills, to catalog my work and experience,
                and to give an insight into my personality.
                More than simply an advertisement, I also want to use this space to express myself and life story.
            </p>
            <p>The entire sourcecode for this application can be found on <a href="https://github.com/sidfishus/react-spa-demo">Github</a>
            , and a containerised version also exists 
            <a href="https://github.com/sidfishus/NCReactPortfolioWebsite"> here</a> and
            <a href="https://github.com/sidfishus/NCReactPortfolioTextParseService"> here</a>.
            For enquiries, constructive comments, or to request a copy of my CV word
                document feel free to contact me <a href="mailto:sidnet001@gmail.com">here</a>.
            </p>
        </SegmentDemo>
    );
};

const HelloWorld = (props: IHomeProps) => {

    const { mediaMatching} = props;

    if(!mediaMatching) return null;

    let resolutionDependantCode;
    switch(mediaMatching.FirstMatching()) {
        case eScreenResolution.Mobile:
            resolutionDependantCode=<>
                &nbsp;&nbsp;&nbsp;printf("Hello world!");<br/>
                &nbsp;&nbsp;&nbsp;printf("Welcome to my cloud "<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;"based portfolio!");<br/>
            </>
            break;

        case eScreenResolution.Tablet:
            resolutionDependantCode=<>
                &nbsp;&nbsp;&nbsp;printf("Hello world!");<br/>
                &nbsp;&nbsp;&nbsp;printf("Welcome to my cloud based portfolio!");<br/>
            </>
            break;

        case eScreenResolution.SmallMonitor:
        case eScreenResolution.LargeMonitor:
            resolutionDependantCode=
                <>&nbsp;&nbsp;&nbsp;printf("Hello world! Welcome to my cloud based portfolio!");<br/></>;
            break;
    }

    return (
        <Code>
            void main(void) {"{"}<br/>
            {resolutionDependantCode}
            {"}"}
        </Code>
    );
};

interface IAboutSection {
    section: React.ReactNode;
    descr: React.ReactNode;
};

const skillsMatrixDescr=
    <>A list of the computer programming related technologies and concepts that I am skilled in
    with an approximation of how much experience I have in years, and the specific areas that I remember working on.</>;

const textParseDemoDescr=
    <>The purpose of this was to create an extensive ASP .NET React/Typescript application with a rich GUI
        which leverages the latest features of each (at the time!), to provide a live demonstration of my skills as well
        as advertise my <a href="https://github.com/sidfishus/TextParse">text parse library</a>. The text parse user
        interface is explained in detail <Link to="/portfolio/textparse">here</Link>.</>;

const aboutSections: IAboutSection[] = [
    {
        section: <Link to="/aboutme">About Me</Link>,
        descr: <>General information about myself and my personality.</>
    },
    {
        section: <>History</>,
        descr: <>My history from an education and computer programming perspective starting with
            <Link to="/history/frivolousbeginnings"> how I found
            programming</Link>, <Link to="/history/education">my education</Link>, and <Link
                to="/history/career" className="boldLink"> my career history</Link>.</>
    },
    {
        section: <>Portfolio</>,
        descr: <>Documents some of my work from 2017 onwards including screenshots and links to the code where possible.
            Includes the <Link to="/portfolio/fishingwebapp" className="boldLink">fishing web application</Link>, <Link
                to="/portfolio/blythemillsheds" className="boldLink">Blythe Mill Sheds</Link>, <Link
                to="/portfolio/dpa" className="boldLink">Distributed SPA</Link>, <Link
                to="/portfolio/hands" className="boldLink"> Health and Safety system</Link>, <Link
                to="/portfolio/textparse" className="boldLink"> Text Parse library</Link>, <Link
                to="/portfolio/scriptabletemplate" className="boldLink"> Scriptable Template</Link> and <Link
                to="/portfolio/misc" className="boldLink"> miscellaneous work</Link>.
            </>
    },
    {
        section: <><Link to="/skillsmatrix" className="boldLink">Skills Matrix</Link></>,
        descr: skillsMatrixDescr,
    },
    {
        section: <Link to="/textparse" className="boldLink">Text Parse Demo</Link>,
        descr: textParseDemoDescr
    }
];

const recruiterSections: IAboutSection[] = [
    {
        section: <Link to="/skillsmatrix">Skills Matrix</Link>,
        descr: skillsMatrixDescr
    },

    {
        section: <Link to="/history/career">Career</Link>,
        descr: <>Extensive details regarding my career history.</>
    },

    {
        section: <Link to="/textparse">Text Parse Demo</Link>,
        descr: textParseDemoDescr
    },
];

const RenderAboutSectionRow = (section: IAboutSection, i: number): React.ReactNode => {

    return (
        <Table.Row key={i}>
            <Table.Cell>{section.section}</Table.Cell>
            <Table.Cell>{section.descr}</Table.Cell>
        </Table.Row>
    );
};

const AboutThisApplication = () => {

    return (
        <SegmentDemo heading="About This Application">
            <SegmentSubSection>
                <p>What better way to demonstrate my computer programming skills is there than to create a portfolio which is in itself
                    a computer program incorporating many of the technologies I am skilled in using?</p>
                <p>
                    When I originally started in Winter 2019 my time on this was very limited, however being furloughed for
                    6 weeks in March 2020 gave me the wonderful opportunity to complete the <Link
                        to="/textparse">text parse user interface</Link> example which forms the bulk of this application.
                    I have been able to complete the remaining parts in my spare time whilst being a father and having a full
                    time job and the first version of the application was complete in July 2021. Typically, I have
                    added more features and have gone in to far more detail than I originally intended and
                    it will only expand over time.</p>
                <p>
                    I have developed this specifically to have a good UX on mobiles, tablets, laptops and computers,
                    but it is best viewed on a large screen and this is particularly true for the <Link
                    to="/textparse">text parse user interface </Link> due to it's complexity.
                </p>
                <p>
                    This application was last updated on January 2025.
                </p>
            </SegmentSubSection>

            <SegmentSubSection heading="Pages">
                <p>The pages that make up this site as well as a brief description. <span className="boldLink">The
                    pages which are the most relevant to recruiters and prospective employers are highlighted as links.</span>
                </p>

                <Table compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{minWidth: 150}}>Page</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {aboutSections.map(RenderAboutSectionRow)}
                    </Table.Body>
                </Table>
            </SegmentSubSection>

            <SegmentSubSection heading="Technology">
                <p>This is a responsive single page web application which is hosted in Azure.
                    The entire sourcecode for both the service side and client side applications is held in <a
                        href="https://github.com/sidfishus/react-spa-demo">Github</a>.
                </p>
                <p>Some of the core technologies used include: ASP .NET 9, C#, React, Javascript, Typescript,
                    Semantic UI React (the UI framework), Vite, React Router, Google Analytics, and my <a
                        href={"https://www.npmjs.com/package/react-cscarousel"}>react-cscarousel</a>.</p>
            </SegmentSubSection>
        </SegmentDemo>
    );
};

interface IUsefulLink {
    url: JSX.Element;
    descr: JSX.Element;
};

const usefulLinks: IUsefulLink[] = [
    {
        url: <a href="https://github.com/sidfishus">https://github.com/sidfishus</a>,
        descr: <>My public Github account.</>
    },

    {
        url: <a href="https://github.com/sidfishus/react-spa-demo">https://github.com/sidfishus/react-spa-demo</a>,
        descr: <>My Github repository which contains the code for this application.</>
    },

    {
        url: <a href="mailto:sidnet001@gmail.com">mailto:sidnet001@gmail.com</a>,
        descr: <>My email address.</>
    },
];

const RenderLinkSectionRow = (link: IUsefulLink, idx: number) => {

    const { url, descr} = link;

    return (
        <Table.Row key={idx}>
            <Table.Cell>{url}</Table.Cell>
            <Table.Cell>{descr}</Table.Cell>
        </Table.Row>
    );
};

const UsefulLinks = () => {

    return (
        <SegmentDemo heading="Useful Links">
            <SegmentSubSection>
                <p>A list of useful links:</p>
                <Table compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{minWidth: 150}}>Link</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {usefulLinks.map(RenderLinkSectionRow)}
                    </Table.Body>
                </Table>
            </SegmentSubSection>
        </SegmentDemo>
    );
};