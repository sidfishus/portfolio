
import * as React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
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
import { ProgrammingDiscussion } from "./Components/Programming Discussion";
import { MatchMediaResult } from "./Library/MediaMatching";


export type IPrerenderData = {
};

export type IRoutesProps = {
    prerenderData: IPrerenderData;
    SSR: boolean;
    mediaMatching: MatchMediaResult;
};

export type IRoutedCompProps = RouteComponentProps<any> & IRoutesProps;

const NoRoutingMatch = (props: IRoutedCompProps) => {
    return (
        <div>
            No Clientside Routing Match. {((props.SSR)? "Server rendered" : "Client rendered")}.
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

const ProgrammingDiscussionRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <ProgrammingDiscussion {...props} />}
            stdProps={props}
            menuId={eMenuId.programmingDiscussion}
        />
    );
};

export const Routes = (props: IRoutesProps) => {

    const routes = (
        <Switch>
            <Route exact path="/" render={(renderProps: RouteComponentProps<any>) => <HomeRouted {...renderProps} {...props} />} />
            <Route exact path="/home" render={(renderProps: RouteComponentProps<any>) => <HomeRouted {...renderProps} {...props} />} />
            <Route exact path="/textparse" render={(renderProps: RouteComponentProps<any>) => <TextParseRouted {...renderProps} {...props} />} />
            <Route exact path="/portfolio/dpa" render={(renderProps: RouteComponentProps<any>) => <DPAPortfolioRouted {...renderProps} {...props} />} />
            <Route exact path="/portfolio/hands" render={(renderProps: RouteComponentProps<any>) => <HAndSPortfolioRouted {...renderProps} {...props} />} />
            <Route exact path="/portfolio/textparse" render={(renderProps: RouteComponentProps<any>) => <TextParsePortfolioRouted {...renderProps} {...props} />} />
            <Route exact path="/portfolio/scriptabletemplate" render={(renderProps: RouteComponentProps<any>) => <ScriptableTemplatePortfolioRouted {...renderProps} {...props} />} />
            <Route exact path="/portfolio/misc" render={(renderProps: RouteComponentProps<any>) => <MiscPortfolioRouted {...renderProps} {...props} />} />
            <Route exact path="/skillsmatrix" render={(renderProps: RouteComponentProps<any>) => <SkillsMatrixRouted {...renderProps} {...props} />} />
            <Route exact path="/aboutme" render={(renderProps: RouteComponentProps<any>) => <AboutMeRouted {...renderProps} {...props} />} />
            <Route exact path="/history/frivolousbeginnings" render={(renderProps: RouteComponentProps<any>) => <FrivolousBeginningsRouted {...renderProps} {...props} />} />
            <Route exact path="/history/education" render={(renderProps: RouteComponentProps<any>) => <EducationRouted {...renderProps} {...props} />} />
            <Route exact path="/history/career" render={(renderProps: RouteComponentProps<any>) => <CareerRouted {...renderProps} {...props} />} />
            <Route exact path="/history/currentandfuture" render={(renderProps: RouteComponentProps<any>) => <CurrentAndFutureRouted {...renderProps} {...props} />} />
            <Route exact path="/programmingdiscussion" render={(renderProps: RouteComponentProps<any>) => <ProgrammingDiscussionRouted {...renderProps} {...props} />} />
            <Route render={(renderProps: RouteComponentProps<any>) => <NoRoutingMatch {...renderProps} {...props} />} />
        </Switch>
    );
	
	return routes;
};