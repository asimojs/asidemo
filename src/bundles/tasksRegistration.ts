import { asm } from "@asimojs/asimo";
import { TasksStoreIID } from "../services/types";
import { GetTasksApiIID } from "../api/types";
import { TasksViewIID } from "../views/types";

asm.registerGroup([TasksStoreIID, GetTasksApiIID, TasksViewIID], () => import("./tasksBundle"));
