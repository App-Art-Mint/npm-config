/**
 * Imports
 */
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
// Convert these to imports
const ShebangPlugin = require('webpack-shebang-plugin');
const LowerCaseNamePlugin = require('webpack-lowercase-name');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
import mintConfig from '../imports/config';
import { mintTSEntries, mintIndexEntries,
         mintNodeEntries, mintSCSSEntries } from '../imports/entries';
import mintBabelConfig from '../imports/config/babel.config';
import mintServerConfig from '../imports/config/server.config';
import mintIndexConfig from '../imports/config/webpack.index';
import mintNodeConfig from '../imports/config/node.config';

/**
 * Webpack Configuration
 */
export const mintWebpackConfig: webpack.Configuration = {
    mode: mintConfig.prod ? 'production' : 'development',
    devtool: 'source-map',
    entry: {
        ...mintSCSSEntries,
        ...mintTSEntries
    },
    output: {
        filename: `${mintConfig.dirs.js}/[lc-name]${mintConfig.exts.js}`,
        chunkFilename: `${mintConfig.dirs.js}/[lc-name].[chunkhash]${mintConfig.exts.chunk}${mintConfig.exts.js}`,
        path: mintConfig.paths.dist,
        library: {
            name: `${mintConfig.prefix}[name]`,
            type: 'umd',
            export: 'default'
        },
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader',
                        options: mintBabelConfig
                    },
                    {
                        loader: 'ts-loader',
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: '/node_modules/',
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        /*new CopyWebpackPlugin({
            patterns: [
                `${mintConfig.paths.src}/index${mintConfig.exts.html}`
            ]
        }),*/
        new LowerCaseNamePlugin(),
        new MiniCssExtractPlugin({
            filename: `${mintConfig.dirs.css}/[lc-name]${mintConfig.exts.css}`,
            chunkFilename: `${mintConfig.dirs.css}/[lc-name].[chunkhash]${mintConfig.exts.chunk}${mintConfig.exts.css}`
        }),
        new RemoveEmptyScriptsPlugin(),
        new ShebangPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx'],
    },
    devServer: mintServerConfig
};

/**
 * Active Configuration
 * Built using env variables NODE_ENV and BUILD_MODE
 */
export const mintActiveConfig: webpack.Configuration = 
    mintConfig.mode === 'index' ? { 
        ...mintWebpackConfig,
        ...mintIndexConfig,
        entry: mintIndexEntries
    }
    : mintConfig.mode === 'config' ? {
        ...mintWebpackConfig,
        ...mintNodeConfig,
        entry: mintNodeEntries
    }
    : mintWebpackConfig;
export default mintActiveConfig;
