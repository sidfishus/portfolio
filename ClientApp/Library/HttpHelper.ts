
//sidtodo change the URL?
export const CreateAPIURL = (url: string, params: string = null): string => {
	return `http://localhost:5100/api/${url}${((params)?`?${params}`:"")}`;
};