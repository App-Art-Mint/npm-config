/**
 * Imports
 */
import path from 'path';
import process from 'process';

/**
 * Process Settings
 */
export const sunPrefix: string = process.env.npm_package_config_prefix ?? 'sun';
export const sunProd: boolean = process.env.NODE_ENV?.toLowerCase() === 'production';

export const sunDirs: {[key: string]: string} = {
    src: process.env.npm_package_config_dirs_src ?? 'src',
    bin: process.env.npm_package_config_dirs_bin ?? 'bin',
    config: process.env.npm_package_config_dirs_config ?? 'config',
    imports: process.env.npm_package_config_dirs_imports ?? 'imports',
    scss: process.env.npm_package_config_dirs_scss ?? 'scss',
    ts: process.env.npm_package_config_dirs_ts ?? 'ts',
    dist: process.env.npm_package_config_dirs_dist ?? 'dist',
    css: process.env.npm_package_config_dirs_css ?? 'css',
    js: process.env.npm_package_config_dirs_js ?? 'js',
};

/**
 * Export Configuration
 */
export const sunConfig: any = {
    library: process.env.npm_package_config_library ?? sunPrefix,
    prefix: sunPrefix,
    prod: sunProd,
    mode: process.env.BUILD_MODE?.toLowerCase() ?? 'default',
    port: parseInt(process.env.npm_package_config_port ?? '42069'),
    index: process.env.npm_package_config_index ?? 'index',
    dirs: sunDirs,
    paths: {
        src: path.resolve(sunDirs.src),
        scss: path.resolve(sunDirs.src, sunDirs.scss),
        ts: path.resolve(sunDirs.src, sunDirs.ts),
        dist: path.resolve(sunDirs.dist),
        css: path.resolve(sunDirs.dist, sunDirs.css),
        js: path.resolve(sunDirs.dist, sunDirs.js)
    },
    exts: {
        html: process.env.npm_package_config_exts_html ?? '.html',
        scss: process.env.npm_package_config_exts_scss ?? '.scss',
        ts: process.env.npm_package_config_exts_ts ?? '.ts',
        css: (sunProd ? '.min' : '') + (process.env.npm_package_config_exts_css ?? '.css'),
        js: (sunProd ? '.min' : '') + (process.env.npm_package_config_exts_js ?? '.js'),
        dts: process.env.npm_package_config_exts_dts ?? '.d.ts',
        map: process.env.npm_package_config_exts_map ?? '.map',
        chunk: process.env.npm_package_config_exts_chunk ?? '.chunk'
    }
};
export default sunConfig;