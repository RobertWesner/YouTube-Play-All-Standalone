import meta from '../prepared/meta.json';
import { browser } from '@wxt-dev/browser';

function promisifyChrome(fn, ...args) {
    // Firefox `browser.*` returns promises. Chrome `chrome.*` uses callbacks.
    try {
        const result = fn(...args);
        if (result && typeof result.then === 'function') return result;
    } catch (err) {}

    return new Promise((resolve, reject) => {
        fn(...args, (result) => {
            const err = browser?.runtime?.lastError;
            if (err) reject(err);
            else resolve(result);
        });
    });
}

const createStorage = ({  } = {}) => {
    const prefix = 'GM:';
    
    const area = browser?.storage?.local;
    if (!area) throw 'storage.local unavailable (missing "storage" permission?)';

    const full = (k) => `${prefix}${k}`;

    return {
        getValue: async (key, defaultValue) => {
            const obj = await promisifyChrome(area.get.bind(area), full(key));
            return Object.prototype.hasOwnProperty.call(obj, full(key)) ? obj[full(key)] : defaultValue;
        },
        setValue: async (key, value) => promisifyChrome(area.set.bind(area), { [full(key)]: value }),
        deleteValue: async key => promisifyChrome(area.remove.bind(area), full(key)),
        listValues: async () => Object.keys(await promisifyChrome(area.get.bind(area), null))
            .filter(key => key.startsWith(prefix))
            .map(key => key.slice(prefix.length))
            .sort(),
    };
};

export const GM = {
    info: { script: { version: meta.version } },
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
    },
    ...createStorage(),
};

/**
 * @var {Record<any, any>} globalThis
 */
