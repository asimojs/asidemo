import { component } from "@traxjs/trax-preact";
import { NavService } from "../services/types";

export const HomeView = component("HomeView", ({ ns }: { ns: NavService }) => {

    const liClass = "list-['-'] ms-2 ps-3";

    return <div class="home-view pe-16 max-w-6xl pb-9">
        <p>
            This mini-application demonstrates how to architecture a web application
            with <a class="link em" href="https://github.com/asimojs/asimo" target="_blank">asimo</a> in order to
            <em> keep the application startup fast</em>, independently from the number of application modules, and
            <em> build a mock environment</em> that can be
            used during the application development but also for demos and automated integration tests.
        </p>
        <h2 class="pt-4 pb-2 text-lg font-medium">
            Application startup
        </h2>

        <p>
            One of the main problems
            of <a class="link em" href="https://en.wikipedia.org/wiki/Single-page_application">SPA</a> applications is that their startup get slower when new
            features keep being added. Even though web browsers
            support <a class="link em" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import">dynamic imports</a> that
            technically allow
            to progressively load the application piece by piece, the problem is that splitting an existing code base
            into efficient bundles is a very difficult task once the application is already implemented.
        </p>
        <p class="mt-2">
            <a class="link em" href="https://github.com/asimojs/asimo" target="_blank">Asimo</a> solves this problem
            by decoupling interfaces from their implementations and <em>loading dependencies on-demand, asynchronously</em>. Code entities
            depend on typescript interfaces, but rely on asimo to import the actual
            implementation so that code entities don't drag their entire dependency tree when they are imported in a give file.
            This allows asimo bundles to be defined separately, and independently from the code structure
            (in other words bundles can be re-defined once the application has been implemented, according to the application
            usage).
        </p>
        <p class="mt-2">
            In this demo the application is split in <a class="link em" href="https://github.com/asimojs/asidemo/blob/main/src/bundles.ts">3 bundles</a>:
            <ul>
                <li class={liClass}>the <em>core bundle</em> that contains the main application files that need to be systematically loaded
                    (e.g. the application framework or the navigation service that determines which view is displayed according to the URL)
                </li>
                <li class={liClass}>the <a class="link em" href="https://github.com/asimojs/asidemo/blob/main/src/bundles/teamBundle.ts">team
                    bundle</a> that gathers the files that need to be loaded when the Team view is requested
                </li>
                <li class={liClass}>the <a class="link em" href="https://github.com/asimojs/asidemo/blob/main/src/bundles/tasksBundle.ts">tasks
                    bundle</a> that gathers the files used by the Tasks view
                </li>
            </ul>
        </p>
        <p class="mt-2">
            The application also exposes 3 entry points (aka. routes):
            <li class={liClass}>
                the <a class="link em" href="./">/</a> home page, that only loads the core bundle
            </li>
            <li class={liClass}>
                the <a class="link em" href="./team">/team</a> page, that loads the core bundle and the team bundle
            </li>
            <li class={liClass}>
                the <a class="link em" href="./tasks">/tasks</a> page, that loads the core bundle and the tasks bundle
            </li>
        </p>
        <p class="mt-2">
            Then navigating to other views will transparently load the missing bundles, until all bundles are loaded.
            This can be easily validated through the Network tab in the Dev. tools:

            <div class="flex justify-center py-8">
                <img src="./imgs/devtools.jpg" class="w-10/12 max-w-[600px]" />
            </div>
        </p>

        <h2 class="pt-4 pb-2 text-lg font-medium">
            Mock Environment
        </h2>

        <p>
            Like any dependency-injection mechanism, asimo can replace core services with mock implementations.
            However, as asimo retrieves dependencies asynchronously, it can also dynamically load a mock environment.
        </p>
        <p class="mt-2">
            This is what is implemented in this demo: when the url contains a <em>me</em> parameter
            (for Mock Environment), the application
            loads a mock service and initializes it with the profile id passed as parameter value:
            <div class="flex justify-center py-8">
                <img src="./imgs/mockenvtrigger.jpg" class="w-10/12 max-w-[600px]" />
            </div>

            The mock environment will
            then <a class="link em" href="https://github.com/asimojs/asidemo/blob/29fc43bd2c5d4b95d45054ad2e66135976bf8e4e/src/mockenv/index.ts#L32">override
                the fetch service</a> that wraps the browser fetch API in order
            to dynamically <em>mock fetch responses</em> and work without any server.
        </p>
        <p class="mt-2">
            This approach offers many benefits:
            <ul>
                <li class={liClass}> on the contrary to static mock techniques, <em>this approach is dynamic</em>, which means that <em>mocks can easily
                    integrate values from previous actions</em> (this is because the mock service can keep
                    a state in memory and use it to build mock responses - like in
                    this <a class="link em" href="https://github.com/asimojs/asidemo/blob/29fc43bd2c5d4b95d45054ad2e66135976bf8e4e/src/mockenv/fetch.ts#L10">example</a>).
                    This comes in handy to handle advanced cases
                    where multiple responses need to use common objects or identifiers (e.g. an asymmetric architecture with REST apis
                    and SSE events that need to reference the same resource ids).
                </li>
                <li class={liClass}>
                    <em>multiple profiles can be supported</em> - which is convenient to test edge cases (like very small or very large data sets, long names, etc.). This demo
                    implements two different profiles
                    (cf. <a class="link em" href="./tasks?me=1">/tasks?me=1
                    </a> or  <a class="link em" href="./team?me=2">/team?me=2</a> that uses a very long team name)
                </li>
                <li class={liClass}>
                    the <em>mocks are easy to maintain</em> as they use the same types exposed by the server APIs - so
                    any change in the APIs result in typesript compilation error in the mock environment. Besides
                    mocks can also be easily derived from each other, which also reduces the maintainance complexity
                </li>
            </ul>

        </p>
        <p class="mt-36 italic">
            Feel free to visit the <a class="link" href="https://github.com/asimojs/asidemo">project page</a> to get
            into the implementation details...
        </p>
    </div>
});
