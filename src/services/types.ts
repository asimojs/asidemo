import { interfaceId } from "@asimojs/asimo";

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



