import React from 'react'
import Slider from '@react-native-community/slider'
import { StyleSheet, View } from 'react-native'
import { useMaterialTheme } from '../../../material/theme'

interface SliderProps {
	value?: number | undefined
	max: number
	width?: number | undefined
	props: {
		maxWidth?: number
		onSlideStart?: (event: unknown, value: number) => void
		onSlideMove?: (event: unknown, value: number) => void
		onSlideEnd?: (event: unknown, value: number) => void
		onValueChange?: (value: number) => void
		onSlidingComplete?: (value: number) => void
	}
}

export function HorizontalSlider({ value = 0, max, width, props }: SliderProps): React.JSX.Element {
	const { tokens } = useMaterialTheme()

	return (
		<View
			style={[
				styles.container,
				width ? { width } : props.maxWidth ? { width: props.maxWidth } : null,
			]}
		>
			<Slider
				value={value}
				step={1}
				minimumValue={0}
				maximumValue={max}
				minimumTrackTintColor={tokens.color.$primary}
				maximumTrackTintColor={tokens.color.$muted}
				thumbTintColor={tokens.color.$primary}
				onSlidingStart={(val) => props.onSlideStart?.(undefined, val)}
				onValueChange={(val) => {
					props.onSlideMove?.(undefined, val)
					props.onValueChange?.(val)
				}}
				onSlidingComplete={(val) => {
					props.onSlideEnd?.(undefined, val)
					props.onSlidingComplete?.(val)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},
})
