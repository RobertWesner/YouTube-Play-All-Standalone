export const injectExposedScript = file => {
    const ext = globalThis.browser ?? globalThis.chrome;
    const url = ext.runtime.getURL(`exposed/js/${file}`);
    const s = document.createElement('script');
    s.src = url;
    s.async = false;
    (document.documentElement || document.head).appendChild(s);
};

/**
 * @var {Record<any, any>} globalThis
 */
