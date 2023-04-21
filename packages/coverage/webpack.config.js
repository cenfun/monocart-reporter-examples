import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
export default {
    // mode: 'production',
    mode: 'development',

    // https://webpack.js.org/configuration/devtool/#devtool
    devtool: 'inline-source-map',

    cache: true,
    target: ['web'],

    entry: path.resolve('packages/coverage/src/index.js'),

    output: {
        path: path.resolve('packages/coverage/public/'),
        filename: 'coverage-demo.js',
        umdNamedDefine: true,
        library: 'coverage-demo',
        libraryTarget: 'umd'
    },

    devServer: {
        static: {
            directory: path.resolve('packages/coverage/public/')
        },
        port: 9000
    },

    plugins: [new HtmlWebpackPlugin()],

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: ['@babel/preset-env'],
                    plugins: ['babel-plugin-istanbul']
                }
            }
        }]
    },

    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx']
        // extensionAlias: {
        //     '.ts': ['.js', '.ts'],
        //     '.js': ['.ts', '.js']
        // }
    }
};
