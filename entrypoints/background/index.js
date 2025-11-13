import { browser } from '@wxt-dev/browser';

/**
 * Simple and very limited shim for GM.xmlHttpRequest() handling.
 * Only useful for my specific use case, not a proper general shim!
 */
const handle_GM_xmlHttpRequest = (msg, sendResponse) => {
    const request = msg.payload || {};
    (async () => {
        try {
            const response = await fetch(request.url, {
                method: (request.method || 'GET').toUpperCase(),
                headers: new Headers(request.headers || {}),
                credentials: 'omit',
                body: request.data,
                redirect: 'follow',
                cache: 'no-store'
            });

            sendResponse({
                ok: true,
                status: response.status,
                statusText: response.statusText,
                finalUrl: response.url,
                responseHeaders: Array
                    .from(response.headers)
                    .map((value, header) => `${header}: ${value}`)
                    .join('\r\n'),
                responseText: await response.text(),
            });
        } catch (err) {
            sendResponse({
                ok: false,
                error: (err?.message || String(err))
            });
        }
    })();

    return true;
};

// noinspection JSUnusedGlobalSymbols
export default defineBackground(() => {
    browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (!msg || !msg?.type) return;

        switch (msg.type) {
            case 'GM_xmlHttpRequest':
                return handle_GM_xmlHttpRequest(msg, sendResponse);
        }

        return false;
    });
});
