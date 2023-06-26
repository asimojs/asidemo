import { Store, trax } from "@traxjs/trax";
import { TasksStore, TasksStoreIID } from "./types";
import { ErrorResponse, GetTasksAPI, GetTasksApiIID, GetTasksResponse } from "../api/types";
import { asm } from "@asimojs/asimo";


const TEAM_ID = "teamA"; // TODO: retrieve from config service

export function _createTasksStore() {
    return trax.createStore("TeamStore", (store: Store<TasksStore["data"]>) => {
        let getTasks: GetTasksAPI;

        const data = store.init({
            tasks: []
        }, {
            init: function* (d, cc) {
                // async store initialization from the GetTasksAPI API
                cc.maxComputeCount = 1; // run once
                getTasks = yield asm.get(GetTasksApiIID);
                const r: GetTasksResponse | ErrorResponse = yield getTasks({ teamId: TEAM_ID });
                if (r.type === "GetTasksResponse") {
                    trax.updateArray(d.tasks, r.tasks);
                }
            }
        });

        return {
            data
        }
    });
}

asm.registerService(TasksStoreIID, _createTasksStore);
