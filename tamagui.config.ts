import { animations, tokens as TamaguiTokens, media, shorthands } from '@tamagui/config/v3'
import { createTamagui, createTokens } from 'tamagui' // or '@tamagui/core'
import { headingFont, bodyFont } from './fonts.config'

const tokens = createTokens({
  ...TamaguiTokens,
  color: {
    purpleDark: "#070217",
    purple: "#5638BB",
    purpleGray: "#66617B",
    telemagenta: "#cc2f71",
    white: "#ffffff",
    black: "#000000"
  },
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
    themes: {
      dark: {
        background: tokens.color.purpleDark,
        borderColor: tokens.color.purple,
        color: tokens.color.white
      },
      dark_purple: {
        color: tokens.color.purpleDark,
        borderColor: tokens.color.purple,
        background: tokens.color.white
      },
      light: {
        background: tokens.color.white,
        borderColor: tokens.color.purpleGray,
        color: tokens.color.purpleDark
      },
      light_purple: {
        color: tokens.color.white,
        borderColor: tokens.color.purpleGray,
        background: tokens.color.purpleDark
      }
    }
});

export type JellifyConfig = typeof jellifyConfig

declare module 'tamagui' {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends JellifyConfig {}
}

export default jellifyConfig