const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app.ts',
        libs: ['rxjs'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/',
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'libs',
        }),
    ],
    devtool: 'eval',
}