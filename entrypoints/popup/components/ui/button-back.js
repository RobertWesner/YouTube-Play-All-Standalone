import { define, html, router } from 'hybrids';
import './button.js';
import navigate from '../../src/navigate.js';
import ViewHome from '../../views/home.js';

// noinspection JSUnusedGlobalSymbols
export default define({
    tag: 'ext-button-back',
    render: () => html`
        <ext-button onclick="${() => navigate(router.backUrl() || router.url(ViewHome))}">
            Back
        </ext-button>
    `,
});
