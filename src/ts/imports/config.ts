/**
 * Imports
 */
import path from 'path';

/**
 * Directories Class
 */
export abstract class sunDirs {
    /**
     * The source directory
     */
    static get src (): string {
        return process.env.npm_package_config_dirs_src ?? 'src';
    };

    /**
     * The binary directory
     */
    static get bin (): string {
        return process.env.npm_package_config_dirs_bin ?? 'bin';
    };

    /**
     * The configuration directory
     */
    static get config (): string {
        return process.env.npm_package_config_dirs_config ?? 'config';
    };

    /**
     * The imports directory
     */
    static get imports (): string {
        return process.env.npm_package_config_dirs_imports ?? 'imports';
    };

    /**
     * The SCSS directory
     */
    static get scss (): string {
        return process.env.npm_package_config_dirs_scss ?? 'scss';
    };

    /**
     * The TypeScript directory
     */
    static get ts (): string {
        return process.env.npm_package_config_dirs_ts ?? 'ts';
    };

    /**
     * The distribution directory
     */
    static get dist (): string {
        return process.env.npm_package_config_dirs_dist ?? 'dist';
    };

    /**
     * The CSS directory
     */
    static get css (): string {
        return process.env.npm_package_config_dirs_css ?? 'css';
    };

    /**
     * The JavaScript directory
     */
    static get js (): string {
        return process.env.npm_package_config_dirs_js ?? 'js';
    };
};

/**
 * Paths Class
 */
export abstract class sunPaths {
    /**
     * The source path
     */
    static get src (): string {
        return path.resolve(sunDirs.src);
    };

    /**
     * The SCSS path
     */
    static get scss (): string {
        return path.resolve(sunDirs.src, sunDirs.scss);
    };

    /**
     * The TypeScript path
     */
    static get ts (): string {
        return path.resolve(sunDirs.src, sunDirs.ts);
    };

    /**
     * The distribution path
     */
    static get dist (): string {
        return path.resolve(sunDirs.dist);
    };

    /**
     * The CSS path
     */
    static get css (): string {
        return path.resolve(sunDirs.dist, sunDirs.css);
    };

    /**
     * The JavaScript path
     */
    static get js (): string {
        return path.resolve(sunDirs.dist, sunDirs.js);
    };
};

/**
 * Extensions Class
 */
export abstract class sunExts {
    /**
     * The HTML extension
     */
    static get html (): string {
        return process.env.npm_package_config_exts_html ?? '.html';
    };

    /**
     * The SCSS extension
     */
    static get scss (): string {
        return process.env.npm_package_config_exts_scss ?? '.scss';
    };

    /**
     * The TypeScript extension
     */
    static get ts (): string {
        return process.env.npm_package_config_exts_ts ?? '.ts';
    };

    /**
     * The CSS extension
     */
    static get css (): string {
        console.log(sunConfig.prod, (sunConfig.prod ? '.min' : '') + (process.env.npm_package_config_exts_css ?? '.css'));
        return (sunConfig.prod ? '.min' : '') + (process.env.npm_package_config_exts_css ?? '.css');
    };

    /**
     * The JavaScript extension
     */
    static get js (): string {
        console.log(sunConfig.prod, (sunConfig.prod ? '.min' : '') + (process.env.npm_package_config_exts_js ?? '.js'));
        return (sunConfig.prod ? '.min' : '') + (process.env.npm_package_config_exts_js ?? '.js');
    };

    /**
     * The type definition extension
     */
    static get dts (): string {
        return process.env.npm_package_config_exts_dts ?? '.d.ts';
    };

    /**
     * The map extension
     */
    static get map (): string {
        return process.env.npm_package_config_exts_map ?? '.map';
    };

    /**
     * The chunk extension
     */
    static get chunk (): string {
        return process.env.npm_package_config_exts_chunk ?? '.chunk';
    };
};

/**
 * Configuration Class
 */
export abstract class sunConfig {
    /**
     * The prefix of the library
     */
    static get prefix (): string {
        return process.env.npm_package_config_prefix ?? 'sun';
    };

    /**
     * The name of the library
     * @default - the prefix of the library
     */
    static get library (): string {
        return process.env.npm_package_config_library ?? sunConfig.prefix;
    };

    /**
     * Whether webpack is in production mode or not
     */
    static get prod (): boolean {
        return process.env.NODE_ENV?.toLowerCase() === 'production';
    };

    /**
     * The build mode
     */
    static get mode (): string {
        return process.env.BUILD_MODE?.toLowerCase() ?? 'default';
    };

    /**
     * The server port
     */
    static get port (): number {
        return parseInt(process.env.npm_package_config_port ?? '42069');
    };

    /**
     * The name of the index file
     */
    static get index (): string {
        return process.env.npm_package_config_index ?? 'index';
    };

    /**
     * The configured directories
     */
    static get dirs (): typeof sunDirs {
        return sunDirs;
    };

    /**
     * The configured paths
     */
    static get paths (): typeof sunPaths {
        return sunPaths;
    };

    /**
     * The configured extensions
     */
    static get exts (): typeof sunExts {
        return sunExts;
    };
};
export default sunConfig;