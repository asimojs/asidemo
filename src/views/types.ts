import { interfaceId } from "@asimojs/asimo";
import { NavService } from "../services/types"

export const TeamViewIID = interfaceId<TeamView>("asidemo.views.teamview");
interface TeamView {
    (props: { ns: NavService }): JSX.Element;
}
