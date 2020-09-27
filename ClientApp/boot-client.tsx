
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./Components/App";
import { BrowserRouter } from "react-router-dom";

function RenderApp() {

	let debug=false;
	let reactElement = document.getElementById("react");
	if(!reactElement) {
		debug=true;
		reactElement = document.getElementById("reactDebug");
	}

	if (reactElement) {
		ReactDOM.hydrate(
			<BrowserRouter>
				<App debug={debug} />
			</BrowserRouter>
		, reactElement);
	}
}

RenderApp();