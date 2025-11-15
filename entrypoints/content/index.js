import run from '../../prepared/ytpa.js';

// noinspection JSUnusedGlobalSymbols
export default defineContentScript({
    matches: [
        'https://*.youtube.com/*',
    ],
    run_at: 'document_start',
    async main() {
        try {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', run, { once: true });
            } else {
                run();
            }
        } catch (e) {
            console.error('[YTPA] bootstrap failed:', e);
        }
    },
});
