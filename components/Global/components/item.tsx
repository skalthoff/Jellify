import { usePlayerContext } from "../../../player/provider";
import { StackParamList } from "../../../components/types";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Separator, Spacer, View, XStack } from "tamagui";
import { Text } from "../helpers/text";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import BlurhashedImage from "../helpers/blurhashed-image";
import Icon from "../helpers/icon";
import { Colors } from "../../../enums/colors";

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

    return (
        <View>
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
                                queueName
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
            >
                <BlurhashedImage item={item} size={width / 9} />
                <Text>{ item.Name ?? ""}</Text>

                { item.UserData?.IsFavorite ? (
                    <Icon 
                        small
                        color={Colors.Primary}
                        name="heart"
                    />
                ) : (
                    <Spacer />
                )}
            </XStack>
        </View>
    )
}