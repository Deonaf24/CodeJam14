const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    devtool: "source-map",
    entry: {
        content: "./src/content.js",
        tiltinit: "./src/tilt-init.js",
        tilt: "./src/tilt.js",
        buttonpreview: "./src/buttonpreview.js",
        background: "./src/background.js"
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