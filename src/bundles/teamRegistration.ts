import { asm } from "@asimojs/asimo";
import { TeamStoreIID } from "../services/types";
import { GetTeamApiIID } from "../api/types";
import { TeamViewIID } from "../views/types";

// associate the team bundle APIs to the team bundle file
// note: this file could be generated
asm.registerGroup([TeamStoreIID, GetTeamApiIID, TeamViewIID], () => import("./teamBundle"));
