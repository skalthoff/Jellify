import type { AvatarProps as TamaguiAvatarProps } from "tamagui";
import { Avatar as TamaguiAvatar, YStack } from "tamagui"
import { Text } from "./text"
import { Colors } from "react-native/Libraries/NewAppScreen";
import Client from "@/api/client";

interface AvatarProps extends TamaguiAvatarProps {
    itemId: string;
    subheading?: string | null | undefined;
}

export default function Avatar(props: AvatarProps): React.JSX.Element {

    return (
        <YStack alignItems="center" marginHorizontal={10}>
            <TamaguiAvatar 
                onPress={props.onPress}
                borderRadius={!!!props.circular ? 4 : 'unset'}
                {...props}
            >
                <TamaguiAvatar.Image src={`${Client.server!.url}/Items/${props.itemId!}/Images/Primary`} />
                <TamaguiAvatar.Fallback backgroundColor={Colors.Secondary}/>
            </TamaguiAvatar>
            { props.children && (
                <Text>{props.children}</Text>
            )}
            { props.subheading && (
                <Text bold>{ props.subheading }</Text>
            )}
        </YStack>
    )
}