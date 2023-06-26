/**
 * This file should be generated from an OpenAPI definition file
 * Its goal is to generate typed API functions that map the server REST APIs
 */

import { interfaceId } from "@asimojs/asimo";

// ----------------------------------------------------------------------------------
// GetTeamAPI
export interface Team {
    id: string;
    name: string;
    members: User[];
    // real life apps should include pagination cursors on members
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

// ----------------------------------------------------------------------------------
// GetTasksAPI

export interface Task {
    id: string;
    description: string;
    completed: boolean;
    createdBy: User["id"];
}

export const GetTasksApiIID = interfaceId<GetTasksAPI>("asidemo.api.GetTasksAPI");

export interface GetTasksAPI {
    (query: { teamId: string }): Promise<GetTasksResponse | ErrorResponse>;
}

export interface GetTasksResponse {
    type: "GetTasksResponse";
    tasks: Task[];
    // real life apps should include pagination cursors on tasks
}
