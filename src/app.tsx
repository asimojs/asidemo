import { render } from 'preact';
import { asm } from '@asimojs/asimo';
import { NavServiceIID, TeamStoreIID } from './services/types';
import { MainLayout } from './views/mainlayout';
import { GetTeamApiIID } from './api/types';
import { TeamViewIID } from './views/types';
import './css/app.css';

// main bundle (order doesn't matter)
import './utils/fetch';
import './services/fetchservice';
import './services/navservice';
import './utils/demoFetch'; // must be after ./utils/fetch

// Bundles
asm.registerGroup([TeamStoreIID, GetTeamApiIID, TeamViewIID], () => import("./bundles/teamBundle"));

async function main() {
    // initialize the navigation service
    const ns = await asm.get(NavServiceIID);

    render(<div className="text-neutral-600">
        <MainLayout ns={ns} />
    </div>, document.getElementById('main')!);
}

main();
