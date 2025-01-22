import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { StackParamList } from "../types";
import TrackOptions from "./helpers/TrackOptions";
import { View, XStack, YStack } from "tamagui";
import BlurhashedImage from "../Global/helpers/blurhashed-image";
import { Text } from "../Global/helpers/text";
import { Colors } from "../../enums/colors";

export default function ItemDetail({ 
    item, 
    navigation 
} : { 
    item: BaseItemDto, 
    navigation: NativeStackNavigationProp<StackParamList> 
}) : React.JSX.Element {

    let options: React.JSX.Element | undefined = undefined;

    const { width } = useSafeAreaFrame();

    switch (item.Type) {
        case "Audio": {
            options = TrackOptions({ item, navigation });
            break;
        }

        case "MusicAlbum" : {

            break;
        }

        case "MusicArtist" : {

            break;
        }

        case "Playlist" : {

            break;
        }

        default : {
            break;
        }
    }

    return (
        <SafeAreaView edges={["top", "right", "left"]}>
            <XStack>
                <BlurhashedImage
                    item={item}
                    size={width / 3}
                />

                <YStack 
                    marginLeft={"$0.5"} 
                    justifyContent="flex-start"
                >
                    <Text bold fontSize={"$6"}>
                        { item.Name ?? "Untitled Track" }
                    </Text>

                    <Text 
                        fontSize={"$6"} 
                        color={Colors.Primary}
                        onPress={() => {
                            if (item.ArtistItems) {
                                navigation.goBack(); // Dismiss modal if exists
                                navigation.getParent()!.navigate("Artist", {
                                    artist: item.ArtistItems[0]
                                });
                            }
                        }}>
                        { item.Artists?.join(", ") ?? "Unknown Artist"}
                    </Text>
                        
                    <Text 
                        fontSize={"$6"} 
                        color={"$gray10"}
                    >
                        { item.Album ?? "" }
                    </Text>
                </YStack>

            </XStack>
            { options ?? <View /> }
        </SafeAreaView>
    )
}