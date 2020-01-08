
import axios from "axios";

//sidtodo change the URL?
export const CreateAPIURL = (url: string, params: string = null): string => {
	return `http://localhost:5100/api/${url}${((params)?`?${params}`:"")}`;
}

export const HttpPostJSON = (url: string, json: object) => {
	return axios.post(url, json);
}