
import * as React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { TextParse } from "./Components/Text Parse";
import { StdPage } from "./Components/Standard Page";
import { Home } from "./Components/Home";
import { eMenuId } from "./Components/Menu";
import { DPAPortfolio } from "./Components/Portfolio/DPA";
import { HAndSPortfolio } from "./Components/Portfolio/HAndS";

export type IPrerenderData = {
};

export type IRoutesProps = {
    prerenderData: IPrerenderData;
    SSR: boolean;
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

//sidtodo no routing match.
export const Routes = (props: IRoutesProps) => {

    const routes = (
        <Switch>
            <Route exact path="/" render={(renderProps: RouteComponentProps<any>) => <HomeRouted {...renderProps} {...props} />} />
            <Route exact path="/home" render={(renderProps: RouteComponentProps<any>) => <HomeRouted {...renderProps} {...props} />} />
            <Route exact path="/textparse" render={(renderProps: RouteComponentProps<any>) => <TextParseRouted {...renderProps} {...props} />} />
            <Route exact path="/portfolio/dpa" render={(renderProps: RouteComponentProps<any>) => <DPAPortfolioRouted {...renderProps} {...props} />} />
            <Route exact path="/portfolio/hands" render={(renderProps: RouteComponentProps<any>) => <HAndSPortfolioRouted {...renderProps} {...props} />} />
            <Route render={(renderProps: RouteComponentProps<any>) => <NoRoutingMatch {...renderProps} {...props} />} />
        </Switch>
    );
	
	return routes;
};