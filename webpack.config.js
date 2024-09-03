const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './card-info.html',
            filename: 'card-info.html'
        }),
        new HtmlWebpackPlugin({
            template: './confirmation.html',
            filename: 'confirmation.html'
        }),
        new HtmlWebpackPlugin({
            template: './new-page.html',
            filename: 'new-page.html'
        }),
        new HtmlWebpackPlugin({
            template: './payment-summary.html',
            filename: 'payment-summary.html'
        })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
};
