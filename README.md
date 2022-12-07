Javascript module that exports a function to load external JS on the fly. 
A script is not included more than once so multiple places on the 
page can attempt to load the same script.

Basic usage:

```js
import scriptLoader from 'ohjs-script-loader';

await scriptLoader(
    'https://maps.googleapis.com/maps/api/js',
    () => {
        return window.hasOwnProperty('google')
            && window.google.hasOwnProperty('maps');
    }
);

console.log('Google Maps API is ready!');
```
