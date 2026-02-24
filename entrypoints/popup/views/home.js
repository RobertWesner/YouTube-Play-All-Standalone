import { $component } from '../src/component.js';
import { getTab, runOnTab } from '../src/tab.js';
import { Button } from '../components/ui/button.js';
import { View } from '../components/view.js';
import { Buttonlist } from '../components/ui/buttonlist.js';
import { navigateTo } from '../src/navigate.js';
import { FaSolid } from '../src/fontawesome.js';

export const HomeView = $component('div', builder => {
    const tab = getTab();
    const debugInfo = tab.then(tab => runOnTab(
        tab.id, () => document.querySelector('script#ytpa-debug-info').textContent,
    ));

    return builder.onBuildAppend(
        View.with({
            id: 'home',
            title: 'ytpa',
            subtitle: 'home',
        })(
            $component.resolve(
                Promise.all([tab, debugInfo]).then(([tab, debugInfo]) => (
                    !!tab && tab.url.match(/^https:\/\/.*?\.youtube\.com\//)
                ) ? [
                    Buttonlist(
                        Button.with({ onclick: () => navigateTo('about') })('About'),
                        Button.with({ onclick: () => navigateTo('settings') })('Settings'),
                        Button.with({ onclick: () => navigateTo('test') })('Test'),
                    ),
                    Button.with({
                        color: '#420000',
                        background: '#ffd4d4',
                        backgroundHover: '#f5bfbf',
                        onclick: () => window.open(`https://github.com/RobertWesner/YouTube-Play-All/issues/new?body=${
                            encodeURIComponent(
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
                            )
                        }
                `.trim())})(
                    FaSolid.with({ icon: 'bug' })(),
                    ' Report problem.',
                ),
                ] : [
                    'Cannot load outside of YouTube.',
                ]).catch(() => ['Cannot access current tab.']),
                'Loading...',
            ),
        ),
    );
});
