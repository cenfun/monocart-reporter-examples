import path from 'path';
export default {
    mode: 'development',

    devtool: false,

    entry: path.resolve('packages/coverage/src/index.js'),

    output: {
        path: path.resolve('packages/coverage/public/'),
        filename: 'coverage-demo.js',
        umdNamedDefine: true,
        library: 'coverage-demo',
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
