import { defineConfig } from 'wxt';
import meta from './prepared/meta.json';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    webExt: {
        startUrls: [
            'https://www.youtube.com/@TechnologyConnections/videos',
        ],
    },
    manifest: {
        name: 'YTPA - YouTube Play All',
        description: 'Standalone Extension for the YTPA userscript.',
        version: meta.browserVersion,
        action: { default_title: 'YTPA' },
        permissions: ['storage', 'scripting', 'tabs'],
        host_permissions: ['https://*.youtube.com/*', 'https://ytplaylist.robert.wesner.io/*'],
        browser_specific_settings: {
            gecko: {
                id: 'ytpa-standalone@scripts.yt',
                data_collection_permissions: {
                    "required": [
                        "websiteContent",
                        "websiteActivity",
                        "browsingActivity",
                        "personallyIdentifyingInfo", // only for the playlist emulation... but required I guess
                    ],
                },
            },
        },
        content_security_policy: {
            extension_pages: 'script-src \'self\'; object-src \'none\';',
        },
        web_accessible_resources: [
            {
                resources: ["exposed/*", "exposed/js/*.js"],
                matches: ["https://*.youtube.com/*"],
            },
        ],
    },
    vite: () => ({
        build: {
            minify: false,
        },
    }),
});
