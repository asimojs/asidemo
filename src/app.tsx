import { render } from 'preact';
import { asm } from '@asimojs/asimo';
import { NavServiceIID } from './services/types';
import { MainLayout } from './views/mainlayout';
import './css/app.css';
import './bundles';

async function main() {
    // check if mockenv must be loaded
    const RX_TEST_PROFILE_ID = /me=([0-9]+)/;
    const idMatch = window.location.search.match(RX_TEST_PROFILE_ID);
    if (idMatch) {
        const m = await import('./mockenv');
        m.mockEnv.setProfile(parseInt(idMatch[1], 0));
    }

    // initialize the navigation service
    const ns = await asm.get(NavServiceIID);

    render(<div className="text-neutral-600">
        <MainLayout ns={ns} />
    </div>, document.getElementById('main')!);
}

main();
