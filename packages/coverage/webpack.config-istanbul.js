import path from 'path';
export default {
    mode: 'production',

    devtool: 'source-map',

    entry: path.resolve('packages/coverage/src/index.js'),

    output: {
        path: path.resolve('packages/coverage/public/'),
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