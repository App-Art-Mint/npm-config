#!/usr/bin/env node

/**
 * Imports
 */
import cp from 'child_process';
import fs from 'fs';
import path from 'path';
import { exit } from 'process';
import ps from 'prompt-sync';
import sunUtil from '../imports/util';

/**
 * Update / setup for the @sunderapps npm library suite
 */
export class sunUpdate {
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
            update: 'npm up -D @sunderapps/config && sunderapps-config',
            upgrade: 'npm i -D @sunderapps/config && sunderapps-config',
            build: 'webpack --config $npm_package_config_webpack',
            'build:sassdoc': 'sassdoc $npm_package_config_dirs_src/$npm_package_config_dirs_scss -p > $npm_package_config_dirs_doc/sassdoc.json',
            serve: 'webpack serve --config $npm_package_config_webpack'
        },
        utilScripts: {
            endversion: `echo \'\nREMEMBER TO UPDATE THE VERSION IN @sunderapps/config/src/ts/bin/update.ts and publish that too!\n\'`,
        },
        dependencies: {
            '@sunderapps/util': '^0.3.1'
        },
        ignoreDevDependencies: [
            '@types/glob',
            '@types/node',
            '@types/npm',
            '@types/prompt-sync',
            '@types/webpack',
            '@types/webpack-node-externals',
            'glob',
            'webpack'
        ]
    };

    /**
     * The package.json object for this project
     * TODO: maybe unsync these?
     */
    private thisPackageJson: any = JSON.parse(fs.readFileSync(path.resolve('node_modules/@sunderapps/config/package.json'), 'utf8'));

    /**
     * The original package.json object for the current project
     * TODO: maybe unsync these?
     */
    private oldPackageJson: any = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));

    /**
     * The new scripts to write to the package.json
     */
     private newScripts: any = sunUtil.sortObject({
        ...this.oldPackageJson.scripts,
        ...this.thisPackageJson.scripts,
        ...this.updates.scripts
    });

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
            ...new Set([
                ...this.updates.keywords,
                ...this.oldPackageJson.keywords.sort()
            ])
        ],
        homepage: this.oldPackageJson.homepage ?? 'https://www.sunderapps.com',
        repository: this.oldPackageJson.repository ?? {},
        bugs: this.oldPackageJson.bugs ?? {},
        main: this.updates.main,
        types: this.updates.types,
        files: this.updates.files,
        directories: this.updates.directories,
        publishConfig: sunUtil.sortObject({
            ...this.oldPackageJson.publishConfig,
            ...this.updates.publishConfig
        }),
        config: sunUtil.sortObject({
            ...this.oldPackageJson.config,
            ...this.updates.config
        }),
        scripts: {
            update: this.newScripts.update,
            upgrade: this.newScripts.upgrade,
            prepare: this.newScripts.prepare,
            preversion: this.newScripts.preversion,
            version: this.newScripts.version,
            postversion: this.newScripts.postversion,
            clean: this.newScripts.clean,
            clear: this.newScripts.clear,
            build: this.newScripts.build,
            'build:prod': this.newScripts['build:prod'],
            'build:index': this.newScripts['build:index'],
            'build:index:prod': this.newScripts['build:index:prod'],
            'build:config': this.newScripts['build:config'],
            'build:config:prod': this.newScripts['build:config:prod'],
            'build:tsdoc': this.newScripts['build:tsdoc'],
            'build:sassdoc': this.newScripts['build:sassdoc'],
            serve: this.newScripts.serve,
            watch: this.newScripts.watch,
            'watch:prod': this.newScripts['watch:prod'],
            'watch:tsdoc': this.newScripts['watch:tsdoc'],
            test: this.newScripts.test,
            ...sunUtil.sortObject(this.newScripts)
        },
        dependencies: sunUtil.sortObject({
            ...this.oldPackageJson.dependencies,
            ...sunUtil.removeObjectEntries(
                this.updates.dependencies,
                [this.oldPackageJson.name]
            )
        }),
        devDependencies: sunUtil.sortObject({
            ...this.oldPackageJson.devDependencies,
            ...sunUtil.removeObjectEntries(
                this.thisPackageJson.devDependencies,
                this.updates.ignoreDevDependencies
            ),
            '@sunderapps/config': `^${this.thisPackageJson.version}`
        })
    };

    constructor () {
        const prompt: ps.Prompt = ps();
        let answers: {[key: string]: string} = {},
            settings: any = {};

        if (this.oldPackageJson.name === '@sunderapps/util') {
            this.newPackageJson.scripts.endversion = this.updates.utilScripts.endversion;
        }

        if (sunUtil.isSuperset(this.oldPackageJson, this.newPackageJson)) {
            console.log(`\n${sunUtil.utf8.check} Your project is already up-to-date!\n`);
            exit();
        }

        console.log(`\nRunning update ${sunUtil.utf8.run}\n`,
                    `\n${sunUtil.utf8.new} Here is your updated package.json:\n`,
                    this.newPackageJson,
                    '\n\n');
        do {
            answers.overwrite = prompt(`${sunUtil.utf8.q} Overwrite package.json? [Y/n]: `);
            switch (answers.overwrite.toLowerCase()) {
                case '':
                case 'y':
                case 'yes':
                    settings.overwrite = true;
                    break;
                case 'n':
                case 'no':
                    console.log(`\n${sunUtil.utf8.x} Exiting without overwriting package.json.\n\n`);
                    exit();
                default:
                    console.log(`\n${sunUtil.utf8.alert} Invalid input ${sunUtil.utf8.sad} Please try again.\n\n`);
            }
        } while (!settings.overwrite);

        fs.writeFile(path.resolve('package.json'), JSON.stringify(this.newPackageJson, null, 2), err => {
            if (err) {
                console.error(`\n${sunUtil.utf8.x} An error occurred writing to package.json: ${err}\n`);
                exit(1);
            }
            cp.execSync('npm i', { stdio: 'inherit' });
            console.log(`\n${sunUtil.utf8.check} Update complete! ${sunUtil.utf8.finish}\n`);
        });
    };
};
export default sunUpdate;
new sunUpdate();