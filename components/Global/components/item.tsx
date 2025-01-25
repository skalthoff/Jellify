import { usePlayerContext } from "../../../player/provider";
import { StackParamList } from "../../../components/types";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Separator, Spacer, useTheme, View, XStack, YStack } from "tamagui";
import { Text } from "../helpers/text";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import BlurhashedImage from "../helpers/blurhashed-image";
import Icon from "../helpers/icon";
import { QueuingType } from "../../../enums/queuing-type";
import { RunTimeTicks } from "../helpers/time-codes";

export default function Item({ 
    item,
    queueName,
    navigation,
} : {
    item: BaseItemDto,
    queueName: string,
    navigation: NativeStackNavigationProp<StackParamList>
}) : React.JSX.Element {

    const { usePlayNewQueue } = usePlayerContext();

    const { width } = useSafeAreaFrame();

    const theme = useTheme();

    return (
        <View flex={1}>
            <Separator />

            <XStack
                alignContent="center"
                flex={1}
                minHeight={width / 9}
                onPress={() => {
                    switch (item.Type) {
                        case ("MusicArtist") : {
                            navigation.push("Artist", {
                                artist: item
                            })
                            break;
                        }

                        case ("MusicAlbum") : {
                            navigation.push("Album", {
                                album: item
                            })
                            break;
                        }

                        case ("Audio") : {
                            usePlayNewQueue.mutate({
                                track: item,
                                tracklist: [item],
                                queueName,
                                queuingType: QueuingType.FromSelection
                            })
                            break;
                        }
                    }

                }}
                onLongPress={() => {
                    navigation.push("Details", {
                        item,
                        isNested: false
                    })
                }}
                paddingVertical={"$2"}
                marginHorizontal={"$1"}
            >
                <BlurhashedImage item={item} size={width / 9} />

                <YStack 
                    marginLeft={"$1"}
                    alignContent="center"
                    justifyContent="flex-start"
                    flex={4}
                >
                    <Text bold>{ item.Name ?? ""}</Text>
                    { (item.Type === 'Audio' || item.Type === 'MusicAlbum') && (
                        <Text>{ item.AlbumArtist ?? "Untitled Artist" }</Text>
                    )}
                </YStack>

                {/* Runtime ticks for Songs */}
                <YStack 
                    justifyContent="center" 
                    alignContent="flex-end"
                    flex={2}
                >
                    { item.Type ==='Audio' ? (
                        <RunTimeTicks>{item.RunTimeTicks}</RunTimeTicks>
                    ) : (
                        <Spacer />
                    )}
                </YStack>


                <XStack 
                    justifyContent="center"
                    alignItems="flex-end" 
                    flex={2}
                >
                    { item.UserData?.IsFavorite ? (
                        <Icon 
                            small
                            color={theme.telemagenta.val}
                            name="heart"
                        />
                    ) : (
                        <Spacer />
                    )}

                    <Icon 
                        small 
                        name="dots-vertical"
                        onPress={() => {
                            navigation.push("Details", {
                                item,
                                isNested: false
                            })
                        }} 
                    />
                </XStack>
            </XStack>
        </View>
    )
}