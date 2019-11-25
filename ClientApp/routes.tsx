
import * as React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";

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

export const Routes = (props: IRoutesProps) => {

    const routes = (
        <Switch>
            {/*
            <Route exact path="/account/login" render={(renderProps: RouteComponentProps<any>) => <LoginRouted {...renderProps} {...props} />} />
            */}
            <Route render={(renderProps: RouteComponentProps<any>) => <NoRoutingMatch {...renderProps} {...props} />} />
        </Switch>
    );
	
	return routes;
};