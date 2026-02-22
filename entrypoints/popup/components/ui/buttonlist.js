import { define, html } from 'hybrids';


// noinspection JSUnusedGlobalSymbols
export default define({
    tag: 'ext-buttonlist',
    direction: 'column',
    render: ({ direction }) => html`
        <style>
            :host {
                flex: 1;
                display: flex;
                flex-direction: ${direction};
            }

            ::slotted(ext-button) {
                ${direction === 'row' && 'flex: 1;'}
            }

            ::slotted(ext-button:not(:last-child)) {
                --btn-border-bottom-width: 0;
            }
            
            ::slotted(ext-button:first-child:not(:first-child:last-child)) {
                ${direction === 'column' ? `
                    --corner-bl: 0;
                    --corner-br: 0;
                ` : `
                    --corner-tr: 0;
                    --corner-br: 0;
                `}
            }
            
            ::slotted(ext-button:last-child:not(:first-child:last-child)) {
                ${direction === 'column' ? `
                    --corner-tl: 0;
                    --corner-tr: 0;
                ` : `
                    --corner-tl: 0;
                    --corner-bl: 0;
                `}
            }

            ::slotted(ext-button:not(:first-child, :last-child, :first-child:last-child)) {
                --corner-tl: 0;
                --corner-tr: 0;
                --corner-bl: 0;
                --corner-br: 0;
            }
        </style>
        <slot />
    `,
});
