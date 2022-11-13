/**
 * Imports
 */
import path from 'path';
import glob from 'glob';
import { exit } from 'process';
import sunConfig from './config';

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
export function sunAddEntry (entries: {[key: string]: string}, 
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
export const sunTSEntries: {[key: string]: string} =
    glob.sync(`${sunConfig.paths.ts}/{!(${sunConfig.index})${sunConfig.exts.ts},!(${sunConfig.dirs.bin}|${sunConfig.dirs.config}|${sunConfig.dirs.imports})/**/*${sunConfig.exts.ts}}`)
    .reduce((entries: {[key: string]: string}, file: string) => sunAddEntry(entries, file, true), {});

/**
 * Index Entries
 */
export const sunIndexEntries: {[key: string]: string} =
    glob.sync(`${sunConfig.paths.ts}/${sunConfig.index}${sunConfig.exts.ts}`)
    .reduce((entries: {[key: string]: string}, file: string) => sunAddEntry(entries, file, true), {});

/**
 * Configuration Entries
 */
export const sunConfigEntries: {[key: string]: string} =
    glob.sync(`${sunConfig.paths.ts}/{${sunConfig.dirs.bin},${sunConfig.dirs.config}}/**/*${sunConfig.exts.ts}`)
    .reduce((entries: {[key: string]: string}, file: string) => sunAddEntry(entries, file, true), {});

/**
 * Scss Entries
 */
export const sunSCSSEntries: {[key: string]: string} =
    glob.sync(`${sunConfig.paths.scss}/{*${sunConfig.exts.scss},!(${sunConfig.dirs.imports})/**/*${sunConfig.exts.scss}}`)
    .reduce((entries: {[key: string]: string}, file: string) => sunAddEntry(entries, file), {});

/**
 * Exit if there were conflicts in the entries
 */
if (conflicts) {
    console.error('\n🚨 Aborted: Entry Conflicts (see above) 🚨\n\n');
    exit(1);
}