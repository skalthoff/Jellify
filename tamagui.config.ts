import { animations, tokens, themes, media, shorthands } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui' // or '@tamagui/core'
import { headingFont, bodyFont } from './fonts.config'
import { jellifyTokens } from './colors.config'

const jellifyConfig = createTamagui({
    animations,
    fonts:{
        heading: headingFont,
        body: bodyFont,
    },
    media,
    shorthands,
    jellifyTokens,
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