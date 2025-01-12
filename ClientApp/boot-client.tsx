

import * as ReactDOM from "react-dom/client";
import { ClientApp } from "./Components/Client App";

const rootElement=document.getElementById("root")!;

const isDebug = rootElement.dataset.debug === "1";

export const CreateRepoUrl = (url: string): string => {

	if(isDebug)
		return url;

	return `https://github.com/sidfishus/react-spa-demo/blob/master/public/${url}?raw=true`;
}

ReactDOM.createRoot(rootElement).render(
	<ClientApp debug={isDebug} apiRoot={rootElement.dataset.apiroot ?? null} />
);