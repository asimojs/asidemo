import { MockService } from ".";
import { GetTasksResponse, GetTeamResponse } from "../api/types";


export function getFetch(me: MockService) {

    return async function _fetch(resource: RequestInfo | URL, options?: RequestInit): Promise<Response> {
        // fetch data can be dynamically created according to me.profile and me context

        if (resource === "/api/team/teamA") {
            const r: GetTeamResponse = {
                type: "GetTeamResponse",
                team: {
                    id: me.data.teamId,
                    name: me.data.teamName,
                    members: Object.getOwnPropertyNames(me.data.users).map(name => me.data.users[name])
                }
            }
            return new Response(JSON.stringify(r));
        } else if (resource === "/api/tasks/teamA") {
            const r: GetTasksResponse = {
                type: "GetTasksResponse",
                tasks: [
                    {
                        id: "T1",
                        description: "Eat",
                        completed: false,
                        createdBy: "USR1"
                    }, {
                        id: "T2",
                        description: "Drink",
                        completed: false,
                        createdBy: "USR1"
                    }, {
                        id: "T3",
                        description: "Deploy",
                        completed: false,
                        createdBy: "USR1"
                    }, {
                        id: "T4",
                        description: "Watch TV",
                        completed: false,
                        createdBy: "USR1"
                    }, {
                        id: "T5",
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
}
