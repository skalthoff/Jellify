import React from "react";
import { ArtistsProps } from "../types";
import { QueryKeys } from "../../enums/query-keys";
import { BaseItemKind } from "@jellyfin/sdk/lib/generated-client/models";
import Library from "../Library/component";

export default function Artists({ 
    navigation,
    route
}: ArtistsProps): React.JSX.Element {
    return (
        <Library
            navigation={navigation}
            route={{
                ...route,
                params: {
                    ...route.params,
                    itemType: BaseItemKind.MusicArtist,
                    navigationParams: {
                        screen: "Artist",
                        params: (item) => ({ artist: item })
                    }
                }
            }}
            displayStyle={{
                numColumns: 3,
                squared: true,
                layout: 'grid'
            }}
        />
    )
}
