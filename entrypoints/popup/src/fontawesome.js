import { $builder } from '../../../prepared/builder.js';
import { $component } from './component.js';
import { icon as faIcon } from '@fortawesome/fontawesome-svg-core';
import * as faSolid from '@fortawesome/free-solid-svg-icons';

const svgCache = Object.create(null);
const icons = Object.create(null);

const load = (type, fa) => {
    svgCache[type] = {};
    icons[type] = Object.fromEntries(
        Object.entries(fa).map(
            ([name, icon]) => name.match(/^fa[a-zA-Z]+$/)
                ? [name.toLowerCase().slice(2), icon]
                : null,
        ).filter(x => x !== null),
    );
};

const isIcon = (type, icon) => icons[type].hasOwnProperty(icon);
const svg = (type, icon, height = '1em') => {
    if (svgCache[type].hasOwnProperty(icon)) return svgCache[type][icon];

    const result = svgCache[type][icon] = document.importNode(
        new DOMParser().parseFromString(
            '<svg xmlns="http://www.w3.org/2000/svg"' + faIcon(icons[type][icon], { classes: [] }).html.join('').slice(4),
            'image/svg+xml',
        ).documentElement,
        true,
    );
    result.style.height = height;
    result.style.verticalAlign = '-0.145em';

    return result;
};

load('solid', faSolid);

const getIcon = (type, icon, height) => isIcon(type, icon) && svg(type, icon, height).cloneNode(true);

export const FaSolid = $component('span', (builder, {
    icon,
    height = '1em',
}) => builder.onBuildAppend(getIcon('solid', icon, height)));
