
import * as React from "react";
import { IRoutedCompProps } from "../../routes";
import { Container, Segment, Label, Table } from "semantic-ui-react";
import { HEADING_COLOUR } from "../../theme";
import { Link } from "react-router-dom";
import { Code, SegmentDemo, ContainerDemo, SegmentSubSection } from "../Presentation";
import { MatchMediaResult } from "../../Library/MediaMatching";
import { eScreenResolution } from "../Client App";

interface IHomeProps extends IRoutedCompProps {
};

//sidtodo catalog of my favourite tunes.
//sidtodo book recommendations
//sidtodo test on a mobile, and desktop.

//sidtodo: create a short video?

//sidtodo
//topics:
//  purpose of site: catalog my work, demonstrate my skills, experience, give a flavour in to who i am
//      covers my work from approx 2017 onwards.
//  can see the power and future of software, everything is going to become an app
//  feel free to request a copy of my cv..
//  explain tech used to create the site, where the code can be found
//  about me
//  background
//  how i got in to coding
//  current and future projects: social media app using Material UI, cryptocurrency. like to do more on unit testing and writing functional code. brilliant concept
//  coding preferences, backend, full stack, prefer to use UI library
//  versatility, ability to learn on the fly
//  professional experience, cv furlough giving me time to finish
//  what the site offers: live React app e.t.c.
// educational game to explain programming to children

//  financially viable but also rewarding and puts me to the test, has an impact on the world around me

//sidtodo page for my live mixes!

export const Home: React.FunctionComponent<IHomeProps> = (props) => {


    return (
        <>
            <ContainerDemo>
                <Introduction {...props} />
                <AboutThisSite />
                <UsefulLinks />
            </ContainerDemo>
        </>
    );
};

const Introduction: React.FunctionComponent<IHomeProps> = (props) => {

    return (
        <SegmentDemo heading="Introduction">
            <HelloWorld {...props} />
            <p>
                My name is Chris Siddall, I am the fine age of 35 years old (1985) and I am based in Tamworth Staffordshire.
                I have had a passion for computer programming since discovering it at the age of 16, and have created
                this application as a means of demonstrating my skills, to catalog my work and experience,
                and to give an insight into my personality.
                More than simply advertise myself, I want to express my true self and life story to my family and
                future generations, and store memories for my future self to or look back on.
                So unless I am discussing technical details it is my deliberate intention to not sound overly
                formal or professional.
            </p>
            <p>For enquiries, constructive comments, or to request a copy of my CV word
                document feel free to contact me <a href="mailto:sidnet001@gmail.com">here</a>.
            </p>
        </SegmentDemo>
    );
};

const HelloWorld: React.FunctionComponent<IHomeProps> = (props) => {

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

const aboutSections: IAboutSection[] = [
    {
        section: <Link to="/aboutme">About Me</Link>,
        descr: <>General information about myself and my personality.</>
    },
    {
        section: <>History</>,
        descr: <>My history from an education and computer programming perspective starting from the very beginning and
            continuing up to what I am doing currently and my plans for the future.</>
    },
    {
        section: <>Portfolio</>,
        descr: <>Documents some of my work from 2017 onwards including screenshots and links to the code where possible.</>
    },
    {
        section: <Link to="/programmingdiscussion">Programming Discussion</Link>,
        descr: <>My opinion and feelings towards the various computer programming technologies and concepts I am
            experienced in.</>
    },
    {
        section: <Link to="/skillsmatrix">Skills Matrix</Link>,
        descr: <>A list of the computer programming related technologies and concepts that I have used
            with an approximation of how much experience I have in years, and the specific areas that I remember working on. </>,
    },
    {
        section: <Link to="/textparse">Text Parse Demo</Link>,
        descr: <>The purpose of this was to create an extensive ASP .NET MVC Core/React/Javascript application with a rich GUI
            which leverages the latest features of each, to demonstrate my skills as well as advertise my&#32;
            <a href="https://github.com/sidfishus/TextParse">text parse library</a> and exhibit what it can achieve
            and how it works, but from a visual perspective for a deeper understanding.</>
    }
];

const RenderAboutSectionRow = (section: IAboutSection, i: number): React.ReactNode => {

    return (
        <Table.Row key={i}>
            <Table.Cell>{section.section}</Table.Cell>
            <Table.Cell>{section.descr}</Table.Cell>
        </Table.Row>
    );
};

const AboutThisSite: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="About This Site">
            <SegmentSubSection>
                <p>What better way to demonstrate my computer programming skills is there than to create a portfolio which is in itself
                    a computer program incorporating many of the technologies I have experience in using?</p>
                <p>
                    When I originally started in Winter 2019 my time on this was very limited, however being furloughed for
                    6 weeks in March 2020 gave me the wonderful opportunity to complete the&#32;
                    <Link to="./textparse">text parse user interface</Link> example which forms the bulk of this application.
                    I have been able to complete the remaining parts in my spare time whilst being a father and having a full
                    time job and the first version of the application was complete in October 2020.
                </p>
                <p>
                    Typically, I have added more features and have gone in to far more detail than I originally intended and
                    it will only expand over time.
                </p>
                <p>
                    I have developed this specifically to work on mobiles, tablets, and laptops/computers, but it is best viewed on
                    a large screen and this is particularily true for the <Link to="./textparse">text parse user interface</Link>
                    due to it's complexity.
                </p>
            </SegmentSubSection>

            <SegmentSubSection heading="Technology">
                <p>This is a mobile friendly isomorphic web based single page application which is hosted in Azure using an account
                    I created and manage.
                    The entire sourcecode for this is held in <a href="https://github.com/sidfishus/react-spa-demo">Github</a>.
                </p>
                <p>Technologies used includes: ASP .NET MVC Core 3, C#, React, Javascript, Typescript, Semantic UI React, Webpack,
                    Babel, React Router, Google Analytics, React Responsive Carousel and hot module replacement.</p>
            </SegmentSubSection>

            <SegmentSubSection heading="Pages">
                <p>The pages that make up this site as well as a brief description:</p>
                <Table>
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
        descr: <>My Github account.</>
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

const UsefulLinks: React.FunctionComponent<{}> = () => {

    return (
        <SegmentDemo heading="Useful Links">
            <SegmentSubSection>
                <p>A list of useful links:</p>
                <Table>
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