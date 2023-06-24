import { component } from "@traxjs/trax-preact";
import { NavService, ViewId } from "../services/types";


export const MainLayout = component("MainLayout", ({ ns }: { ns: NavService }) => {
    const nd = ns.data;

    return <div className="main-layout flex h-screen">
        <div className="w-1/5 h-full max-w-xs min-w-fit">
            <NavBar ns={ns} />
        </div>
        <div className="flex-1 px-7 pt-56">
            {nd.view === "404" ? (
                <div> Invalid page: {nd.invalidPath404} </div>
            ) : (nd.view === "tasks") ? (
                <div> Task list </div>
            ) : (nd.view === "team") ? (
                <div> Team list </div>
            ) : (nd.view === "loading") ? (
                <div> Loading... </div>
            ) : (
                <div> Home </div>
            )}
        </div>
    </div>
});

const NavBar = component("NavBar", ({ ns }: { ns: NavService }) => {
    const view = ns.data.view;

    const links: { text: string, view: ViewId }[] = [
        { text: "Home", view: "" },
        { text: "Team", view: "team" },
        { text: "Task list", view: "tasks" },
    ];

    const selClass = "block font-semibold cursor-default ";
    const normalClass = "block text-fuchsia-300 cursor-pointer";

    return <div className="navbar bg-fuchsia-950 text-white h-full px-7 pt-56">
        {links.map(link => (
            <a className={link.view === view ? selClass : normalClass} href={link.view}
                onClick={e => ns.navigate(link.view, e)}> {link.text} </a>
        ))}
    </div>

});
