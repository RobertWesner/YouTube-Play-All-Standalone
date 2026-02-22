import { define, html } from 'hybrids';
import '../components/view.js';
import '../components/ui/button-back.js';
import { getTab } from '../src/tab.js';
import sendCmd from '../src/cmd.js';

const showSettings = () => sendCmd('showSettings');
const clearSettings = () => sendCmd('storage.clear');

const ViewSettings = define({
    tag: 'ext-view-settings',
    tab: async () => getTab(),
    render: ({ tab }) => html`
        <ext-view title="ytpa" subtitle="settings">
            ${html.resolve(tab.then(tab => (
                !!tab && tab.url.match(/^https:\/\/.*?\.youtube\.com\//)
            ) ? html`
                <ext-buttonlist>
                    <ext-button onclick="${showSettings}">
                        Open settings dialog
                    </ext-button>
                    <ext-button background="#fcf4b3" background-hover="#f2e9a2" onclick="${clearSettings}">
                        Clear settings
                    </ext-button>
                </ext-buttonlist>
            ` : html`
                Settings only available on YouTube.
            `), html`
                Loading...
            `)}
            <ext-button-back></ext-button-back>
        </ext-view>
    `,
});

export default ViewSettings;
