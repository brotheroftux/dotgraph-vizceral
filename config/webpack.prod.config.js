const util = require('./util')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const productionConfig = {
    mode: 'production',
    module: {
        rules: util.styleLoaders({
            extract: true,
            minimize: true,
            sourceMap: true
        })
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ]
}

if (process.argv.includes('--env.analyze')) {
    productionConfig.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
        })
    )
}

module.exports = productionConfig