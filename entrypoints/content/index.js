import run from '../../prepared/ytpa.js';
import { initConsoleBridge } from '../../shim/bridge.js';
import { injectExposedScript } from '../../shim/inject.js';

// noinspection JSUnusedGlobalSymbols
export default defineContentScript({
    matches: [
        'https://*.youtube.com/*',
    ],
    run_at: 'document_start',
    async main() {
        const doRun = () => {
            initConsoleBridge();
            run();
        };

        try {
            injectExposedScript('bridge-page.js');

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', doRun, { once: true });
            } else {
                doRun();
            }
        } catch (e) {
            console.error('[YTPA] bootstrap failed:', e);
        }
    },
});
