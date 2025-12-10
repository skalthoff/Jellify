/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name */
import React, { ReactNode } from 'react'
import {
	ActivityIndicator,
	Image as RNImage,
	ScrollView as RNScrollView,
	Text as RNText,
	TextProps as RNTextProps,
	View as RNView,
	ViewProps,
	useWindowDimensions as rnUseWindowDimensions,
} from 'react-native'
import {
	Button as PaperButton,
	Checkbox as CheckboxPaper,
	List,
	ProgressBar,
	RadioButton,
	Switch as PaperSwitch,
	TextInput,
	Card as PaperCard,
	useTheme as usePaperTheme,
} from 'react-native-paper'
import { getToken, getTokenValue, getTokens, useMaterialTheme } from './theme'

export { getToken, getTokenValue, getTokens }
export const useWindowDimensions = rnUseWindowDimensions

export type SizeTokens = keyof ReturnType<typeof getTokens>['space']
export type ColorTokens = keyof ReturnType<typeof getTokens>['color']
export type ThemeTokens = ReturnType<typeof getTokens>
export type Tokens = ThemeTokens
export type AnimationKeys = string
export type Token = string | number
export type ThemeParsed = ReturnType<typeof useTheme>

export function useTheme() {
	const theme = useMaterialTheme()
	const paperTheme = usePaperTheme()
	const palette = theme.tokens.color
	const mapped = Object.fromEntries(
		Object.entries(palette).map(([key, value]) => [
			key.startsWith('$') ? key.slice(1) : key,
			{ val: value },
		]),
	)

	return {
		...paperTheme,
		...mapped,
		tokens: theme.tokens,
		name: theme.name,
		color: palette,
	}
}

function mapSpacing(value?: Token) {
	if (typeof value === 'number') return value
	if (typeof value === 'string' && value.startsWith('$')) {
		const tokens = getTokens()
		return (tokens.space as any)[value] ?? 0
	}
	return value as any
}

function mapColor(value?: string) {
	if (!value) return value
	if (value.startsWith('$')) {
		return (getTokens().color as any)[value] ?? value
	}
	return value
}

interface StackProps extends ViewProps {
	children?: ReactNode
	gap?: Token
	space?: Token
	padding?: Token
	paddingHorizontal?: Token
	paddingVertical?: Token
	paddingTop?: Token
	paddingBottom?: Token
	paddingLeft?: Token
	paddingRight?: Token
	margin?: Token
	marginHorizontal?: Token
	marginVertical?: Token
	marginTop?: Token
	marginBottom?: Token
	marginLeft?: Token
	marginRight?: Token
	width?: Token
	height?: Token
	backgroundColor?: string
	borderRadius?: number | string
	flex?: number
	justifyContent?: any
	alignItems?: any
	alignContent?: any
	flexWrap?: any
}

function buildStyle(props: StackProps) {
	const spacing = mapSpacing(props.gap ?? props.space)
	return [
		props.style,
		{
			gap: spacing,
			padding: mapSpacing(props.padding),
			paddingHorizontal: mapSpacing(props.paddingHorizontal),
			paddingVertical: mapSpacing(props.paddingVertical),
			paddingTop: mapSpacing(props.paddingTop),
			paddingBottom: mapSpacing(props.paddingBottom),
			paddingLeft: mapSpacing(props.paddingLeft),
			paddingRight: mapSpacing(props.paddingRight),
			margin: mapSpacing(props.margin),
			marginHorizontal: mapSpacing(props.marginHorizontal),
			marginVertical: mapSpacing(props.marginVertical),
			marginTop: mapSpacing(props.marginTop),
			marginBottom: mapSpacing(props.marginBottom),
			marginLeft: mapSpacing(props.marginLeft),
			marginRight: mapSpacing(props.marginRight),
			width: mapSpacing(props.width),
			height: mapSpacing(props.height),
			backgroundColor: mapColor(props.backgroundColor),
			borderRadius:
				typeof props.borderRadius === 'string'
					? mapSpacing(props.borderRadius)
					: props.borderRadius,
			flex: props.flex,
			justifyContent: props.justifyContent,
			alignItems: props.alignItems,
			alignContent: props.alignContent,
			flexWrap: props.flexWrap,
		},
	]
}

export function XStack(props: StackProps): React.JSX.Element {
	return <RNView {...props} style={[{ flexDirection: 'row' }, buildStyle(props)]} />
}

export function YStack(props: StackProps): React.JSX.Element {
	return <RNView {...props} style={[{ flexDirection: 'column' }, buildStyle(props)]} />
}

export function ZStack(props: StackProps): React.JSX.Element {
	return (
		<RNView {...props} style={[{ position: 'relative' }, buildStyle(props)]}>
			{props.children}
		</RNView>
	)
}

export function View(props: StackProps): React.JSX.Element {
	return <RNView {...props} style={buildStyle(props)} />
}

