import { render } from 'preact';

import './css/app.css';

async function main() {
    render(<div className="text-neutral-600 p-4 px-5">
        Hello World
    </div>, document.getElementById('main')!);
}

main();
