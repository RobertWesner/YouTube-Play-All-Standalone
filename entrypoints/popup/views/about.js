import { define, html } from 'hybrids';
import '../components/view.js';
import '../components/ui/button-back.js';
import meta from '../../../prepared/meta.json';

const ViewAbout = define({
    tag: 'ext-view-about',
    render: ({ }) => html`
        <style>
            #about {
                padding: 0.6rem;
                background-color: rgba(0, 0, 0, 0.064);
                border-radius: var(--corner);
            }
        </style>
        <ext-view title="ytpa" subtitle="about">
            <ext-container>
                <div id="about">
                    Userscript version:
                    <div><code>${meta.version}</code></div>
                </div>
            </ext-container>
            <ext-button-back></ext-button-back>
        </ext-view>
    `,
});

export default ViewAbout;
