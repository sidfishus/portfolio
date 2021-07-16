
import * as React from "react";
import { Routes } from "../../routes";
import { useHistory } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import ReactGA from "react-ga";
import { MatchMediaResult, MatchMedia } from "../../Library/MediaMatching";
import useConstant from "use-constant";

export type IClientAppProps = {
    debug: boolean;
};

// Note: this is only ever called when the app is rendered in the browser. SSR does not use this component.
const ClientApp: React.FunctionComponent<IClientAppProps> = (props) => {

    const { debug } = props;

    const ReRender = CreateRerenderAppFunction();

    const mediaMatching = useConstant(()=>CreateMediaMatching(ReRender));

    if(!debug) {
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
            mediaMatching={mediaMatching}
        />
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

// For hot module replacement: https://github.com/gaearon/react-hot-loader
export default hot(ClientApp);