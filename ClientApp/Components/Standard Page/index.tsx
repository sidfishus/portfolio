
import * as React from "react";
import { DemoMenu, eMenuId } from "../Menu";
import { IRoutedCompProps } from "../../routes";
import { Button } from "semantic-ui-react";

type IStdPageProps = {
    pageRender: () => JSX.Element,
    stdProps: IRoutedCompProps,
    menuId: eMenuId
};

export const StdPage : React.SFC<IStdPageProps> = (props: IStdPageProps) => {

    const { stdProps, pageRender, menuId } = props;

    return (
        <>
            <DemoMenu {...stdProps} activeMenuId={menuId} />
            {pageRender()}

            {/*<Button onClick={() => console.log(document.documentElement.innerHTML)}>Log HTML</Button>*/}
            <br/>
        </>
    );
};