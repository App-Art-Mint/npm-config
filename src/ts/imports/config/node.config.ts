/**
 * Imports
 */
import webpack from 'webpack';
import NodeExternals from 'webpack-node-externals';
 
/**
 * Webpack Node Configuration
 */
export const mintNodeConfig: webpack.Configuration = {
    target: 'node',
    externals: [
        NodeExternals()
    ],
    externalsPresets: {
        node: true
    },
};
export default mintNodeConfig;