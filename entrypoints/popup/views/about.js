import { $component } from '../src/component.js';
import { $builder } from '../../../prepared/builder.js';
import { View } from '../components/view.js';
import { ButtonBack } from '../components/ui/button-back.js';
import meta from '../../../prepared/meta.json';
import './about.scss';

const Info = $component('div.info', (builder, {
    text,
    value,
}) => builder.onBuildAppend(
    $builder('div.info-title').onBuildText(text).build(),
    $builder('code').onBuildText(value).build(),
));

export const AboutView = $component('div', builder => {
    return builder.onBuildAppend(
        View.with({
            id: 'about',
            title: 'ytpa',
            subtitle: 'about',
        })(
            $builder('div.info-container').onBuildAppend(
                Info.with({ text: 'Userscript version:', value: meta.version })(),
            ).build(),
            ButtonBack(),
        ),
    );
});
