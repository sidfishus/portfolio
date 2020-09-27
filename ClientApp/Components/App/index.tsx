
import * as React from "react";
import { Routes } from "../../routes";
import { useHistory } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import ReactGA from "react-ga";

export type IAppProps = {
    debug: boolean;
};

// Note: this is only ever called when the app is rendered in the browser. SSR does not use this component.
const App: React.SFC<IAppProps> = (props) => {

    const { debug } = props;

    if(!debug) {
        //sidtodo test when live in Azure.
        //// Google Analytics
        // Record the server loaded path
        ReactGA.initialize("UA-179122198-1");
        ReactGA.pageview(window.location.pathname + window.location.search);

        // Record client-side changes
        const history = useHistory();
        history.listen((location: any) => {
            ReactGA.set({ page: location.pathname });
            ReactGA.pageview(location.pathname);
        });
    }

    const windowAsAny: any = window;

	return (
        <Routes
            prerenderData={windowAsAny.prerenderData}
            SSR={false}
        />
    );
};

// For hot module replacement: https://github.com/gaearon/react-hot-loader
export default hot(App);