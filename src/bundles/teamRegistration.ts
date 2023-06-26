import { asm } from "@asimojs/asimo";
import { TeamStoreIID } from "../services/types";
import { GetTeamApiIID } from "../api/types";
import { TeamViewIID } from "../views/types";

asm.registerGroup([TeamStoreIID, GetTeamApiIID, TeamViewIID], () => import("./teamBundle"));
