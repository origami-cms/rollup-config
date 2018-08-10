# Origami Rollup Config
Base config settings for Rollup

## Installation
```
yarn add -D origami-rollup-config
```

## Usage

Import this module and extend in your `rollup.config.js` file

```js
import fs from 'fs';
import path from 'path';
import uglifycss from 'uglifycss';
import BASE, {isProduction, DIST} from 'origami-rollup-config';
import copy from 'rollup-plugin-copy';
import sass from 'rollup-plugin-sass';

BASE.output.sourcemap = false;

BASE.plugins.push(
    copy({
        './src/images': './dist/images',
        './src/app.html': './dist/index.html'
    }),

    sass({
        output(css) {
            if (isProduction) css = uglifycss.processString(css);
            fs.writeFileSync(path.resolve(DIST, 'app.css'), css);
        }
    })
);


export default BASE;
```

## Exports
- Default export is the base configuration JSON object.
- `SRC`: The source directory. Can be overriden with `process.env.SRC`. Defaults to './src'
- `DIST`: The dist directory. Can be overriden with `process.env.DIST`. Defaults to './dist'
