export const executeDevCommand = (sendMessage, method, args = {}) => {
    sendMessage({
        __YTPA__: true,
        type: 'DEV_CMD',
        method: String(method),
        args,
    });
};
