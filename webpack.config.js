const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV || 'development';

module.exports = {
    mode: env,
    entry: path.resolve(__dirname, 'app/index.ts'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'editor.[hash:8].js',

    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                /*exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, 'app')
                ],*/
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',

                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@abstract': path.resolve(__dirname, 'app/_abstract'),
            '@components': path.resolve(__dirname, 'app/components'),
            '@modules': path.resolve(__dirname, 'app/modules'),
            '@redux': path.resolve(__dirname, 'app/redux'),
            '@utils': path.resolve(__dirname, 'app/utils'),
            '@commands': path.resolve(__dirname, 'app/commands.ts'),
            '@interfaces': path.resolve(__dirname, 'app/interfaces.ts'),
            '@plugins': path.resolve(__dirname, 'app/plugins.ts'),
            '@schemas': path.resolve(__dirname, 'app/schemas.ts'),
            '@typebehinds': path.resolve(__dirname, 'app/typebehinds.ts'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Notion-Editor',
            filename: 'index.html',
            inject: 'body',
            hash: true,
            template: path.resolve(__dirname, 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[contenthash].css'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9078,
        hot: true
    }
};