'use strict';

/**
 * Created by park9eon on 2019-01-07
 */
module.exports = {
    env: {
        test: {
            presets: ['@babel/preset-env'],
        },
    },
    plugins: [
        ['@babel/transform-react-jsx', { pragma: 'h' }],
    ],
};
