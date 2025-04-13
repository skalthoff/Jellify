import React from "react";
import { AlbumsProps } from "../types";
import { BaseItemKind } from "@jellyfin/sdk/lib/generated-client/models";
import Library from "../Library/component";

export default function Albums({ 
    navigation,
    route
}: AlbumsProps): React.JSX.Element {
    return (
        <Library
            navigation={navigation}
            route={{
                ...route,
                params: {
                    ...route.params,
                    itemType: BaseItemKind.MusicAlbum,
                    navigationParams: {
                        screen: "Album",
                        params: (item) => ({ album: item })
                    }
                }
            }}
            displayStyle={{
                numColumns: 3,
                squared: true,
                layout: 'grid'
            }}
        />
    );
}