
import { Route } from "react-router-dom";
import { TextParse } from "./Components/Text Parse";
import { StdPage } from "./Components/Standard Page";
import { Home } from "./Components/Home";
import { eMenuId } from "./Components/Menu";
import { DPAPortfolio } from "./Components/Portfolio/DPA";
import { HAndSPortfolio } from "./Components/Portfolio/HAndS";
import { TextParsePortfolio } from "./Components/Portfolio/TextParse";
import { ScriptableTemplatePortfolio } from "./Components/Portfolio/ScriptableTemplate";
import { MiscPortfolio } from "./Components/Portfolio/Misc";
import { SkillsMatrix} from "./Components/Skills Matrix";
import { AboutMe } from "./Components/About Me";
import { FrivolousBeginnings } from "./Components/History/FrivolousBeginnings";
import { Education } from "./Components/History/Education";
import { Career } from "./Components/History/Career";
import { CurrentAndFuture } from "./Components/History/CurrentAndFuture";
import { MatchMediaResult } from "./Library/MediaMatching";


export type IPrerenderData = {
};

export type IRoutesProps = {
    prerenderData: IPrerenderData;
    mediaMatching: MatchMediaResult;
    apiRoot: string|null;
};

export type IRoutedCompProps = IRoutesProps;

const NoRoutingMatch = (_: IRoutedCompProps) => {
    return (
        <div>
            No Clientside Routing Match.
        </div>
    );
};

const TextParseRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <TextParse {...props} />}
            stdProps={props}
            menuId={eMenuId.textParse}
        />
    );
};

const HomeRouted = (props: IRoutedCompProps) => {

    return (
        <StdPage
            pageRender={() => <Home {...props} />}
            stdProps={props}
            menuId={eMenuId.home}
        />
    );
};

const DPAPortfolioRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <DPAPortfolio {...props} />}
            stdProps={props}
            menuId={eMenuId.portfolioDPA}
        />
    );
};

const HAndSPortfolioRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <HAndSPortfolio {...props} />}
            stdProps={props}
            menuId={eMenuId.portfolioHAndS}
        />
    );
};

const TextParsePortfolioRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <TextParsePortfolio {...props} />}
            stdProps={props}
            menuId={eMenuId.portfolioTextParse}
        />
    );
};

const ScriptableTemplatePortfolioRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <ScriptableTemplatePortfolio {...props} />}
            stdProps={props}
            menuId={eMenuId.portfolioScriptableTemplate}
        />
    );
};

const MiscPortfolioRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <MiscPortfolio {...props} />}
            stdProps={props}
            menuId={eMenuId.portfolioMisc}
        />
    );
};

const AboutMeRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <AboutMe {...props} />}
            stdProps={props}
            menuId={eMenuId.aboutMe}
        />
    );
};

const SkillsMatrixRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <SkillsMatrix {...props} />}
            stdProps={props}
            menuId={eMenuId.skillsMatrix}
        />
    );
};

const FrivolousBeginningsRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <FrivolousBeginnings {...props} />}
            stdProps={props}
            menuId={eMenuId.frivolousBeginnings}
        />
    );
};

const EducationRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <Education {...props} />}
            stdProps={props}
            menuId={eMenuId.education}
        />
    );
};

const CareerRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <Career {...props} />}
            stdProps={props}
            menuId={eMenuId.career}
        />
    );
};

const CurrentAndFutureRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <CurrentAndFuture {...props} />}
            stdProps={props}
            menuId={eMenuId.currentAndFuture}
        />
    );
};

export const Routes = (props: IRoutedCompProps) => {

    const routes = [
        <Route path="/" element={<HomeRouted {...props} />} />,
        <Route path="/home" element={<HomeRouted {...props} />} />,
        <Route path="/textparse" element={<TextParseRouted {...props} />} />,
        <Route path="/portfolio">
            <Route path="dpa" element={<DPAPortfolioRouted {...props} />} />
            <Route path="hands" element={<HAndSPortfolioRouted {...props} />} />
            <Route path="textparse" element={<TextParsePortfolioRouted {...props} />} />
            <Route path="scriptabletemplate" element={<ScriptableTemplatePortfolioRouted {...props} />} />
            <Route path="misc" element={<MiscPortfolioRouted {...props} />} />
        </Route>,
        <Route path="/skillsmatrix" element={<SkillsMatrixRouted {...props} />} />,
        <Route path="/aboutme" element={<AboutMeRouted {...props} />} />,
        <Route path="/history">
            <Route path="frivolousbeginnings" element={<FrivolousBeginningsRouted {...props} />} />
            <Route path="education" element={<EducationRouted {...props} />} />
            <Route path="career" element={<CareerRouted {...props} />} />
            <Route path="currentandfuture" element={<CurrentAndFutureRouted {...props} />} />
        </Route>,
        <Route element={<NoRoutingMatch {...props} />} />
    ];
	
	return routes;
};