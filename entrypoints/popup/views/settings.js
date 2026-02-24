import { $component } from '../src/component.js';
import { getTab, runOnTab } from '../src/tab.js';
import { sendCmd } from '../src/cmd.js';
import { ButtonBack } from '../components/ui/button-back.js';
import { Buttonlist } from '../components/ui/buttonlist.js';
import { Button } from '../components/ui/button.js';
import { View } from '../components/view.js';

const showSettings = () => sendCmd('showSettings');
const clearSettings = () => sendCmd('storage.clear');

export const SettingsView = $component('div', builder => {
    const tab = getTab();
    const debugInfo = tab.then(tab => runOnTab(
        tab.id, () => document.querySelector('script#ytpa-debug-info').textContent,
    ));

    return builder.onBuildAppend(
        View.with({
            id: 'settings',
            title: 'ytpa',
            subtitle: 'settings',
        })(
            $component.resolve(
                Promise.all([tab, debugInfo]).then(([tab, debugInfo]) => [...(
                    !!tab && tab.url.match(/^https:\/\/.*?\.youtube\.com\//)
                ) ? [
                    Buttonlist(
                        Button.with({ onclick: showSettings })('Open settings dialog'),
                        Button.with({
                            background: '#fcf4b3',
                            backgroundHover: '#f2e9a2',
                            onclick: clearSettings,
                        })('Clear settings'),
                    ),
                ] : [
                    'Cannot load outside of YouTube.',
                ], ButtonBack()]).catch(() => ['Cannot access current tab.']),
                'Loading...',
            ),
        ),
    );
});