export function ScrollView({ children, ...rest }: any): React.JSX.Element {
	return (
		<RNScrollView
			{...rest}
			contentContainerStyle={[buildStyle(rest) as any, rest.contentContainerStyle]}
		>
			{children}
		</RNScrollView>
	)
}

export function Separator({
	vertical,
	...rest
}: StackProps & { vertical?: boolean }): React.JSX.Element {
	const thickness = mapSpacing(rest.height ?? rest.width ?? '$0.25') as number
	const style = vertical
		? { width: thickness, height: '100%' }
		: { height: thickness, width: '100%' }
	const backgroundColor = mapColor(rest.backgroundColor) ?? getTokens().color.$muted
	return <RNView {...rest} style={[style, { backgroundColor }, buildStyle(rest)]} />
}

export function Spacer({ size = '$2', ...rest }: { size?: Token } & StackProps): React.JSX.Element {
	const spacing = mapSpacing(size)
	return <RNView {...rest} style={[{ width: spacing, height: spacing }, buildStyle(rest)]} />
}

export function Spinner({ color, ...rest }: { color?: string }): React.JSX.Element {
	return <ActivityIndicator color={mapColor(color)} {...rest} />
}

export const useThemeSetting = useMaterialTheme

export function Square({ size = '$4', children, ...rest }: StackProps & { size?: Token }) {
	const resolved = mapSpacing(size)
	return (
		<RNView {...rest} style={[{ width: resolved, height: resolved }, buildStyle(rest)]}>
			{children}
		</RNView>
	)
}

export function ListItem({ children, ...rest }: any) {
	return <List.Item {...rest} title={() => <RNText>{children}</RNText>} />
}

export function YGroup({ children, ...rest }: StackProps) {
	return (
		<RNView {...rest} style={buildStyle(rest)}>
			{React.Children.map(children, (child, index) => (
				<RNView key={index}>{child}</RNView>
			))}
		</RNView>
	)
}

export function SizableText(props: RNTextProps & { size?: Token }) {
	return (
		<RNText
			{...props}
			style={[
				props.style,
				{
					fontSize: props.size ? mapSpacing(props.size) : undefined,
					color: mapColor((props as any).color),
				},
			]}
		/>
	)
}

export function Paragraph(props: RNTextProps) {
	return <RNText {...props} style={[{ fontSize: 14 }, props.style]} />
}

export function Text(props: RNTextProps) {
	return <RNText {...props} />
}

export function H3(props: RNTextProps) {
	return <RNText {...props} style={[{ fontSize: 22, fontWeight: '700' }, props.style]} />
}

export function H5(props: RNTextProps) {
	return <RNText {...props} style={[{ fontSize: 18, fontWeight: '600' }, props.style]} />
}

export function H6(props: RNTextProps) {
	return <RNText {...props} style={[{ fontSize: 16, fontWeight: '600' }, props.style]} />
}

export function Label({ htmlFor: _htmlFor, ...rest }: any) {
	return <RNText {...rest} />
}

export function Button(props: any) {
	return <PaperButton mode='contained' {...props} />
}

export function Image(props: any) {
	return <RNImage {...props} />
}

export function Input(props: any) {
	return <TextInput mode='outlined' {...props} />
}

export const ToggleGroup: any = ({ children }: { children: ReactNode }) => (
	<RNView>{children}</RNView>
)

export const RadioGroup: any = ({ value, onValueChange, children }: any) => (
	<RadioButton.Group value={value} onValueChange={onValueChange}>
		{children}
	</RadioButton.Group>
)

RadioGroup.Item = ({ value }: any) => <RadioButton value={value} />
RadioGroup.Indicator = () => null

export const Checkbox = ({ checked, onCheckedChange, children, ...rest }: any) => (
	<CheckboxPaper
		status={checked ? 'checked' : 'unchecked'}
		onPress={() => onCheckedChange?.(!checked)}
		color={mapColor('$primary')}
		uncheckedColor={mapColor('$muted')}
		{...rest}
	>
		{children}
	</CheckboxPaper>
)

Checkbox.Indicator = ({ children }: any) => <>{children}</>

export const CheckboxComponent = Checkbox

export const Switch = ({ checked, onCheckedChange }: any) => (
	<PaperSwitch value={checked} onValueChange={onCheckedChange} />
)

export const Slider: any = () => null
export const styled: any = () => null
export const themeable: any = (component: any) => component

export function Card(props: any) {
	return <PaperCard {...props} />
}

export const Progress = ProgressBar
export const Circle = ({ size = 24, style, ...rest }: any) => (
	<RNView
		{...rest}
		style={[
			{
				width: mapSpacing(size),
				height: mapSpacing(size),
				borderRadius: mapSpacing(size) as number,
				backgroundColor: mapColor((rest as any).backgroundColor) ?? mapColor('$primary'),
			},
			style,
		]}
	/>
)

export const Theme = ({ children }: { children: ReactNode }) => <>{children}</>
