/**
 * Babel Configuration
 */
export const mintBabelConfig: any = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: 'defaults'
            }
        ]
    ]
};
export default mintBabelConfig;