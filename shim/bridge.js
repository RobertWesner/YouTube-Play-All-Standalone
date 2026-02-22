export const initConsoleBridge = () => {
    window.addEventListener('message', async (ev) => {
        if (ev.source !== window) return;
        const msg = ev.data;
        if (!msg || msg.__YTPA__ !== true || msg.type !== 'CALL') return;

        const { id, method, args } = msg;

        const api = globalThis.__YTPA_CONSOLE_API__;
        if (!api || typeof api[method] !== 'function') {
            window.postMessage({ __YTPA__: true, type: 'RESP', id, ok: false, error: `No such method: ${method}` }, '*');
            return;
        }

        try {
            const result = await api[method](...(args || []));
            window.postMessage({ __YTPA__: true, type: 'RESP', id, ok: true, result }, '*');
        } catch (e) {
            window.postMessage({ __YTPA__: true, type: 'RESP', id, ok: false, error: String(e?.message || e) }, '*');
        }
    });
};

/**
 * @var {Record<any, any>} globalThis
 */
