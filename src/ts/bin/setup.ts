#!/usr/bin/env node

/**
 * Imports
 */
import fs from 'fs';
import path from 'path';

/**
 * Setup for the @sunderapps npm library suite
 */
export class sunSetup {
    /**
     * Values to add to the package.json
     */
    private updates: any = {
        keywords: [
            'sunderapps',
            'sunder-apps',
            'sunder'
        ],
        main: 'dist/js/index.min.js',
        types: 'dist/js/index.d.ts',
        files: [
            'dist/**/*.{css,js,d.ts,map}'
        ],
        directories: {
            dist: 'dist',
            doc: 'docs',
            src: 'src',
            test: 'test'
        },
        publishConfig: {
            access: 'public'
        },
        config: {
            webpack: 'node_modules/@sunderapps/config/dist/js/webpack.config.min.js',
            dirs: {
                doc: 'docs',
                src: 'src',
                scss: 'scss',
                dist: 'dist'
            }
        },
        scripts: {
            build: 'webpack --config $npm_package_config_webpack',
            'build:sassdoc': 'sassdoc $npm_package_config_dirs_src/$npm_package_config_dirs_scss -p > $npm_package_config_dirs_doc/sassdoc.json'
        },
        ignoreDependencies: [
            '@types/glob',
            '@types/node',
            '@types/webpack',
            '@types/webpack-node-externals',
            'glob'
        ]
    };

    /**
     * The package.json object for this project
     */
    private thisPackageJson: any = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'node_modules/@sunderapps/config/package.json'), 'utf8'));

    /**
     * The original package.json object for the current project
     */
    private oldPackageJson: any = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));

    /**
     * The new package.json object for the current project
     */
    private newPackageJson: any = {
        name: this.oldPackageJson.name,
        author: this.oldPackageJson.author ?? 'Samuel T Underwood',
        version: this.oldPackageJson.version ?? '0.0.1',
        license: this.oldPackageJson.license ?? 'MIT',
        description: this.oldPackageJson.description ?? '',
        keywords: [
            ...this.updates.keywords,
            ...this.oldPackageJson.keywords
        ],
        homepage: this.oldPackageJson.homepage ?? 'https://www.sunderapps.com',
        repository: this.oldPackageJson.repository ?? {},
        bugs: this.oldPackageJson.bugs ?? {},
        main: this.updates.main,
        types: this.updates.types,
        files: this.updates.files,
        directories: this.updates.directories,
        publishConfig: {
            ...this.oldPackageJson.publishConfig,
            ...this.updates.publishConfig
        },
        config: {
            ...this.oldPackageJson.config,
            ...this.updates.config
        },
        scripts: {
            ...this.oldPackageJson.scripts,
            ...this.thisPackageJson.scripts,
            ...this.updates.scripts
        },
        dependencies: this.oldPackageJson.dependencies ?? {},
        devDependencies: {
            ...this.oldPackageJson.devDependencies,
            ...this.thisPackageJson.devDependencies
                .filter((dependency: string) => !this.updates.ignoreDependencies.includes(dependency))
        }
    }

    constructor () {
        console.log('\nRunning setup...\n');
                
        console.log(this.thisPackageJson, this.oldPackageJson, this.newPackageJson);
    }
}
export default sunSetup;
new sunSetup();