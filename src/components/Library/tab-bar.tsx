import { MaterialTopTabBar, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import React, { useEffect } from 'react'
import { Separator, Spacer, XStack, YStack } from 'tamagui'
import Icon from '../Global/components/icon'
import { useLibrarySortAndFilterContext } from '../../providers/Library/sorting-filtering'
import { Text } from '../Global/helpers/text'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { isUndefined } from 'lodash'

export default function LibraryTabBar(props: MaterialTopTabBarProps) {
	const {
		sortDescending,
		setSortDescending,
		isFavorites,
		setIsFavorites,
		isDownloaded,
		setIsDownloaded,
	} = useLibrarySortAndFilterContext()

	return (
		<YStack>
			<MaterialTopTabBar {...props} />

			{[''].includes(props.state.routes[props.state.index].name) ? null : (
				<XStack
					paddingHorizontal={'$4'}
					paddingVertical={'$2'}
					borderWidth={'$1'}
					borderColor={'$borderColor'}
					marginTop={'$2'}
					marginHorizontal={'$2'}
					borderRadius={'$4'}
					backgroundColor={'$background'}
					alignItems={'center'}
					justifyContent='flex-end'
				>
					{props.state.routes[props.state.index].name === 'Playlists' ? (
						<XStack
							flex={1}
							onPress={() => props.navigation.navigate('AddPlaylist')}
							alignItems={'center'}
							justifyContent={'center'}
						>
							<Icon name={'plus-circle-outline'} color={'$primary'} />

							<Text color={'$primary'}>Create Playlist</Text>
						</XStack>
					) : (
						<XStack
							flex={1}
							onPress={() =>
								setIsFavorites(!isUndefined(isFavorites) ? undefined : true)
							}
							alignItems={'center'}
							justifyContent={'center'}
						>
							<Icon
								name={isFavorites ? 'heart' : 'heart-outline'}
								color={isFavorites ? '$primary' : '$borderColor'}
							/>

							<Text color={isFavorites ? '$primary' : '$borderColor'}>
								{isFavorites ? 'Favorites' : 'All'}
							</Text>
						</XStack>
					)}

					{props.state.routes[props.state.index].name === 'Tracks' && (
						<XStack
							flex={1}
							onPress={() => setIsDownloaded(!isDownloaded)}
							alignItems={'center'}
							justifyContent={'center'}
						>
							<Icon
								name={isDownloaded ? 'download' : 'download-outline'}
								color={isDownloaded ? '$success' : '$borderColor'}
							/>

							<Text color={isDownloaded ? '$success' : '$borderColor'}>
								{isDownloaded ? 'Downloaded' : 'All'}
							</Text>
						</XStack>
					)}
				</XStack>
			)}
		</YStack>
	)
}
