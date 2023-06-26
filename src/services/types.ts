import { interfaceId } from "@asimojs/asimo";
import { Task, User } from "../api/types";

export const NavServiceIID = interfaceId<NavService>("asidemo.services.NavService");
export interface NavService {
    data: {
        /** Current view */
        view: ViewId | "loading";
        /** Service instances - undefined if not loaded */
        services: {

        },
        /** Invalid path in case of 404 route */
        invalidPath404?: string;
    },
    /** Navigate to one of the views */
    navigate(dest?: ViewId, event?: Event): void;
}

/** Main views */
export type ViewId = "tasks" | "team" | "" | "404";



export const FetchServiceIID = interfaceId<FetchService>("asidemo.services.FetchService");
export interface FetchService {
    data: {
        /** Tell if the app is disconnected */
        networkDisconnection: boolean;
    },
    /** Fetch a resource and adds timeout support */
    fetch(resource: RequestInfo | URL, options?: RequestInit & { timeout?: number }): Promise<Response>;
}


export const TeamStoreIID = interfaceId<TeamStore>("asidemo.services.TeamStore");
export interface TeamStore {
    data: {
        id: string;
        name: string;
        members: User[]
    }
}

export const TasksStoreIID = interfaceId<TasksStore>("asidemo.services.TasksStore");
export interface TasksStore {
    data: {
        tasks: Task[]
    }
}
