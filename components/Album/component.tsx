import { SafeAreaView } from "react-native-safe-area-context";
import { StackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Separator, View, YStack, XStack } from "tamagui";
import { CachedImage } from "@georstat/react-native-image-cache";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { useApiClientContext } from "../jellyfin-api-provider";
import { BaseItemDto, ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { queryConfig } from "../../api/queries/query.config";
import { H4, H5, Text } from "../Global/text";
import { FlatList } from "react-native";
import { useAlbumTracks } from "../../api/queries/album";
import { usePlayerContext } from "../../player/provider";
import { mapDtoToTrack } from "../../helpers/mappings";
import RunTimeTicks from "../Global/runtimeticks";
import { Colors } from "../../enums/colors";

interface AlbumProps {
    album: BaseItemDto,
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Album(props: AlbumProps): React.JSX.Element {

    const { apiClient, sessionId } = useApiClientContext();

    const { resetQueue, addToQueue, play, nowPlaying } = usePlayerContext();

    const { data: tracks, isLoading } = useAlbumTracks(props.album.Id!, apiClient!);

    return (
        <ScrollView>
                <YStack alignItems="center">
                    <CachedImage
                        source={getImageApi(apiClient!)
                            .getItemImageUrlById(
                                props.album.Id!,
                                ImageType.Primary,
                                { ...queryConfig.images})}
                        imageStyle={{
                            position: "relative",
                            width: 300,
                            height: 300,
                            borderRadius: 2
                        }}
                    />

                    <H4>{ props.album.Name ?? "Untitled Album" }</H4>
                    <H5>{ props.album.ProductionYear?.toString() ?? "" }</H5>
                </YStack>
                <FlatList
                    data={tracks}
                    numColumns={1}
                    renderItem={({ item: track, index }) => {

                        let isPlaying = nowPlaying?.ItemId == track.Id;

                        return (
                            <View>
                                <Separator />
                                <XStack 
                                    flex={1}
                                    onPress={async (track) => {
                                        await resetQueue(false)
                                        await addToQueue(tracks!.map((track) => mapDtoToTrack(apiClient!, sessionId, track)));
                                        play(index);
                                    }}
                                    paddingVertical={"$4"}
                                    paddingHorizontal={"$1"}
                                >
                                    <XStack justifyContent="flex-end" flex={1}>
                                        <Text>{ track.IndexNumber?.toString() ?? "" }</Text>
                                    </XStack>

                                    <XStack alignContent="flex-start" flex={8}>
                                        <Text color={ isPlaying ? Colors.Primary : "unset" }>{ track.Name ?? "Untitled Track" }</Text>
                                    </XStack>

                                    <XStack alignContent="flex-end" flex={1}>
                                        <RunTimeTicks>{ track.RunTimeTicks }</RunTimeTicks>
                                    </XStack>
                                </XStack>
                            </View>
                        )

                }}/>

                <XStack alignContent="flex-end">
                    <Text style={{display: "block"}}>Total Runtime:</Text>
                    <RunTimeTicks>{ props.album.RunTimeTicks }</RunTimeTicks>
                </XStack>
            </ScrollView>
    )
}