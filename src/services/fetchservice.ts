import { Store, trax } from "@traxjs/trax";
import { FetchService, FetchServiceIID } from "./types";
import { Fetch, FetchIID } from "../utils/types";
import { asm } from "@asimojs/asimo";

/**
 * Application fetch: wrapp the Browser fetch API to implement common behaviour and support a functional timeout
 * Such as Security checks / error handling / exponential backoff on certain type of errors
 * Note: this service is implemented as a store to expose state data that can be used in the UI
 * to display information in case of network errors
 */
export function _createFetchService(): FetchService {
    return trax.createStore("FetchService", (store: Store<FetchService["data"]>) => {
        const data = store.init({
            networkDisconnection: false // TODO
        });

        let fetch: Fetch;
        let fetchPromise: null | Promise<Fetch> = null;

        return {
            data,
            async fetch(resource: RequestInfo | URL, options?: RequestInit & { timeout?: number }): Promise<Response> {
                if (!fetch) {
                    if (!fetchPromise) {
                        fetchPromise = asm.get(FetchIID); // share promise in case of concurrent calls
                    }
                    fetch = await fetchPromise;
                }
                // TODO: implement timeout, general error handling (exp backoff, etc.)
                return fetch(resource, options);
            }
        }
    });
}

asm.registerService(FetchServiceIID, _createFetchService);
