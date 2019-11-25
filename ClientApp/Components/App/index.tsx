
import * as React from "react";
import { Routes } from "../../routes";
import { BrowserRouter } from "react-router-dom";
import { hot } from "react-hot-loader/root";

// Note: this is only ever called when the app rendered in the browser. SSR does not use this component.
const App = () => {

    const windowAsAny: any = window;

	return (
        <BrowserRouter>
            <Routes
                prerenderData={windowAsAny.prerenderData}
                SSR={false}
            />
        </BrowserRouter>
    );
};

// For hot module replacement: https://github.com/gaearon/react-hot-loader
export default hot(App);