import { animations, tokens as TamaguiTokens, media, shorthands } from '@tamagui/config/v4'
import { createTamagui, createTokens } from 'tamagui' // or '@tamagui/core'
import { headingFont, bodyFont } from './fonts.config'

const tokens = createTokens({
	...TamaguiTokens,
	color: {
		danger: '#ff9966',
		purpleDark: '#0C0622',
		success: '#00bb5e',
		successDark: '#99ffcc',
		purple: '#100538',
		purpleGray: '#66617B',
		amethyst: '#7E72AF',
		grape: '#5638BB',
		telemagenta: '#cc2f71',
		white: '#ffffff',
		black: '#000000',
	},
})

const jellifyConfig = createTamagui({
	animations,
	fonts: {
		heading: headingFont,
		body: bodyFont,
	},
	media,
	shorthands,
	tokens,
	themes: {
		dark: {
			shadowColor: tokens.color.purple,
			background: tokens.color.purpleDark,
			backgroundActive: tokens.color.amethyst,
			backgroundPress: tokens.color.amethyst,
			backgroundFocus: tokens.color.amethyst,
			backgroundHover: tokens.color.purpleGray,
			borderColor: tokens.color.amethyst,
			color: tokens.color.white,
			success: tokens.color.successDark,
			primary: tokens.color.telemagenta,
			danger: tokens.color.danger,
		},
		dark_inverted_purple: {
			color: tokens.color.purpleDark,
			borderColor: tokens.color.amethyst,
			background: tokens.color.amethyst,
			success: tokens.color.successDark,
			primary: tokens.color.telemagenta,
			danger: tokens.color.danger,
		},
		light: {
			background: tokens.color.white,
			backgroundActive: tokens.color.amethyst,
			borderColor: tokens.color.purpleGray,
			color: tokens.color.purpleDark,
			success: tokens.color.success,
			primary: tokens.color.telemagenta,
			danger: tokens.color.danger,
		},
		light_inverted_purple: {
			color: tokens.color.purpleDark,
			borderColor: tokens.color.purpleDark,
			background: tokens.color.purpleGray,
			success: tokens.color.success,
			primary: tokens.color.telemagenta,
			danger: tokens.color.danger,
		},
	},
})

export type JellifyConfig = typeof jellifyConfig

declare module 'tamagui' {
	// or '@tamagui/core'
	// overrides TamaguiCustomConfig so your custom types
	// work everywhere you import `tamagui`
	interface TamaguiCustomConfig extends JellifyConfig {}
}

export default jellifyConfig
