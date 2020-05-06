
import * as React from "react";
import { Fragment } from "react";
import { DemoMenu, eMenuId } from "../Menu";
import { IRoutedCompProps } from "../../routes";

type IStdPageProps = {
    pageRender: () => JSX.Element,
    stdProps: IRoutedCompProps,
    menuId: eMenuId
};

export const StdPage : React.SFC<IStdPageProps> = (props: IStdPageProps) => {

    const { stdProps, pageRender, menuId } = props;

    return (
        <Fragment>
            <br />
            <DemoMenu {...stdProps} activeMenuId={menuId} />
            <br />
            {pageRender()}
        </Fragment>
    );
};