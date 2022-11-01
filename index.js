import {
    isFunction,
    isString,
} from './is.js';

let map = {};

/**
 * A simple function to ensure an external script is loaded.
 *
 * @param {string} src - The src of the desired <script> tag.
 * @param {function} verify - Used to verify if the script is fully loaded.
 *
 * @return {Promise} - Resolves when the script is loaded.
 */
export default function(src, verify) {
    if (!src || !isString(src)) {
        throw '`src` must be a non-empty string';
    }

    if (!isFunction(verify)) {
        throw '`verify` must be a function';
    }

    if (!map.hasOwnProperty(src)) {
        map[src] = false;
    }

    if (map[src]) {
        return new Promise((resolve) => {
            resolve();
        });
    }

    if (!document.querySelector('script[src="' + src + '"]')) {
        const script = document.createElement('script');
        script.src = src;

        let appendTo = document.getElementsByTagName('head')[0]
            || document.getElementsByTagName('body')[0];

        appendTo.appendChild(script);
    }

    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (verify()) {
                clearInterval(interval);

                map[src] = true;

                resolve();
            }
        }, 100);
    });
}
