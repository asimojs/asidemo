import { render } from 'preact';
import { asm } from '@asimojs/asimo';
import { NavServiceIID } from './services/types';
import { MainLayout } from './views/mainlayout';
import './css/app.css';
import './bundles';

async function main() {
    // check if mockenv must be loaded if a me url param is found (e.g. /team?me=2)
    const idMatch = window.location.search.match(/me=([0-9]+)/);
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
