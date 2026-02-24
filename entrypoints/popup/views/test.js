import { Button } from '../components/ui/button.js';
import { $component } from '../src/component.js';
import { View } from '../components/view.js';
import { Buttonlist } from '../components/ui/buttonlist.js';
import { ButtonBack } from '../components/ui/button-back.js';

export const TestView = $component('div', builder => {
    return builder.onBuildAppend(
        View.with({
            id: 'test',
            title: 'ytpa',
            subtitle: 'test',
        })(
            Buttonlist(
                Button('First'),
                Button('Second'),
                Button('Third'),
            ),
            Buttonlist.with({ direction: 'row' })(
                Button('1'),
                Button('2'),
                Button('3'),
                Button('4'),
                Button('5'),
            ),
            Button('test'),
            ButtonBack(),
        ),
    );
});
