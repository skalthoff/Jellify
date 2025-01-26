import type { AvatarProps as TamaguiAvatarProps } from "tamagui";
import { Avatar as TamaguiAvatar, YStack } from "tamagui"
import { Text } from "./text"
import { useItemImage } from "../../../api/queries/image";
import { BaseItemDto, ImageType } from "@jellyfin/sdk/lib/generated-client/models";

interface AvatarProps extends TamaguiAvatarProps {
    item: BaseItemDto,
    imageType?: ImageType,
    subheading?: string | null | undefined;
}

export default function Avatar({
    item,
    imageType,
    subheading,
    ...props
}: AvatarProps): React.JSX.Element {

    const { data } = useItemImage(item.Id!)

    return (
        <YStack alignItems="center" marginHorizontal={10}>
            <TamaguiAvatar 
                borderRadius={!!!props.circular ? 4 : 'unset'}
                {...props}
            >
                <TamaguiAvatar.Image src={data} />
                <TamaguiAvatar.Fallback backgroundColor="$borderColor" />
            </TamaguiAvatar>
            { props.children && (
                <Text>{props.children}</Text>
            )}
            { subheading && (
                <Text bold>{ subheading }</Text>
            )}
        </YStack>
    )
}