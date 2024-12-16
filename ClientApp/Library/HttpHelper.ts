
export const CreateAPIURL = (url: string, params: string|null = null): string => {
	return `/api/${url}${((params)?`?${params}`:"")}`;
};