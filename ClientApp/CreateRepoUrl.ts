import { IsDebug} from "./IsDebug.ts";

export const CreateRepoUrl = (url: string): string => {

    if(IsDebug)
        return "/" + url;

    return `https://github.com/sidfishus/react-spa-demo/blob/master/public/${url}?raw=true`;
}