import { animations, tokens, themes, media, shorthands, config } from '@tamagui/config/v3'
import { createFont, createTamagui } from 'tamagui' // or '@tamagui/core'

const aileronFace = {
    100: { normal: 'Aileron UltraLight', italic: 'Aileron-UltraLightItalic' },
    200: { normal: 'Aileron Thin', italic: 'Aileron-ThinItalic' },
    300: { normal: 'Aileron Light', italic: 'Aileron-LightItalic' },
    400: { normal: 'Aileron', italic: 'Aileron-Italic'} ,
    500: { normal: 'Aileron', italic: 'Aileron-Italic' },
    600: { normal: 'Aileron SemiBold', italic: 'Aileron-SemiBoldItalic' },
    700: { normal: 'Aileron Bold', italic: 'Aileron-BoldItalic' },
    800: { normal: 'Aileron Heavy', italic: 'Aileron-HeavyItalic' },
    900: { normal: 'Aileron Black', italic: 'Aileron-BlackItalic' },
};

const bodyFont = createFont({
    size: config.fonts.body.size,
    lineHeight: config.fonts.body.lineHeight,
    weight: config.fonts.body.weight,
    letterSpacing: config.fonts.body.letterSpacing,
    face: aileronFace
})

const headingFont = createFont({
    size: config.fonts.heading.size,
    lineHeight: config.fonts.heading.lineHeight,
    weight: config.fonts.heading.weight,
    letterSpacing: config.fonts.heading.letterSpacing,
    face: aileronFace
})

const jellifyConfig = createTamagui({
    animations,
    fonts:{
        heading: headingFont,
        body: bodyFont,
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