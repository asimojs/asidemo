import { component } from "@traxjs/trax-preact";
import { NavService, ViewId } from "../services/types";
import { useAsyncData } from "../utils/async";
import { asm } from "@asimojs/asimo";
import { TasksViewIID, TeamViewIID } from "./types";
import { h } from "preact";
import { HomeView } from "./home";


export const MainLayout = component("MainLayout", ({ ns }: { ns: NavService }) => {
    const nd = ns.data;

    const res = useAsyncData({
        teamView: () => asm.get(TeamViewIID),
        tasksView: () => asm.get(TasksViewIID)
    });

    return <div className="main-layout flex h-full min-h-screen">
        <div className="w-1/5 min-h-full max-w-xs min-w-fit">
            <NavBar ns={ns} />
        </div>
        <div className="relative flex-1 px-7">
            <div className="logo absolute w-full max-w-6xl">
                <div class="absolute top-10 right-20 text-fuchsia-950">
                    <GithubLogo size={42} />
                </div>

            </div>
            <div class="pt-56">
                {nd.view === "404" ? (
                    <div> Invalid page: {nd.invalidPath404} </div>
                ) : (nd.view === "tasks") ? (
                    // create TasksView component when ready
                    res.tasksView().ready ? h(res.tasksView().value!, { ns }) : ""
                ) : (nd.view === "team") ? (
                    // create TeamView component when ready
                    res.teamView().ready ? h(res.teamView().value!, { ns }) : ""
                ) : (nd.view === "loading") ? (
                    <div> Loading... </div>
                ) : (
                    <HomeView ns={ns} />
                )}
            </div>
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

    return <div className="navbar bg-fuchsia-950 text-white h-full px-7">
        <h1 class="title pt-36 text-2xl">
            Asimo Demo
        </h1>
        <div class="pt-12">
            <a className={normalClass}
                href="https://docs.google.com/presentation/d/1NfAnUP9j1HitSrCWxmEuJs3ATZnbHdN8N_q1GLW29hU/view"
                target="_blank">
                    Presentation slides
            </a>
        </div>
        <div class="pt-5">
            {links.map(link => (
                <a className={link.view === view ? selClass : normalClass} href={link.view}
                    onClick={e => ns.navigate(link.view, e)}> {link.text} </a>
            ))}
        </div>
    </div>
});

const GithubLogo = component("GithubLogo", ({ size }: { size?: number }) => {
    size = size || 28;
    return <a href="https://github.com/asimojs/asidemo" target="_blank" aria-valuetext="Link to project's Github page">
        <svg width={size} height={size} viewBox="0 0 96 98" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-current" fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
        </svg>
    </a>
});
