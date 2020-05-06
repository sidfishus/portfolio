
import * as React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { TextParse } from "./Components/Text Parse";
import { StdPage } from "./Components/Standard Page";
import { Home } from "./Components/Home";
import { eMenuId } from "./Components/Menu";
import { Portfolio } from "./Components/Portfolio";

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

const PortfolioRouted = (props: IRoutedCompProps) => {
    return (
        <StdPage
            pageRender={() => <Portfolio {...props} />}
            stdProps={props}
            menuId={eMenuId.portfolio}
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
            <Route exact path="/portfolio" render={(renderProps: RouteComponentProps<any>) => <PortfolioRouted {...renderProps} {...props} />} />
            <Route render={(renderProps: RouteComponentProps<any>) => <NoRoutingMatch {...renderProps} {...props} />} />
        </Switch>
    );
	
	return routes;
};