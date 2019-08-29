// rollup.config.js
// umd
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');
var json = require('rollup-plugin-json');
var globals = require('rollup-plugin-node-globals');
var builtins = require('rollup-plugin-node-builtins');
var common = require('./rollup.js');

var prod = process.env.NODE_ENV === 'production';

module.exports = {
    input: 'src/index.' + common.type,
    output: {
        file: prod ? 'dist/index.aio.min.js' : 'dist/index.aio.js',
        format: 'umd',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        name: common.name,
        banner: common.banner,
    },
    plugins: [
        nodeResolve({
            mainFields: ['module', 'main'],
            extensions: [common.type === 'ts' ? '.ts' : '', '.js']
        }),
        commonjs({
            include: 'node_modules/**',
        }),
        json(),
        globals(),
        builtins(),
        common.getCompiler(),
        (prod && uglify.uglify())
    ]
};