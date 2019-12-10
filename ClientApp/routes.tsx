
import * as React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { TextParse } from "./Components/Text Parse";
import { StdPage } from "./Components/Standard Page";

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
            pageRender={() => <TextParse />}
        />
    );
};

export const Routes = (props: IRoutesProps) => {

    const routes = (
        <Switch>
            <Route exact path="/textparse" render={(renderProps: RouteComponentProps<any>) => <TextParseRouted {...renderProps} {...props} />} />
            <Route render={(renderProps: RouteComponentProps<any>) => <NoRoutingMatch {...renderProps} {...props} />} />
        </Switch>
    );
	
	return routes;
};