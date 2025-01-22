
import * as React from "react";
import { Routes } from "../../routes";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { MatchMediaResult, MatchMedia } from "../../Library/MediaMatching";
import useConstant from "use-constant";
import { IsDebug} from "../../IsDebug.ts";

export type IAppProps = {
    apiRoot: string|null;
};

export const ClientApp = (props: IAppProps) => {

    const { apiRoot } = props;

    const ReRender = CreateRerenderAppFunction();

    const mediaMatching = useConstant(()=>CreateMediaMatching(ReRender));

    if(!IsDebug) {
        //// Google Analytics
        // Record the server loaded path
        ReactGA.initialize("G-9KRNT5HBDD");
        ReactGA.send({
            hitType: "pageview",
            page: window.location.pathname + window.location.search
        });
    }

    const windowAsAny: any = window;

    const router=createBrowserRouter(createRoutesFromElements(
        Routes({
            prerenderData: windowAsAny.prerenderData,
            mediaMatching: mediaMatching,
            apiRoot: apiRoot
        })));

	return (
        <RouterProvider router={router} />
    );
};

// These correlate with the media queries in semantic.css.
export enum eScreenResolution {
    Mobile = 0,
    Tablet = 1,
    SmallMonitor=2,
    LargeMonitor=3,
};

const CreateRerenderAppFunction = (): () => void => {

    const [,SetRerenderState] = React.useState(false);

    return () => SetRerenderState(currentRerenderState => !currentRerenderState);
};

const CreateMediaMatching = (ReRender: () => void): MatchMediaResult => {

    const mediaQueryList = [
        "(max-width: 767px)",			                    // Mobile
        "(min-width: 768px) and (max-width: 991px)",	    // Tablet
        "(min-width: 992px) and (max-width: 1199px)",	    // Small monitor
        "(min-width: 1200px)",	                            // Large monitor
    ];

    return MatchMedia(window, mediaQueryList, ReRender, 100);
};