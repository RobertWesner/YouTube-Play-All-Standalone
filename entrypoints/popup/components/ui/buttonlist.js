import './buttonlist.scss';
import { $component } from '../../src/component.js';

export const Buttonlist = $component('div.buttonlist', (builder, {
    direction = 'column',
}) => builder.data_direction(direction));
