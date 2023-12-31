import { asm } from "@asimojs/asimo";
import { FetchIID } from "./types";
import { GetTasksResponse, GetTeamResponse } from "../api/types";

/**
 * This is a custo fetch implementaion to return local demo data instead of calling the actual server
 * Note: this overrides the browser fetch, but is not a full fledged mock environment
 * @see mockenv
 */
export async function _fetch(resource: RequestInfo | URL, options?: RequestInit): Promise<Response> {
    // console.log("Fetch", resource);

    if (resource === "/api/team/teamA") {
        const r: GetTeamResponse = {
            type: "GetTeamResponse",
            team: {
                id: "teamA",
                name: "The A Team",
                members: [
                    {
                        id: "USR1",
                        firstName: "John (Hannibal)",
                        lastName: "Smith"
                    }, {
                        id: "USR2",
                        firstName: "Templeton (Face)",
                        lastName: "Peck"
                    }, {
                        id: "USR3",
                        firstName: "H.M. (Howling Mad)",
                        lastName: "Murdock"
                    }, {
                        id: "USR4",
                        firstName: "Bosco (B.A.)",
                        lastName: "Baracus"
                    }
                ]
            }
        }
        return new Response(JSON.stringify(r));
    } else if (resource === "/api/tasks/teamA") {
        const r: GetTasksResponse = {
            type: "GetTasksResponse",
            tasks: [
                {
                    id: "T1",
                    description: "Code & Test",
                    completed: false,
                    createdBy: "USR1"
                }, {
                    id: "T2",
                    description: "Refactor",
                    completed: false,
                    createdBy: "USR1"
                }, {
                    id: "T3",
                    description: "Deploy",
                    completed: false,
                    createdBy: "USR1"
                }, {
                    id: "T4",
                    description: "Repeat!",
                    completed: false,
                    createdBy: "USR1"
                }
            ]
        }
        return new Response(JSON.stringify(r));
    } else {
        console.log(`Unsupported fetch mock: ${resource}`);
    }

    return fetch(resource, options);
}

asm.registerService(FetchIID, () => _fetch);
