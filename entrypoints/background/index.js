import { browser } from '@wxt-dev/browser';

// TODO: refactor this ugly generated code, it was only meant to prove it to be possible

function arrayBufferToBase64(buf) {
    let binary = '';
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
}

// noinspection JSUnusedGlobalSymbols
export default defineBackground(() => {
    browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (!msg || msg.type !== 'GM_XHR') return; // not ours

        const req = msg.payload || {};
        const controller = new AbortController();
        const { signal } = controller;

        // Timeout support that behaves like GM.xmlHttpRequest's timeout option
        let timeoutId = null;
        if (typeof req.timeout === 'number' && req.timeout > 0) {
            timeoutId = setTimeout(() => controller.abort('timeout'), req.timeout);
        }

        (async () => {
            try {
                const headers = new Headers(req.headers || {});
                // GM has withCredentials=true by default; MV3 fetch uses credentials:'omit' unless told otherwise.
                const credentials = req.withCredentials === false ? 'omit' : 'include';

                // Build fetch init
                const init = {
                    method: (req.method || 'GET').toUpperCase(),
                    headers,
                    signal,
                    credentials,
                    // For binary/body pass-through; if you need form/urlencoded/json, serialize in content.js
                    body: req.data != null && req.method && req.method.toUpperCase() !== 'GET' ? req.data : undefined,
                    redirect: 'follow',
                    cache: 'no-store'
                };

                const res = await fetch(req.url, init);

                // Collect response headers as GM-style string
                const rawHeaders = [];
                res.headers.forEach((v, k) => rawHeaders.push(`${k}: ${v}`));
                const responseHeaders = rawHeaders.join('\r\n');

                // Handle responseType
                let response, responseText, responseArrayBuffer;
                const rt = (req.responseType || '').toLowerCase();

                if (rt === 'arraybuffer' || rt === 'blob' || rt === 'binary') {
                    const buf = await res.arrayBuffer();
                    responseArrayBuffer = buf;
                } else if (rt === 'json') {
                    const text = await res.text();
                    responseText = text;
                    try { response = JSON.parse(text); } catch { response = null; }
                } else {
                    responseText = await res.text();
                }

                clearTimeout?.(timeoutId);

                sendResponse({
                    ok: true,
                    status: res.status,
                    statusText: res.statusText,
                    finalUrl: res.url,
                    responseHeaders,
                    responseText,
                    response,
                    // Note: ArrayBuffers can’t cross MV3 messaging without structured cloning; we convert to base64
                    responseArrayBuffer: responseArrayBuffer
                        ? arrayBufferToBase64(responseArrayBuffer)
                        : undefined
                });
            } catch (err) {
                clearTimeout?.(timeoutId);
                const isTimeout = (err?.name === 'AbortError' && err?.message === 'timeout');
                sendResponse({
                    ok: false,
                    error: isTimeout ? 'timeout' : (err?.message || String(err))
                });
            }
        })();

        return true;
    });
});
