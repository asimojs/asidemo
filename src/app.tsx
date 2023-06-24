import { render } from 'preact';

import './css/app.css';
import './services/navservice';
import { NavServiceIID } from './services/types';
import { asm } from '@asimojs/asimo';
import { MainLayout } from './views/mainlayout';

async function main() {
    // initialize the navigation service
    const ns = await asm.get(NavServiceIID);

    render(<div className="text-neutral-600">
        <MainLayout ns={ns} />
    </div>, document.getElementById('main')!);
}

main();
