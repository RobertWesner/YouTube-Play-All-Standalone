import { $builder } from '../../../prepared/builder.js';

// TODO: this thing needs to be part of the userscript hahaha, way too nice to waste it on just the popup

const ensureAppendable = xs => {
    if (!Array.isArray(xs)) {
        xs = [xs];
    }

    return xs.map(x => typeof x?.build === 'function'
        ? x.build()
        : x,
    );
};

/**
 * @template {HTMLElement} T
 * @template D
 *
 * @param {string} query
 * @param {(builder: WrappedElementBuilder, data: D) => WrappedElementBuilder} handleData
 * @return {BuildComponent<T, D>}
 */
export const $component = (query, handleData = null) => {
    const create = data => (...slots) => {
        const builder = $builder(query);
        const newBuilder = handleData?.(builder, data) ?? builder;

        // this way the slots can be applied to nested elements
        newBuilder.onBuildAppend(...ensureAppendable(slots.flat()));

        if (newBuilder !== builder) {
            newBuilder.build();
        }

        return builder.build();
    };

    return Object.assign(create({}), {
        /**
         * @template T
         * @template D
         *
         * @param {D} data
         * @return {BuildComponent<T, D>}
         */
        with: data => {
            // noinspection JSValidateTypes
            return create(data);
        },
    });
};

/**
 * Mayhaps inspired by hybridsjs, at least in cocept.
 *
 * @param {Promise<any>} promise
 * @param {Node|HTMLElement|string|WrappedElementBuilder} placeholder
 * @return {HTMLDivElement}
 */
$component.resolve = (promise, placeholder = '') => {
    const element = document.createElement('div.placeholder');

    (async () => {
        const p = ensureAppendable(placeholder);
        element.append(p);

        try {
            let result = await promise;
            element.replaceWith(...ensureAppendable(result));
        } catch (err) {
            element.replaceWith(p);
        }
    })();

    return element;
};

/**
 * @typedef {Node|HTMLElement|string|WrappedElementBuilder|Slot[]} Slot
 */
/**
 * @template T
 * @template D
 *
 * @typedef {((...slots: Slot[]) => HTMLElement) & {
 *  _data: D,
 *  with: (data: D) => BuildComponent<T>,
 * }} BuildComponent
 */
