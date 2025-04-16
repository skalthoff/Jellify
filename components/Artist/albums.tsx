import React from 'react'
import { FlatList } from 'react-native'
import { ItemCard } from '../Global/components/item-card'
import { ArtistAlbumsProps, ArtistEpsProps } from '../types'
import { Text } from '../Global/helpers/text'
import { useArtistContext } from './provider'
import { convertRunTimeTicksToSeconds } from '../../helpers/runtimeticks'

export default function Albums({
	route,
	navigation,
}: ArtistAlbumsProps | ArtistEpsProps): React.JSX.Element {
	const { albums, setScroll } = useArtistContext()

	return (
		<FlatList
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: 'flex-start',
				alignSelf: 'center',
			}}
			data={
				albums
					? albums.filter(
							(album) =>
								// If we're displaying albums, limit the album array
								// to those that have at least 6 songs or a runtime longer
								// than 30 minutes
								(route.name === 'ArtistAlbums' &&
									((album.ChildCount && album.ChildCount >= 6) ||
										convertRunTimeTicksToSeconds(album.RunTimeTicks ?? 0) / 60 >
											30)) ||
								(route.name === 'ArtistEps' &&
									((album.ChildCount && album.ChildCount < 6) ||
										convertRunTimeTicksToSeconds(album.RunTimeTicks ?? 0) /
											60 <=
											30)),
					  )
					: []
			}
			numColumns={2} // TODO: Make this adjustable
			renderItem={({ item: album }) => (
				<ItemCard
					caption={album.Name}
					subCaption={album.ProductionYear?.toString()}
					size={'$14'}
					squared
					item={album}
					onPress={() => {
						navigation.navigate('Album', {
							album,
						})
					}}
				/>
			)}
			onScroll={(event) => {
				console.debug(event.nativeEvent.contentSize.height)

				if (event.nativeEvent.contentSize.height > 1000)
					setScroll(event.nativeEvent.contentOffset.y)
			}}
			ListEmptyComponent={
				<Text textAlign='center' justifyContent='center'>
					No albums
				</Text>
			}
		/>
	)
}
