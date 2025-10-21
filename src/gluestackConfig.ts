// src/theme/gluestackConfig.ts
import { createConfig } from '@gluestack-ui/themed';

export const gluestackConfig = createConfig({
    tokens: {
        colors: {
            primary: {
                500: 'rgb(var(--color-primary-500)/<alpha-value>)',
                600: 'rgb(var(--color-primary-600)/<alpha-value>)',
                // add the ones you use in components
            },
            background: {
                0: 'rgb(var(--color-background-0)/<alpha-value>)',
                // ...
            },
            typography: {
                950: 'rgb(var(--color-typography-950)/<alpha-value>)',
            },
            // add other categories you need (error, success, etc.)
        },
        // tokens for spacing, fonts etc. if needed
    },
    aliases: undefined
});
