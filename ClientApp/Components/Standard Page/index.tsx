
import * as React from "react";
import { DemoMenu, eMenuId } from "../Menu";
import { IRoutedCompProps } from "../../routes";
import {useLocation} from "react-router-dom";
import ReactGA from "react-ga4";

type IStdPageProps = {
    pageRender: () => JSX.Element,
    stdProps: IRoutedCompProps,
    menuId: eMenuId
};

export const StdPage = (props: IStdPageProps) => {

    const { stdProps, pageRender, menuId } = props;

    // Record client-side changes
    const location = useLocation();

    React.useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: location.pathname + location.search
        });
    }, [location]);

    return (
        <>
            <DemoMenu {...stdProps} activeMenuId={menuId} />
            {pageRender()}

            {/*<Button onClick={() => console.log(document.documentElement.innerHTML)}>Log HTML</Button>*/}
            <br/>
        </>
    );
};