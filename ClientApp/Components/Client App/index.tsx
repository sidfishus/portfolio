
import * as React from "react";
import { Routes } from "../../routes";
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import ReactGA from "react-ga";
import { MatchMediaResult, MatchMedia } from "../../Library/MediaMatching";
import useConstant from "use-constant";

export type IAppProps = {
    debug: boolean;
    apiRoot: string|null;
};

// Note: this is only ever called when the app is rendered in the browser. SSR does not use this component.
export const ClientApp = (props: IAppProps) => {

    const { debug, apiRoot } = props;

    const ReRender = CreateRerenderAppFunction();

    const mediaMatching = useConstant(()=>CreateMediaMatching(ReRender));

    if(!debug) {
        //// Google Analytics
        // Record the server loaded path
        ReactGA.initialize("UA-179122198-1");
        ReactGA.pageview(window.location.pathname + window.location.search);

        /*
        //sidtodo
        // Record client-side changes
        const history = useHistory();
        history.listen((location: any) => {+
            ReactGA.set({ page: location.pathname });
            ReactGA.pageview(location.pathname);
        });
        */
    }

    const windowAsAny: any = window;

    const router=createBrowserRouter(createRoutesFromElements(
        Routes({
            prerenderData: windowAsAny.prerenderData,
            SSR: false,
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