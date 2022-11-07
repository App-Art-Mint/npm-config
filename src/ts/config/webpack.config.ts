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
import sunConfig from '../imports/config';
import { sunTSEntries, sunIndexEntries,
         sunConfigEntries, sunSCSSEntries } from '../imports/entries';
import sunBabelConfig from '../imports/babel.config';
import sunServerConfig from '../imports/server.config';
import sunIndexConfig from '../imports/webpack.index';
import sunNodeConfig from '../imports/node.config';

/**
 * Webpack Configuration
 */
export const sunWebpackConfig: webpack.Configuration = {
    mode: sunConfig.prod ? 'production' : 'development',
    devtool: 'source-map',
    entry: {
        ...sunSCSSEntries,
        ...sunTSEntries
    },
    output: {
        filename: `${sunConfig.dirs.js}/[lc-name]${sunConfig.exts.js}`,
        chunkFilename: `${sunConfig.dirs.js}/[lc-name].[chunkhash]${sunConfig.exts.chunk}${sunConfig.exts.js}`,
        path: sunConfig.paths.dist,
        library: {
            name: `${sunConfig.prefix}[name]`,
            type: 'umd',
            export: 'default'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader',
                        options: sunBabelConfig
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
                `${sunConfig.paths.src}/index${sunConfig.exts.html}`
            ]
        }),*/
        new LowerCaseNamePlugin(),
        new MiniCssExtractPlugin({
            filename: `${sunConfig.dirs.css}/[lc-name]${sunConfig.exts.css}`,
            chunkFilename: `${sunConfig.dirs.css}/[lc-name].[chunkhash]${sunConfig.exts.chunk}${sunConfig.exts.css}`
        }),
        new RemoveEmptyScriptsPlugin(),
        new ShebangPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx'],
    },
    devServer: sunServerConfig
};

/**
 * Active Configuration
 * Built using env variables NODE_ENV and BUILD_MODE
 */
export const sunActiveConfig: webpack.Configuration = 
    sunConfig.mode === 'index' ? { 
        ...sunWebpackConfig,
        ...sunIndexConfig,
        entry: sunIndexEntries
    }
    : sunConfig.mode === 'config' ? {
        ...sunWebpackConfig,
        ...sunNodeConfig,
        entry: sunConfigEntries
    }
    : sunWebpackConfig;
export default sunActiveConfig;