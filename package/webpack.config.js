const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        content: "./src/content.js"
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    watch: true,
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{from: 'static'}]
        })
    ],
    resolve: {
        fallback: {
            path: require.resolve('path-browserify'),
        },
    }  
}