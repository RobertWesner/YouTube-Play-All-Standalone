import './view.scss';
import { $component } from '../src/component.js';
import { $builder } from '../../../prepared/builder.js';

const viewStyle = document.createElement('style');
document.head.insertAdjacentElement('beforeend', viewStyle);

export const View = $component('div.view', (builder, {
    id,
    title,
    subtitle = '',
}) => {
    viewStyle.textContent += `
        html:not([data-navigation="${id}"]) #${id} {
            display: none;
        }
    `;

    return $builder('div.content')
        .onBuild(content => builder.id(id).onBuildAppend(
                $builder('div.card')
                    .onBuildAppend(
                        $builder('div.title[role="heading"][aria-level="1"]')
                            .onBuildText(title)
                            .build(),
                        subtitle && $builder('div.subtitle[role="heading"][aria-level="2"]')
                            .onBuildText(subtitle)
                            .build(),
                        content,
                    )
                    .build(),
            ),
        );
});
