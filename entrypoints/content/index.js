import run from '../../prepared/ytpa.js';
import { initConsoleBridge } from '../../shim/bridge.js';
import { injectExposedScript } from '../../src/inject.js';

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

            browser.runtime.onMessage.addListener((msg) => {
                if (msg?.__YTPA__ === true && msg.type === 'DEV_CMD') {
                    const api = globalThis.__YTPA_CONSOLE_API__ ?? null;
                    if (api !== null) {
                        let cmd = api;
                        msg.method.split('.').forEach(part => cmd = cmd[part]);
                        cmd?.();
                    }
                }
            });

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

/**
 * @var {Record<any, any>} globalThis
 */
