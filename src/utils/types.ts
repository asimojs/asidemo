import { interfaceId } from "@asimojs/asimo";


export const FetchIID = interfaceId<Fetch>("asidemo.utils.Fetch");
export type Fetch = (resource: RequestInfo | URL, options?: RequestInit) => Promise<Response>;


