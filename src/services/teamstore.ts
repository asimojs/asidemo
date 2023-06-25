import { Store, trax } from "@traxjs/trax";
import { TeamStore, TeamStoreIID } from "./types";
import { ErrorResponse, GetTeamAPI, GetTeamApiIID, GetTeamResponse } from "../api/types";
import { asm } from "@asimojs/asimo";


const TEAM_ID = "teamA"; // TODO: retrieve from config service

export function createTeamStore() {
    return trax.createStore("TeamStore", (store: Store<TeamStore["data"]>) => {
        let getTeam: GetTeamAPI;

        const data = store.init({
            id: "",
            name: "",
            members: []
        }, {
            init: function* (d, cc) {
                // async store initialization from the GetTeam API
                cc.maxComputeCount = 1; // run once
                getTeam = yield asm.get(GetTeamApiIID);
                const r: GetTeamResponse | ErrorResponse = yield getTeam({ teamId: TEAM_ID });
                if (r.type === "GetTeamResponse") {
                    d.id = r.team.id;
                    d.name = r.team.name;
                    trax.updateArray(d.members, r.team.members);
                }
            }
        });

        return {
            data
        }
    });
}

asm.registerService(TeamStoreIID, createTeamStore);
