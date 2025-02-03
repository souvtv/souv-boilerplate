import { createSystem, defaultConfig ,defineConfig } from '@chakra-ui/react'
import { SouvThemeConfig } from 'souv-components'

import { ButtonRecipe } from './recipes/button'

const baseConfig = defineConfig({

    globalCss: {
        html: {
            //
        },
    },

    theme: {
        recipes: {
            button: ButtonRecipe,
        },
        tokens: {
            fonts: {
                body: {
                    //   value: "'Roboto', sans-serif",
                },
            },
            colors: {
                theme: {
                    // Theme
                    // Gerar Cores apartir da cor principal
                    // https://www.tints.dev/
                    //
                    50: { value: '#EFF1F6', },
                    100: { value: '#DFE3EC', },
                    200: { value: '#C2CADB', },
                    300: { value: '#A2AFC8', },
                    400: { value: '#8596B7', },
                    500: { value: '#657AA4', },
                    600: { value: '#506287', },
                    700: { value: '#3F4D6A', },
                    800: { value: '#2C364A', },
                    900: { value: '#1A202C', },
                    950: { value: '#0D1016', },
                    //
                },
            },
        },
    },
})


export const BaseTheme = createSystem(defaultConfig, SouvThemeConfig, baseConfig)
// Para geração de config tema automatica
export default BaseTheme

