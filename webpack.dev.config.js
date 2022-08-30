/* eslint-disable @typescript-eslint/no-var-requires */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

const proxy_headers = {
    'X-Forwarded-Host': 'localhost',
    'X-Forwarded-Port': 3000,
    'X-Forwarded-Proto': 'http',
};

module.exports = {
    mode: 'development',
    entry: ['webpack-dev-server/client?http://localhost:3000', './src/index'],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'build/dist'),
        filename: 'assets/bundle.js',
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/frontendApi/ws': { target: 'http://localhost:8080/', headers: proxy_headers },
            '/saml': { target: 'http://localhost:8080/', headers: proxy_headers },
            '/login': { target: 'http://localhost:8080/', headers: proxy_headers },
            '/**/frontendApi': { target: 'http://localhost:9099/', headers: proxy_headers },
            '/frontendApi': { target: 'http://localhost:9099/', headers: proxy_headers },
        },
        port: 3000,
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        plugins: [
            new TsconfigPathsPlugin({
                extensions: ['.js', '.ts', '.tsx'],
            }),
        ],
    },
    plugins: [
        new CopyWebpackPlugin({ patterns: [{ from: 'assets/styles/bryntum/scheduler.stockholm.css', to: './' }] }),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            },
            nodeModules: false,
            hash: true,
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify('true'),
        }),
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.tsx$|.ts$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                        plugins: [
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                            '@babel/plugin-proposal-numeric-separator',
                            '@babel/plugin-transform-typescript',
                            '@babel/plugin-proposal-nullish-coalescing-operator',
                            '@babel/plugin-proposal-optional-chaining',
                            '@babel/plugin-transform-runtime',
                        ],
                    },
                },
            },
            {
                test: /\.svg$/,
                exclude: /icons/,
                loader: 'url-loader',
            },
            {
                test: /\.svg$/,
                include: [path.resolve(__dirname, 'assets/icons')],
                exclude: /img/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            babelrc: false,
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                    {
                        loader: 'svg-react-loader',
                    },
                ],
            },
            {
                test: /\.png$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(eot|woff|woff2|ttf|jpg|gif)$/,
                use: {
                    loader: 'file-loader?limit=30000&name=[name]-[hash].[ext]',
                },
            },
            {
                test: /\.(otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]',
                    },
                },
            },
        ],
    },
    externals: {
        cheerio: 'window',
    },
    optimization: {
        emitOnErrors: false,
    },
};
