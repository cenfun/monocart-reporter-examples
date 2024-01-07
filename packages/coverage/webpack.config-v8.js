import path from 'path';
export default {
    mode: 'production',

    devtool: 'source-map',

    entry: path.resolve('packages/coverage/src/index.js'),

    output: {
        path: path.resolve('packages/coverage/public/dist'),
        filename: 'coverage-v8.js',
        umdNamedDefine: true,
        library: 'coverage-v8',
        libraryTarget: 'umd'
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            }
        }]
    }
};
