/**
 * This file should be generated from an OpenAPI definition file
 * Its goal is to generate typed API functions that map the server REST APIs
 */

import { interfaceId } from "@asimojs/asimo";

export interface Team {
    id: string;
    name: string;
    members: User[];
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
}

export interface ErrorResponse {
    type: "Error";
    message: string;
}

export const GetTeamApiIID = interfaceId<GetTeamAPI>("asidemo.api.GetTeamAPI");

export interface GetTeamAPI {
    (query: { teamId: string }): Promise<GetTeamResponse | ErrorResponse>;
}

export interface GetTeamResponse {
    type: "GetTeamResponse";
    team: Team;
}


