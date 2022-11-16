/**
 * Babel Configuration
 */
export const sunBabelConfig: any = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: 'defaults'
            }
        ]
    ]
};
export default sunBabelConfig;