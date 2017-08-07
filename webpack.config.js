const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        sample1: './src/sample1/sample1.ts',
        sample2: './src/sample2/sample2.ts',
        sample3: './src/sample3/sample3.ts',
        sample4: './src/sample4/sample4.ts',
        sample5: './src/sample5/sample5.ts',
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
            { test: /\.html$/, loader: 'file-loader', query: { name: '[name].[ext]' } },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'libs',
        }),
    ],
    devtool: 'eval',
}