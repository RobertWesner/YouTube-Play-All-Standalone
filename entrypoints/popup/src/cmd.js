import { browser } from '@wxt-dev/browser';
import { executeDevCommand } from '../../../src/ytpa-tools.js';

const sendCmd = (cmd, args = {}) => browser.tabs
    .query({ active: true, currentWindow: true })
    .then(([tab]) => {
        if (!tab?.id) return;

        executeDevCommand((...xs) => browser.tabs.sendMessage(tab.id, ...xs), cmd, args);
    });

export default sendCmd;
