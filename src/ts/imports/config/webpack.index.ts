/**
 * Imports
 */
import webpack from 'webpack';
import mintConfig from '../config';

/**
 * Webpack Index Configuration
 */
export const mintIndexConfig: webpack.Configuration = {
    output: {
        filename: `${mintConfig.dirs.js}/[lc-name]${mintConfig.exts.js}`,
        chunkFilename: `${mintConfig.dirs.js}/[lc-name].[chunkhash]${mintConfig.exts.chunk}${mintConfig.exts.js}`,
        path: mintConfig.paths.dist,
        library: {
            name: mintConfig.library,
            type: 'umd'
        }
    }
};
export default mintIndexConfig;