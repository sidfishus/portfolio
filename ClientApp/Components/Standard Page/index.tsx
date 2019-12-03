
import * as React from "react";
import { Fragment } from "react";

type IStdPageProps = {
    pageRender: () => JSX.Element
};

export const StdPage : React.SFC<IStdPageProps> = (props: IStdPageProps) => {
    return (
        <Fragment>
            {props.pageRender()}
        </Fragment>
    );
};