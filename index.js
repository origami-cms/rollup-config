const path= require('path');
const minify= require('rollup-plugin-babel-minify');
const commonjs= require('rollup-plugin-commonjs');
const filesize= require('rollup-plugin-filesize');
const gzip= require('rollup-plugin-gzip');
const multiEntry= require('rollup-plugin-multi-entry');
const resolve= require('rollup-plugin-node-resolve');
const notify= require('rollup-plugin-notify');
const progress= require('rollup-plugin-progress');
const replace= require('rollup-plugin-replace');
const sourcemaps= require('rollup-plugin-sourcemaps');
const strip= require('rollup-plugin-strip');
const ts= require('rollup-plugin-typescript2');
const typescript= require('typescript');


const SRC = process.env.SRC || path.resolve(process.cwd(), './src');
const DIST = process.env.DIST || path.resolve(process.cwd(), './dist');
const isProduction = process.env.NODE_ENV === "production";

module.exports.SRC = SRC;
module.exports.DIST = DIST;
module.exports.isProduction = isProduction;

// ---------------------------------------------------------- Default build base
module.exports.default = {
    input: [
        path.resolve(SRC, 'app.ts'),
        path.resolve(SRC, 'styles.ts')
    ],
    output: {
        file: path.resolve(DIST, 'app.js'),
        format: 'iife',
        sourcemap: true
    },
    plugins: [

        resolve(),
        commonjs(),
        notify({
            success: true
        }),
        multiEntry(),
        ts({
            typescript,
            useTsconfigDeclarationDir: true
        }),
        sourcemaps(),
        progress(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        filesize(),


        ...(isProduction ? [
            strip(),
            minify({
                comments: false
            }),
            gzip()
        ] : [])
    ],
}
