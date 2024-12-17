
export const CreateAPIURL = (root: string|null,url: string, params: string|null = null): string => {
	const urlWithQueryParams = `/api/${url}${((params)?`?${params}`:"")}`;

	return root
		? root + urlWithQueryParams
		: urlWithQueryParams;
};