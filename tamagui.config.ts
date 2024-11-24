import { animations, tokens, themes, media, shorthands, config } from '@tamagui/config/v3'
import { createFont, createTamagui } from 'tamagui' // or '@tamagui/core'

const aileronFace = {
    100: { normal: 'Aileron-UltraLight', italic: 'Aileron UltraLight Italic' },
    200: { normal: 'Aileron-Thin', italic: 'Aileron Thin Italic' },
    300: { normal: 'Aileron-Light', italic: 'Aileron Light Italic' },
    400: { normal: 'Aileron-Regular', italic: 'Aileron Italic'} ,
    500: { normal: 'Aileron-Regular', italic: 'Aileron Italic' },
    600: { normal: 'Aileron-SemiBold', italic: 'Aileron SemiBold Italic' },
    700: { normal: 'Aileron-Bold', italic: 'Aileron Bold Italic' },
    800: { normal: 'Aileron-Heavy', italic: 'Aileron Heavy Italic' },
    900: { normal: 'Aileron-Black', italic: 'Aileron-BlackItalic' }
};

const bodyFont = createFont({
    family: "Aileron-Bold",
    size: config.fonts.body.size,
    lineHeight: config.fonts.body.lineHeight,
    weight: config.fonts.body.weight,
    letterSpacing: config.fonts.body.letterSpacing,
    face: aileronFace
})

const headingFont = createFont({
    family: "Aileron-Black",
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