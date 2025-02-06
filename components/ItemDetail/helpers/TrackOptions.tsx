import { usePlayerContext } from "../../../player/provider";
import { useItem } from "../../../api/queries/item";
import { StackParamList } from "../../../components/types";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Spacer, Spinner, XStack, YGroup, YStack } from "tamagui";
import { QueuingType } from "../../../enums/queuing-type";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import IconButton from "../../../components/Global/helpers/icon-button";
import { Text } from "../../../components/Global/helpers/text";
import { useUserPlaylists } from "../../../api/queries/playlist";

interface TrackOptionsProps {
    item: BaseItemDto;
    navigation: NativeStackNavigationProp<StackParamList>;
    
    /**
     * Whether this is nested in the player modal
     */
    isNested: boolean | undefined;
}

export default function TrackOptions({ 
    item, 
    navigation,
    isNested
} : TrackOptionsProps) : React.JSX.Element {

    const { data: album, isSuccess: albumFetchSuccess } = useItem(item.AlbumId ?? "");

    const { data: playlists, isPending : playlistsFetchPending, isSuccess: playlistsFetchSuccess } = useUserPlaylists();

    const { useAddToQueue } = usePlayerContext();

    const { width } = useSafeAreaFrame();
    
    return (
        <YStack width={width}>

            <XStack justifyContent="space-evenly">
                { albumFetchSuccess ? (
                    <IconButton 
                        name="music-box"
                        title="Go to Album"
                        onPress={() => {
                            
                            if (isNested)
                                navigation.getParent()!.goBack();
                            
                            navigation.goBack();
                            navigation.push("Album", {
                                album
                            });
                        }}
                        size={width / 5}
                    />
                ) : (
                    <Spacer />
                )}

                <IconButton
                    circular
                    name="table-column-plus-before" 
                    title="Play Next"
                    onPress={() => {
                        useAddToQueue.mutate({
                            track: item,
                            queuingType: QueuingType.PlayingNext
                        })
                    }}
                    size={width / 5}
                />

                <IconButton
                    circular
                    name="table-column-plus-after" 
                    title="Queue"
                    onPress={() => {
                        useAddToQueue.mutate({
                            track: item
                        })
                    }}
                    size={width / 5}
                />
            </XStack>

            { playlistsFetchPending && (
                <Spinner />
            )}
            <Text bold>Add to Playlist</Text>

            <YGroup>
                { playlists?.map}
            </YGroup>
        </YStack>
    )
}