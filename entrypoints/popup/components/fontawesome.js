import { define, html, } from 'hybrids';
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
}

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
    result.style.verticalAlign = 'middle';

    return result;
};

load('solid', faSolid);

define({
    tag: 'fa-solid',
    icon: '',
    height: '1em',
    render: ({ icon, height }, type = 'solid') => isIcon(type, icon) && html`${svg(type, icon, height).cloneNode(true)}`,
});
