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
};
export default sunUtil;