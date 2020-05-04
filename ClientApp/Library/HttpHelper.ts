
//sidtodo change the URL?
export const CreateAPIURL = (url: string, params: string = null): string => {
	return `./api/${url}${((params)?`?${params}`:"")}`;
};