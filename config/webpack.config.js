const path = require('path')
const merge = require('webpack-merge')
const devConfiguration = require('./webpack.dev.config')
const prodConfiguration = require('./webpack.prod.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Stylish = require('webpack-stylish')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const baseConfiguration = {
    entry: {
        app: [
            'babel-polyfill',
            '../src/main.js'
        ]
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: resolve('build'),
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': resolve('src'),
            '#': resolve('lib'),
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },

    node: {
        fs: 'empty'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')],
                exclude: [/node_modules/, /viz\.js/]
            },

            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader'
            }, 

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },

            // dotgraph exports shim
            {
                test: /dotgraph\/index\.js$/,
                loader: 'exports-loader?DotParser=window.DotParser,DotGraph=window.DotGraph'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: '../index.html',
            chunks: ['app']
        }),
        new Stylish()
    ],

    stats: 'none',

    devtool: 'none'
}

if (! process.argv.includes('--env.nolint')) {
    baseConfiguration.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: [
            /node_modules/,
            /lib/
        ]
    })
}

module.exports = merge(baseConfiguration, (process.argv.includes('--env.prod')
    ? prodConfiguration 
    : devConfiguration))