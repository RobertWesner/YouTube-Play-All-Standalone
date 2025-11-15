import meta from '../prepared/meta.json';
import { browser } from '@wxt-dev/browser';

export const GM_info = { script: { version: meta.version } };
export const GM = {
    xmlHttpRequest(options) {
        const { method = 'GET', url, headers, data } = options;
        // noinspection JSIgnoredPromiseFromCall
        browser.runtime.sendMessage(
            {
                type: 'GM_xmlHttpRequest',
                payload: { method, url, headers, data },
            },
            response => {
                if (browser.runtime.lastError || !response) {
                    return options?.onerror?.({ error: browser.runtime.lastError?.message || 'no-response' });
                }

                if (!response.ok) {
                    options?.onerror?.({ error: response.error || 'network-error' });

                    return;
                }

                const out = {
                    finalUrl: response.finalUrl,
                    status: response.status,
                    statusText: response.statusText,
                    responseHeaders: response.responseHeaders,
                    responseText: response.responseText,
                    response: response.response ?? response.responseText,
                };

                options?.onload?.(out);
            },
        );
    }
};
