import { define, html, router } from 'hybrids';
import './fontawesome.js';
import ViewHome from '../views/home.js';
import ViewSettings from '../views/settings.js';
import ViewAbout from '../views/about.js';

// noinspection JSUnusedGlobalSymbols
export default define({
    tag: 'ext-popup',
    stack: router([ViewHome, ViewSettings, ViewAbout]),
    render: ({ stack }) => html`
        <style>
            :host {
                flex: 1;
                display: flex;
                flex-direction: column;
            }
        </style>
        ${stack}
    `,
});
