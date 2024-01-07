import path from 'path';
export default {
    mode: 'development',

    devtool: 'source-map',

    entry: path.resolve('packages/coverage/src/index.js'),

    output: {
        path: path.resolve('packages/coverage/public/dist'),
        filename: 'coverage-istanbul.js',
        umdNamedDefine: true,
        library: 'coverage-istanbul',
        libraryTarget: 'umd'
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: ['babel-plugin-istanbul']
                }
            }
        }]
    }
};
