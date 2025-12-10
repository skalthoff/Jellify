/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, createContext, useContext, useMemo } from 'react'
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper'

export type ThemeName = 'light' | 'dark' | 'oled'

export type ThemeTokens = {
	color: Record<string, string>
	space: Record<string, number>
	size: Record<string, { val: number }>
}

export interface ThemeContextValue {
	name: ThemeName
	tokens: ThemeTokens
}

const baseSpacing: ThemeTokens['space'] = {
	$0: 0,
	'$0.25': 2,
	'$0.5': 4,
	'$0.75': 6,
	$1: 8,
	$2: 12,
	$3: 16,
	$4: 20,
	$5: 24,
	$6: 28,
	$8: 32,
	$10: 40,
	$12: 48,
	$20: 80,
}

const baseSize: ThemeTokens['size'] = Object.fromEntries(
	Object.entries(baseSpacing).map(([key, value]) => [key, { val: value }]),
) as ThemeTokens['size']

const lightTokens: ThemeTokens = {
	color: {
		$background: MD3LightTheme.colors.background,
		$foreground: MD3LightTheme.colors.onSurface,
		$primary: MD3LightTheme.colors.primary,
		$primaryLight: MD3LightTheme.colors.primary,
		$primaryDark: MD3DarkTheme.colors.primary,
		$secondary: MD3LightTheme.colors.secondary,
		$muted: MD3LightTheme.colors.outline,
		$neutral: '#D9D9D9',
		$gray9: '#121212',
		$purpleDark: '#4A148C',
		$white: '#FFFFFF',
		$black: '#000000',
		$darkBackground: '#121212',
		$transparent: 'transparent',
		$success: '#4CAF50',
		$danger: '#EF4444',
		$info: '#2196F3',
		$color: MD3LightTheme.colors.onSurface,
	},
	space: baseSpacing,
	size: baseSize,
}

const darkTokens: ThemeTokens = {
	color: {
		$background: '#121212',
		$foreground: MD3DarkTheme.colors.onSurface,
		$primary: MD3DarkTheme.colors.primary,
		$primaryLight: MD3LightTheme.colors.primary,
		$primaryDark: MD3DarkTheme.colors.primary,
		$secondary: MD3DarkTheme.colors.secondary,
		$muted: MD3DarkTheme.colors.outline,
		$neutral: '#262626',
		$gray9: '#121212',
		$purpleDark: '#BB86FC',
		$white: '#FFFFFF',
		$black: '#000000',
		$darkBackground: '#000000',
		$transparent: 'transparent',
		$success: '#22C55E',
		$danger: '#EF4444',
		$info: '#2196F3',
		$color: MD3DarkTheme.colors.onSurface,
	},
	space: baseSpacing,
	size: baseSize,
}

const oledTokens: ThemeTokens = {
	...darkTokens,
	color: {
		...darkTokens.color,
		$background: '#000000',
		$darkBackground: '#000000',
	},
	size: baseSize,
}

function resolveTokens(name: ThemeName): ThemeTokens {
	switch (name) {
		case 'dark':
			return darkTokens
		case 'oled':
			return oledTokens
		default:
			return lightTokens
	}
}

const ThemeContext = createContext<ThemeContextValue>({
	name: 'light',
	tokens: resolveTokens('light'),
})

export function useMaterialTheme(): ThemeContextValue {
	return useContext(ThemeContext)
}

export function getTokens(): ThemeTokens {
	const { tokens } = useContext(ThemeContext)
	return tokens
}

export function getToken(path: keyof ThemeTokens['color'] | keyof ThemeTokens['space']): any {
	const { tokens } = useContext(ThemeContext)
	return (
		(tokens.color as any)[path] ??
		(tokens.space as any)[path] ??
		(tokens.size as any)[path]?.val
	)
}

export function getTokenValue(path: keyof ThemeTokens['color'] | keyof ThemeTokens['space']): any {
	return getToken(path)
}

export function MaterialThemeProvider({
	name,
	children,
}: {
	name: ThemeName
	children: ReactNode
}): React.JSX.Element {
	const tokens = useMemo(() => resolveTokens(name), [name])

	const paperTheme = useMemo(() => {
		if (name === 'dark' || name === 'oled') {
			return {
				...MD3DarkTheme,
				colors: {
					...MD3DarkTheme.colors,
					background: tokens.color.$background,
					surface: tokens.color.$background,
					primary: tokens.color.$primary,
					outline: tokens.color.$muted,
				},
			}
		}

		return {
			...MD3LightTheme,
			colors: {
				...MD3LightTheme.colors,
				background: tokens.color.$background,
				surface: tokens.color.$background,
				primary: tokens.color.$primary,
				outline: tokens.color.$muted,
			},
		}
	}, [name, tokens])

	const value = useMemo(() => ({ name, tokens }), [name, tokens])

	return (
		<ThemeContext.Provider value={value}>
			<PaperProvider theme={paperTheme}>{children}</PaperProvider>
		</ThemeContext.Provider>
	)
}
