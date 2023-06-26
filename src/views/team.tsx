import { component } from "@traxjs/trax-preact";
import { NavService, TeamStoreIID } from "../services/types";
import { asm } from "@asimojs/asimo";
import { useAsyncValue } from "../utils/async";
import { TeamViewIID } from "./types";


export const _TeamView = component("TeamView", ({ ns }: { ns: NavService }) => {
    const nd = ns.data;

    const r = useAsyncValue(() => asm.get(TeamStoreIID));
    if (!r.ready) return <div className="team-view"></div>;

    const data = r.value.data;

    return <div className="team-view">
        <h1 class="text-lg font-semibold mb-1">
            {data.name}
        </h1>
        <ul>
            {data.members.map((m, idx) => (
                <li class="list-['-'] ms-2 ps-3"> Member #{idx + 1}: {m.firstName} {m.lastName} </li>
            ))}
        </ul>
    </div>
});

// Note: only entry-point components need to be retrieved through asimo
asm.registerService(TeamViewIID, () => _TeamView);


