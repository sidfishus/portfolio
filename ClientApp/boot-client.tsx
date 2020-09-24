
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./Components/App";
import { createBrowserHistory } from "history";

function RenderApp() {

	const history=createBrowserHistory();

	//sidtodo history.listen((location: any) => alert("bananas"));

	let reactElement = document.getElementById("react");

	if (reactElement) {
		ReactDOM.hydrate(
			<App
				history={history}
			/>
		, reactElement);
	}
}

RenderApp();