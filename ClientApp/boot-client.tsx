

import * as ReactDOM from "react-dom/client";
import { ClientApp } from "./Components/Client App";

function RenderApp() {

	let debug=false;
	let reactRootElement = document.getElementById("react");
	if(!reactRootElement) {
		debug=true;
		reactRootElement = document.getElementById("reactDebug");
	}

	if (reactRootElement) {
		ReactDOM.createRoot(reactRootElement).render(
			<ClientApp debug={debug} apiRoot={reactRootElement.dataset.apiroot ?? null}/>
		);
	}
}

RenderApp();