import { define, html, router } from 'hybrids';
import { browser } from '@wxt-dev/browser';
import '../components/view.js';
import '../components/ui/buttonlist.js';
import navigate from '../src/navigate.js';
import ViewAbout from './about.js';
import ViewSettings from './settings.js';
import { runOnTab, getTab } from '../src/tab.js';

const ViewHome = define({
    tag: 'ext-view-home',
    tab: async () => getTab(),
    debugInfo: async ({ tab }) => runOnTab((await tab).id, () => document.querySelector('script#ytpa-debug-info').textContent),
    render: ({ tab, debugInfo }) => html`
        <ext-view title="ytpa" subtitle="extension options">
            ${html.resolve(Promise.all([tab, debugInfo]).then(([tab, debugInfo]) => (
                !!tab && tab.url.match(/^https:\/\/.*?\.youtube\.com\//)
            ) ? html`
                <ext-buttonlist>
                    <ext-button onclick="${() => navigate(router.url(ViewAbout))}">
                        About
                    </ext-button>
                    <ext-button onclick="${() => navigate(router.url(ViewSettings))}">
                        Settings
                    </ext-button>
                </ext-buttonlist>
                <ext-button background="#ffd4d4" background-hover="#f5bfbf" color="#420000" onclick="${() => window.open(`
                    https://github.com/RobertWesner/YouTube-Play-All/issues/new?body=${encodeURIComponent(
`
# Standalone Extension Bug Report

## Bug



    The exact issue you are facing.



## Expected Behavior



    What should have happened.



## Debug Information

\`\`\`json
${debugInfo}
\`\`\`
`,
                    )}
                `.trim())}">
                    <fa-solid icon="bug" ></fa-solid> Report problem.
                </ext-button>
            ` : html`
                Cannot load YTPA outside of YouTube.
            `), html`
                Loading...
            `)}
        </ext-view>
    `,
});

export default ViewHome;

/**
 * @var {Record<any, any>} globalThis
 */
