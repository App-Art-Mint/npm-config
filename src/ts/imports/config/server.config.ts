/**
 * Imports
 */
import devServer from 'webpack-dev-server';
import sunConfig from '../config';

/**
 * Development Server Configuration
 */
export const sunServerConfig: devServer.Configuration = {
    static: {
        directory: sunConfig.paths.dist,
    },
    compress: true,
    port: sunConfig.port
};
export default sunServerConfig;