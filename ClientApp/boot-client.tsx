
import * as ReactDOM from "react-dom/client";
import { ClientApp } from "./Components/Client App";
import { RootElement} from "./GetRouteElement.ts";

ReactDOM.createRoot(RootElement).render(
	<ClientApp apiRoot={RootElement.dataset.apiroot ?? null} />
);