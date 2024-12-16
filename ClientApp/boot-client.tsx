

import * as ReactDOM from "react-dom/client";
import { ClientApp } from "./Components/Client App";

function RenderApp() {

	let debug=false;
	let reactElement = document.getElementById("react");
	if(!reactElement) {
		debug=true;
		reactElement = document.getElementById("reactDebug");
	}

	if (reactElement)
		ReactDOM.createRoot(reactElement).render(<ClientApp debug={debug}/>);
}

RenderApp();