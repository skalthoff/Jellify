import { animations, tokens, themes, media, shorthands } from '@tamagui/config/v3'
import { createFont, createTamagui } from 'tamagui' // or '@tamagui/core'

const jellifyFont = createFont({
    family: 'Aileron-Regular, Helvetica, Arial, sans-serif',
    size: {
        1: 12,
        2: 14,
        3: 15,
    },
    face: {
        100: { normal: 'Aileron-UltraLight', italic: 'Aileron-UltraLightItalic' },
        200: { normal: 'Aileron-Thin', italic: 'Aileron-ThinItalic' },
        300: { normal: 'Aileron-Light', italic: 'Aileron-LightItalic' },
        400: { normal: 'Aileron-Regular', italic: 'Aileron-Italic'} ,
        500: { normal: 'Aileron-Regular', italic: 'Aileron-Italic' },
        600: { normal: 'Aileron-SemiBold', italic: 'Aileron-SemiBoldItalic' },
        700: { normal: 'Aileron-Bold', italic: 'Aileron-BoldItalic' },
        800: { normal: 'Aileron-Heavy', italic: 'Aileron-HeavyItalic' },
        900: { normal: 'Aileron-Black', italic: 'Aileron-BlackItalic' },
    }
})
const jellifyConfig = createTamagui({
    animations,
    fonts:{
        heading: jellifyFont,
        body: jellifyFont,
    },
    media,
    shorthands,
    tokens,
    themes,
})

export type JellifyConfig = typeof jellifyConfig

declare module 'tamagui' {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends JellifyConfig {}
}

export default jellifyConfig