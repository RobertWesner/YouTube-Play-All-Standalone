import { browser } from '@wxt-dev/browser';

export const getTab = async () => (await browser.tabs.query({ active: true, currentWindow: true }))[0];
export const runOnTab = async (id, func) => (await browser.scripting.executeScript({
    target: { tabId: id },
    func,
}))[0].result
