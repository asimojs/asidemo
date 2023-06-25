import { asm } from "@asimojs/asimo";
import { FetchIID } from "./types";

/**
 * Browser fetch wrapper
 * Called by the Application Fetch Service and overridden by the test system to mock server responses
 */
export async function _fetch(resource: RequestInfo | URL, options?: RequestInit): Promise<Response> {
    return fetch(resource, options);
}

asm.registerService(FetchIID, () => _fetch);
