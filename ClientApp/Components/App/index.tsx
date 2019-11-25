
import * as React from "react";
import { Routes } from "../../routes";
import { BrowserRouter } from "react-router-dom";

// Note: this is only ever called when the app rendered in the browser. SSR does not use this component.
export const App = () => {

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

//TODO: hot module replacement