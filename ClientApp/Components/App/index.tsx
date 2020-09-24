
import * as React from "react";
import { Routes } from "../../routes";
import { Router } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { BrowserHistory } from "history";

export type IAppProps = {
    history: BrowserHistory<object>;
};

// Note: this is only ever called when the app rendered in the browser. SSR does not use this component.
const App = (props: IAppProps) => {

    const { history } = props;

    const windowAsAny: any = window;

	return (
        <Router history={history}>
            <Routes
                prerenderData={windowAsAny.prerenderData}
                SSR={false}
            />
        </Router>
    );
};

// For hot module replacement: https://github.com/gaearon/react-hot-loader
export default hot(App);