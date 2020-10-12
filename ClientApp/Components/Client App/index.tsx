
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
            mediaMatching={mediaMatching}
        />
    );
};

export enum eScreenResolution {
    THINNER_THAN_LAPTOP = 0,
    LAPTOP_WIDTH_OR_LARGER = 1
};

const CreateRerenderAppFunction = (): () => void => {

    const [,SetRerenderState] = React.useState(false);

    return () => SetRerenderState(currentRerenderState => !currentRerenderState);
};

const CreateMediaMatching = (ReRender: () => void): MatchMediaResult => {

    const mediaQueryList = [
        "(max-width: 1250px)",			// THINNER_THAN_LAPTOP
        "(min-width: 1251px)",		    // LAPTOP_WIDTH_OR_LARGER
    ];

    return MatchMedia(window, mediaQueryList, ReRender, 100);
};

// For hot module replacement: https://github.com/gaearon/react-hot-loader
export default hot(ClientApp);