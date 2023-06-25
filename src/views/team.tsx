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
        <div>
            Team view
        </div>
        <div>
            Team id: {data.id}
        </div>
        <div>
            {data.members.map((m, idx) => (
                <div> Member #{idx + 1}: {m.firstName} {m.lastName} </div>
            ))}
        </div>
    </div>
});

asm.registerService(TeamViewIID, () => _TeamView);


