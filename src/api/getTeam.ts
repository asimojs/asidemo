/**
 * This file should be generated from an OpenAPI definition file
 * Its goal is to generate typed API functions that map the server REST APIs
 */

import { asm } from "@asimojs/asimo";
import { ErrorResponse, GetTeamApiIID, GetTeamResponse } from "./types";
import { FetchServiceIID } from "../services/types";

/**
 * Get Team
 * @param query
 */
async function _getTeam(query: { teamId: string }): Promise<GetTeamResponse | ErrorResponse> {
    const fs = await asm.get(FetchServiceIID);
    let errMsg = "";

    try {
        const r = await fs.fetch(`/api/team/${query.teamId}`);

        if (r.ok) {
            const body = await r.json();
            return body as GetTeamResponse;
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

asm.registerService(GetTeamApiIID, () => _getTeam);

