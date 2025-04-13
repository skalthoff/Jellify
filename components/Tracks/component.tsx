import React from "react";
import { TracksProps } from "../types";
import { QueryKeys } from "../../enums/query-keys";
import { BaseItemKind } from "@jellyfin/sdk/lib/generated-client/models";
import Library from "../Library/component";

export default function Tracks({ 
    navigation,
    route
}: TracksProps): React.JSX.Element {
    return (
        <Library
            navigation={navigation}
            route={{
                ...route,
                params: {
                    ...route.params,
                    itemType: BaseItemKind.Audio,
                    navigationParams: {
                        screen: "Details",
                        params: (item) => ({ item, isNested: false })
                    }
                }
            }}
            displayStyle={{
                numColumns: 1,
                squared: false,
                layout: 'list'
            }}
        />
    );
} 