import meta from './prepared/meta.json';
import { browser } from '@wxt-dev/browser';

// TODO: refactor this ugly generated code, it was only meant to prove it to be possible

const fix = () => {
    window.GM_info = { script: { version: meta.realVersion } };
    window.GM ||= {}

    GM.xmlHttpRequest = function (opts = {}) {
        const { method='GET', url, headers, data, responseType, timeout, withCredentials } = opts;
        // noinspection JSIgnoredPromiseFromCall
        browser.runtime.sendMessage(
            { type: 'GM_XHR', payload: { method, url, headers, data, responseType, timeout, withCredentials } },
            (res) => {
                if (browser.runtime.lastError || !res) return opts.onerror?.({ error: browser.runtime.lastError?.message || 'no-response' });
                if (res.ok) {
                    const out = {
                        finalUrl: res.finalUrl, status: res.status, statusText: res.statusText,
                        responseHeaders: res.responseHeaders,
                        responseText: res.responseText,
                        response: res.response ?? res.responseText,
                    };
                    if (res.responseArrayBuffer) {
                        const bytes = Uint8Array.from(atob(res.responseArrayBuffer), c => c.charCodeAt(0));
                        out.response = bytes.buffer;
                    }
                    opts.onload?.(out);
                } else {
                    (res.error === 'timeout' ? opts.ontimeout : opts.onerror)?.({ error: res.error || 'network-error' });
                }
            }
        );
        return { abort(){} };
    };
};

export default fix;
