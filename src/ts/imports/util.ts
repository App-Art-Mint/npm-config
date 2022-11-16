/**
 * Imports
 */
//import { exit } from "process";

/**
 * Util functions for the config library
 * @note - make sure to update @sunderapps/util if you update this file (if needed)
 *       - then update the version in update.ts
 */
export abstract class sunUtil {
    /**
     * Emojis
     * @note - add this to its own @sunderapps/util class
     */
    static utf8: {[key: string]: string} = {
        alert: '🚨',
        bang: '❗',
        bangRed: '❗',
        bangWhite: '❕',
        check: '✅',
        finish: '🏁',
        success: '✅',
        ok: '🆗',
        q: '❓',
        question: '❓',
        run: '🏃',
        running: '🏃',
        close: '❌',
        cross: '❌',
        x: '❌',
        info: 'ℹ️',
        warn: '⚠️',
        sad: '😢',
        new: '🆕'
    };

    /**
     * Sorts an object's keys alphabetically
     */
    static sortObject (object: any) : Object {
        return Object.keys(object).sort().reduce((obj: any, key: string) => {
            obj[key] = object[key];
            return obj;
        }, {});
    };

    /**
     * Removes object keys and values
     */
    static removeObjectEntries (object: any, keys: string[]) : Object {
        return Object.keys(object).reduce((obj: any, key: string) => {
            if (!keys.includes(key)) {
                obj[key] = object[key];
            }
            return obj;
        }, {});
    };

    /**
     * Returns true if the first object has at least the same
     * entries as the second object
     * @param superset - the object to check
     * @param subset - the object whose entries are required
     * @returns - true if the first object is a superset of the second
     * @recursive - (kind of - calls other functions that call this function)
     */
    static isSuperset (superset: any, subset: any) : boolean {
        let isSuperset: boolean = true;

        if (superset === subset) {
            return true;
        }

        try {
            Object.keys(subset).forEach((key: string) => {
                isSuperset = isSuperset
                    && (typeof subset[key] === 'object' && subset[key] !== null
                        ? Array.isArray(subset[key])
                            ? sunUtil.isSupersetArray(superset[key], subset[key])
                            : sunUtil.isSuperset(superset[key], subset[key])
                        : false);
            });
        }
        catch (e) {
            return false;
        }
        return isSuperset;
    };

    /**
     * Returns true if the first array has at least the same
     * entries as the second array
     * @param superset - the array to check
     * @param subset - the array whose entries are required
     * @returns - true if the first array is a superset of the second
     */
    static isSupersetArray (superset: any[], subset: any[]) : boolean {
        return subset.every((value: any) => superset.includes(value));
    };
};
export default sunUtil;