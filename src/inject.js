import { browser } from '@wxt-dev/browser';

export const injectExposedScript = file => {
    const url = browser.runtime.getURL(`exposed/js/${file}`);
    const s = document.createElement('script');
    s.src = url;
    s.async = false;
    (document.documentElement || document.head).appendChild(s);
};
