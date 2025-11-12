import fix from '../../gm-polyfill.js';
import run from '../../prepared/ytpa.js';

// noinspection JSUnusedGlobalSymbols
export default defineContentScript({
    matches: [
        'https://*.youtube.com/*',
    ],
    run_at: 'document_start',
    async main() {
        try {
            const start = () => {
                fix();
                run();
            };

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', start, { once: true });
            } else {
                start();
            }
        } catch (e) {
            console.error('[YTPA] bootstrap failed:', e);
        }
    },
});
