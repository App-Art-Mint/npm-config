/**
 * Imports
 */
import devServer from 'webpack-dev-server';
import mintConfig from '../config';

/**
 * Development Server Configuration
 */
export const mintServerConfig: devServer.Configuration = {
    static: {
        directory: mintConfig.paths.dist,
    },
    compress: true,
    port: mintConfig.port
};
export default mintServerConfig;