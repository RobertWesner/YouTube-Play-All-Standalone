
(() => {
    const pending = new Map();
    const mkid = () => Math.random().toString(36).slice(2);

    window.addEventListener('message', (ev) => {
        const msg = ev.data;
        if (!msg || msg.__YTPA__ !== true || msg.type !== 'RESP') return;
        const p = pending.get(msg.id);
        if (!p) return;
        pending.delete(msg.id);
        msg.ok ? p.resolve(msg.result) : p.reject(new Error(msg.error));
    });

    window['YTPA_tools'] = new Proxy({}, {
        get(_t, prop) {
            if (prop === '__isProxy') return true;
            return (...args) => new Promise((resolve, reject) => {
                const id = mkid();
                pending.set(id, { resolve, reject });
                window.postMessage({ __YTPA__: true, type: 'CALL', id, method: String(prop), args }, '*');
            });
        }
    });
})();
