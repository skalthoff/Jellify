import React from 'react'
import { useNowPlayingContext } from '../../../providers/Player'
import { getToken, useTheme, View, YStack, ZStack } from 'tamagui'
import { useColorScheme } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useThemeSettingContext } from '../../../providers/Settings'
import { getPrimaryBlurhashFromDto } from '../../../utils/blurhash'
import { Blurhash } from 'react-native-blurhash'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

export default function BlurredBackground({
	width,
	height,
}: {
	width: number
	height: number
}): React.JSX.Element {
	const nowPlaying = useNowPlayingContext()

	const themeSetting = useThemeSettingContext()

	const theme = useTheme()

	const isDarkMode =
		themeSetting === 'dark' || (themeSetting === 'system' && useColorScheme() === 'dark')

	const blurhash = getPrimaryBlurhashFromDto(nowPlaying!.item)

	return (
		<ZStack flex={1} width={width} height={height}>
			<Animated.View
				style={{ flex: 1, width: width, height: height }}
				entering={FadeIn}
				exiting={FadeOut}
				key={`${nowPlaying!.item.AlbumId}-blurred-background`}
			>
				{blurhash && (
					<Blurhash
						blurhash={blurhash}
						style={{
							width: width,
							height: height,
						}}
					/>
				)}
			</Animated.View>

			{isDarkMode ? (
				<YStack width={width} height={height} position='absolute' flex={1}>
					<LinearGradient
						colors={[getToken('$black'), getToken('$black25')]}
						style={{
							width,
							height,
							flex: 1,
						}}
					/>

					<LinearGradient
						colors={[
							getToken('$black25'),
							getToken('$black75'),
							getToken('$black'),
							getToken('$black'),
						]}
						style={{
							width,
							height,
							flex: 2,
						}}
					/>
				</YStack>
			) : (
				<View
					flex={1}
					position='absolute'
					top={0}
					left={0}
					right={0}
					bottom={0}
					backgroundColor={theme.background.val}
					width={width}
					height={height}
					opacity={0.5}
				/>
			)}
		</ZStack>
	)
}
