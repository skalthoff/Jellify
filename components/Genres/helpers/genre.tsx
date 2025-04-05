import React, { useMemo } from "react";
import { View } from "tamagui";
import { useGenresContext } from "../provider";
import { H4 } from "../../Global/helpers/text";
import { StackParamList } from "../../types";
import { ItemCard } from "../../Global/components/item-card";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import HorizontalCardList from "../../../components/Global/components/horizontal-list";
import { QueryKeys } from "../../../enums/query-keys";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";

interface igenre {
    name: string
}

export default function Genre({ genre, navigation }: { genre: igenre, navigation: NativeStackNavigationProp<StackParamList>}): React.JSX.Element {

    const { genres } = useGenresContext();

    return (
        <View>
            <H4 marginLeft={"$2"}>{genre.name}</H4>

                <HorizontalCardList
                    data={genres}
                    onSeeMore={() => {
                    navigation.navigate("Artists", {
                        query: QueryKeys.RecentlyPlayedArtists
                    })
                }}
                renderItem={({ item: recentArtist}) => 
                    <ItemCard 
                        item={recentArtist} 
                        caption={recentArtist.Name ?? "Unknown Artist"} 
                        onPress={() => {
                            navigation.navigate('Artist', 
                                { 
                                    artist: recentArtist, 
                                }
                            )}
                        }>
                    </ItemCard>
                }/>
        </View>
    )
}