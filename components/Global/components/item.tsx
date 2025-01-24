import { usePlayerContext } from "../../../player/provider";
import { StackParamList } from "../../../components/types";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Separator, View, XStack } from "tamagui";
import { Text } from "../helpers/text";

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

    return (
        <View>
            <Separator />

            <XStack
                alignContent="center"
                flex={1}
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
                <Text>{ item.Name ?? ""}</Text>
            </XStack>
        </View>
    )
}