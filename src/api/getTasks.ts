/**
 * This file should be generated from an OpenAPI definition file
 * Its goal is to generate typed API functions that map the server REST APIs
 */

import { asm } from "@asimojs/asimo";
import { ErrorResponse, GetTasksApiIID, GetTasksResponse } from "./types";
import { FetchServiceIID } from "../services/types";

/**
 * Get Team
 * @param query
 */
async function _getTasks(query: { teamId: string }): Promise<GetTasksResponse | ErrorResponse> {
    const fs = await asm.get(FetchServiceIID);
    let errMsg = "";

    try {
        const r = await fs.fetch(`/api/tasks/${query.teamId}`);

        if (r.ok) {
            const body = await r.json();
            return body as GetTasksResponse;
        }

        errMsg = "" + r.text;
    } catch (ex) {
        errMsg = "" + ex;
    }

    return {
        type: "Error",
        message: errMsg
    };
}

asm.registerService(GetTasksApiIID, () => _getTasks);

