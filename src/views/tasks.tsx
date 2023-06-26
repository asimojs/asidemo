import { component } from "@traxjs/trax-preact";
import { NavService, TasksStoreIID } from "../services/types";
import { asm } from "@asimojs/asimo";
import { useAsyncValue } from "../utils/async";
import { TasksViewIID } from "./types";


export const _TasksView = component("TasksView", ({ ns }: { ns: NavService }) => {
    const nd = ns.data;

    const r = useAsyncValue(() => asm.get(TasksStoreIID));
    if (!r.ready) return <div className="tasks-view"></div>;

    const data = r.value.data;

    return <div className="tasks-view">
        <h1 class="text-lg font-semibold mb-1">
            Current tasks
        </h1>
        <div>
            {/* Team id: {data.id} */}
        </div>
        <ul>
            {data.tasks.map((t, idx) => (
                <li class="list-['-'] ms-2 ps-3"> {t.description} {t.completed ? "(completed)" : ""} </li>
            ))}
        </ul>
    </div >
});

// Note: only entry-point components need to be retrieved through asimo
asm.registerService(TasksViewIID, () => _TasksView);


