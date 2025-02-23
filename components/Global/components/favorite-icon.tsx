import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { getToken, Spacer, YStack } from "tamagui";
import Icon from "../helpers/icon";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../enums/query-keys";
import { fetchUserData } from "../../../api/queries/functions/favorites";

export default function FavoriteIcon({ 
    item 
} : { 
    item: BaseItemDto 
}) : React.JSX.Element {

    const { data } = useQuery({
        queryKey: [QueryKeys.UserData, item.Id!],
        queryFn: () => fetchUserData(item.Id!)
    });

    return (
        <YStack
            alignContent="center"
            justifyContent="center"
            minWidth={24}
        >
            { data && data.IsFavorite ? (
                <Icon 
                    small 
                    name="heart" 
                    color={getToken("$color.telemagenta")} 
                />
            ) : (
                <Spacer />
            )}
        </YStack>
    )
}