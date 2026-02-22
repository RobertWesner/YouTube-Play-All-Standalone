import { define, html } from 'hybrids';

// noinspection JSUnusedGlobalSymbols
export default define({
    tag: 'ext-button',
    color: 'black',
    background: 'rgba(0, 0, 0, 0.02)',
    backgroundHover: 'rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.42)',
    render: (host) => {
        const { color, background, backgroundHover, border } = host;

        return html`
            <style>
                :host {
                    display: flex;
                }

                button {
                    flex: 1;
                    color: ${color};
                    background: ${background};
                    border: ${border};
                    border-radius: var(--corner-tl) var(--corner-tr) var(--corner-br) var(--corner-bl);
                    border-bottom-width: var(--btn-border-bottom-width, 1px);
                    padding: 0.4rem;
                    cursor: pointer;
                }

                button:hover {
                    background-color: ${backgroundHover};
                }

                button:active > * {
                    transform: translateY(1px);
                    display: inline-block;
                }
            </style>
            <button>
                <span><slot/></span>
            </button>
        `;
    },
});
