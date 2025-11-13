import { defineConfig } from 'wxt';
import meta from './prepared/meta.json';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    manifest: {
        manifest_version: 3,
        name: 'YTPA - YouTube Play All',
        description: 'Standalone Extension for the YTPA userscript.',
        version: meta.browserVersion,
        action: { default_title: 'YTPA' },
        permissions: ['storage'],
        host_permissions: ['https://*.youtube.com/*', 'https://ytplaylist.robert.wesner.io/*'],
        browser_specific_settings: {
            gecko: { id: 'ytpa-standalone@scripts.yt', strict_min_version: '128.0' },
        },
        content_security_policy: {
            extension_pages: 'script-src \'self\'; object-src \'none\';',
        },
    },
});
