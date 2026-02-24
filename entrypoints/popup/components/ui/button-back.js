import { Button } from './button.js';
import { navigateTo } from '../../src/navigate.js';
import { $component } from '../../src/component.js';

export const ButtonBack = $component('div', builder => builder.style('display: flex').onBuildAppend(
    Button.with({
        flex: 1,
        onclick: () => navigateTo('home'),
    })('Back')
));
