// DownloadProgressBar.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useNetworkContext } from '../Network/provider'

export const DownloadProgressBar = () => {
	const { activeDownloads } = useNetworkContext()
	const downloads = activeDownloads ?? []

	return (
		<View style={styles.container}>
			{/* Map activeDownloads array instead of useQuery */}
			{downloads.map((item) => {
				const animatedWidth = useSharedValue(item.progress)
				animatedWidth.value = withTiming(item.progress, { duration: 200 })

				const animatedStyle = useAnimatedStyle(() => ({
					width: `${animatedWidth.value * 100}%`,
				}))

				return (
					<View key={item.name} style={styles.item}>
						<Text style={styles.label}>{item.name}</Text>
						<View style={styles.bar}>
							<Animated.View style={[styles.fill, animatedStyle]} />
						</View>
					</View>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 12,
		backgroundColor: '#111',
	},
	item: {
		marginBottom: 12,
	},
	label: {
		color: '#fff',
		marginBottom: 4,
		fontSize: 14,
	},
	bar: {
		height: 8,
		backgroundColor: '#333',
		borderRadius: 4,
		overflow: 'hidden',
	},
	fill: {
		height: 8,
		backgroundColor: '#00bcd4',
		borderRadius: 4,
	},
})
