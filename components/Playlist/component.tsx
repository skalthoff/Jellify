import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { getTokens, XStack, YStack } from "tamagui";
import { useItemTracks } from "../../api/queries/tracks";
import { RunTimeTicks } from "../Global/helpers/time-codes";
import { H4, H5, Text } from "../Global/helpers/text";
import Track from "../Global/components/track";
import BlurhashedImage from "../Global/components/blurhashed-image";
import DraggableFlatList from "react-native-draggable-flatlist";
import { reorderPlaylist } from "../../api/mutations/functions/playlists";
import { useEffect, useState } from "react";
import Icon from "../Global/helpers/icon";

interface PlaylistProps { 
    playlist: BaseItemDto;
    navigation: NativeStackNavigationProp<StackParamList>
}

export default function Playlist({
    playlist,
    navigation
}: PlaylistProps): React.JSX.Element {

    const [editing, setEditing] = useState<boolean>(false);
    const [playlistTracks, setPlaylistTracks] = useState<BaseItemDto[]>([]);
    const { data: tracks, isPending, isSuccess, refetch } = useItemTracks(playlist.Id!);

    navigation.setOptions({
        headerRight: () => {
            return (
                <Icon 
                    color={editing 
                        ? getTokens().color.telemagenta.val 
                        : getTokens().color.white.val
                    }
                    name={editing ? 'check' : 'pencil'} 
                    onPress={() => setEditing(!editing)} 
                />
            )
        }
    });

    useEffect(() => {
        if (!isPending && isSuccess)
            setPlaylistTracks(tracks);
    }, [
        isPending,
        isSuccess
    ])

    useEffect(() => {
        if (!editing)
            refetch();
    }, [
        editing
    ])

    return (
        <DraggableFlatList
            contentInsetAdjustmentBehavior="automatic"
            data={playlistTracks}
            dragHitSlop={{ left: -50 }} // https://github.com/computerjazz/react-native-draggable-flatlist/issues/336
            keyExtractor={({ Id }, index) => {
                return `${index}-${Id}`
            }}
            ListHeaderComponent={(
                <YStack alignItems="center">
                    <BlurhashedImage
                        item={playlist}
                        width={300}
                    />

                    <H4>{ playlist.Name ?? "Untitled Playlist" }</H4>
                    <H5>{ playlist.ProductionYear?.toString() ?? "" }</H5>
                </YStack>
            )}
            numColumns={1}
            onDragEnd={({ data, from, to }) => {
                reorderPlaylist(playlist.Id!, data[to].Id!, to)
                refetch();
            }}
            refreshing={isPending}
            renderItem={({ item: track, getIndex, drag }) => {

                const index = getIndex();

                return (
                    <Track
                        navigation={navigation}
                        track={track}
                        tracklist={tracks!}
                        index={index}
                        queueName={playlist.Name ?? "Untitled Playlist"}
                        showArtwork
                        onLongPress={editing ? drag : undefined}
                    />
                )    
            }}
            ListFooterComponent={(
                <XStack justifyContent="flex-end">
                    <Text 
                        color={"$borderColor"} 
                        style={{ display: "block"}}
                    >
                        Total Runtime:
                    </Text>
                    <RunTimeTicks>{ playlist.RunTimeTicks }</RunTimeTicks>
                </XStack>
            )}
        />
    )
}