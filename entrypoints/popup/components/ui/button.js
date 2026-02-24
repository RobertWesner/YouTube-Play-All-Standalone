import './button.scss';
import { $component } from '../../src/component.js';
import { $builder } from '../../../../prepared/builder.js';

export const Button = $component('button.button', (builder, {
    color = 'black',
    background = 'rgba(0, 0, 0, 0.02)',
    backgroundHover = 'rgba(0, 0, 0, 0.05)',
    border = '1px solid rgba(0, 0, 0, 0.42)',
    flex = '',
    onclick = () => {},
}) => $builder('span').onBuild(span => builder.style(`
    --color: ${color};
    --background: ${background};
    --background-hover: ${backgroundHover};
    --border: ${border};
    flex: ${flex};
`).on('click', onclick).onBuildAppend(span)));
