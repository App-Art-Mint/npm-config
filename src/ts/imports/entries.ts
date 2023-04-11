/**
 * Imports
 */
import path from 'path';
import glob from 'glob';
import { exit } from 'process';
import mintConfig from './config';

/**
 * Flag for duplicate entries
 */
 let conflicts: boolean = false;

/**
 * Add the given file to the given entries
 * @param entries - the collection of entries
 * @param file - the file to add
 * @param upper - whether to capitalize the entry key or not
 * @returns - the updated collection of entries
 */
export function mintAddEntry (entries: {[key: string]: string}, 
                             file: string,
                             upper?: boolean)
                             : {[key: string]: string} {
    let name: string = path.parse(file).name;
    name = upper ? name[0].toUpperCase() + name.slice(1) : name;

    if (entries[name]) {
        if (!conflicts) {
            console.error('Entry file names must be unique, even if in a different folder.\nDuplicate entry names:\n');
        }
        console.error(`  ${entries[name]}\n  ${file}\n`);
        conflicts = true;
    } else {
        entries[name] = file;
    }
    return entries;
};

/**
 * Typescript Entries
 */
export const mintTSEntries: {[key: string]: string} =
    glob.sync(`${mintConfig.paths.ts}/{!(${mintConfig.index})${mintConfig.exts.ts},!(${mintConfig.dirs.bin}|${mintConfig.dirs.config}|${mintConfig.dirs.imports})/**/*${mintConfig.exts.ts}}`)
    .reduce((entries: {[key: string]: string}, file: string) => mintAddEntry(entries, file, true), {});

/**
 * Index Entries
 */
export const mintIndexEntries: {[key: string]: string} =
    glob.sync(`${mintConfig.paths.ts}/${mintConfig.index}${mintConfig.exts.ts}`)
    .reduce((entries: {[key: string]: string}, file: string) => mintAddEntry(entries, file, true), {});

/**
 * Node Entries
 */
export const mintNodeEntries: {[key: string]: string} =
    glob.sync(`${mintConfig.paths.ts}/{${mintConfig.dirs.bin},${mintConfig.dirs.config}}/**/*${mintConfig.exts.ts}`)
    .reduce((entries: {[key: string]: string}, file: string) => mintAddEntry(entries, file, true), {});

/**
 * Scss Entries
 */
export const mintSCSSEntries: {[key: string]: string} =
    glob.sync(`${mintConfig.paths.scss}/{*${mintConfig.exts.scss},!(${mintConfig.dirs.imports})/**/*${mintConfig.exts.scss}}`)
    .reduce((entries: {[key: string]: string}, file: string) => mintAddEntry(entries, file), {});

/**
 * Exit if there were conflicts in the entries
 */
if (conflicts) {
    console.error('\n🚨 Aborted: Entry Conflicts (see above) 🚨\n\n');
    exit(1);
}