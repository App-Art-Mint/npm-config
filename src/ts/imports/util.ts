/**
 * Util functions for the config library
 */
export abstract class sunUtil {
    /**
     * Emojis
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
     * @recursive
     */
     static isSuperset (superset: any, subset: any) : boolean {
        console.log(superset, '\n\n\n', subset);
        let isSuperset: boolean = true;
        
        // Base case - if the objects are equal, it is a superset
        if (superset === subset) {
            return isSuperset;
        }

        // If the subset isn't an object or array, and doesn't
        // satisfy the base case, it isn't a superset
        try {
            if (Object.keys(subset).length === 0) {
                return !isSuperset;
            }
        }
        // If the subset is null or undefined, and doesn't satisfy
        // the base case, it isn't a superset
        // TODO: Check if other exceptions could occur
        catch (e) {
            return !isSuperset;
        }

        // If the children of the subset are subsets of the
        // respective children of the superset, it is a superset
        Object.keys(subset).forEach((key: string) => {
            isSuperset = isSuperset && sunUtil.isSuperset(superset[key], subset[key]);
        });
        return isSuperset;
    };
};
export default sunUtil;