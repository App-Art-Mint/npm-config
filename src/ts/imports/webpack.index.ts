/**
 * Imports
 */
import webpack from 'webpack';
import sunConfig from './config';

/**
 * Webpack Index Configuration
 */
export const sunIndexConfig: webpack.Configuration = {
    output: {
        filename: `${sunConfig.dirs.js}/[lc-name]${sunConfig.exts.js}`,
        chunkFilename: `${sunConfig.dirs.js}/[lc-name].[chunkhash]${sunConfig.exts.chunk}${sunConfig.exts.js}`,
        path: sunConfig.paths.dist,
        library: {
            name: sunConfig.library,
            type: 'umd'
        }
    }
};
export default sunIndexConfig;