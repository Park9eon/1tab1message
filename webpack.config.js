'use strict';

/**
 * Created by park9eon on 2019-01-03
 */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line

module.exports = (env, argv) => ({
    mode: 'development',
    entry: {
        message: './src/message.js',
        background: './src/background.js',
        options: './src/options.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devtool: argv.mode === 'development' ? 'source-map' : '',
    plugins: [new CopyWebpackPlugin([{from: './assets'}])],
    optimization: {
        minimize: false
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        }, {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: 'babel-loader',
        }],
    },
});
