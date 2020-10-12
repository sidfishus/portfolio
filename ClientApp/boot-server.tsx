
import { createServerRenderer } from "aspnet-prerendering";
import { renderToString } from "react-dom/server";
import * as React from "react";
import { StaticRouter } from "react-router-dom";
import { Routes } from "./routes";

// SSPR begins here
// To debug this, use 'chrome://inspect' and 'open dedicated tools for Node'.
export default createServerRenderer(params => {
    return new Promise((resolve, reject) => {

        const routes = (
            <Routes
                prerenderData={params.data}
                SSR={true}
                mediaMatching={null}
            />
        );

        let routerContext = { };
        const app = (
            <StaticRouter context={routerContext} location={params.location.path} children={routes} />
        );

        const rendered=renderToString(app);

        params.domainTasks.then(() => {
            resolve({
                html: rendered,
                // Use 'globals' to pass data from the server to the client. Accessible under 'window'.
                globals: {
                    prerenderData: params.data
                }
            });
        },reject);
    });
});