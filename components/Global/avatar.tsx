import { H6, Avatar as TamaguiAvatar, YStack } from "tamagui"
import { Text } from "./text"
import { useApiClientContext } from "../jellyfin-api-provider"
import { Colors } from "../../enums/colors";

const size: number = 150;

interface AvatarProps {
    circular?: boolean | undefined;
    itemId: string;
    children?: string | undefined;
    subheading?: string | null | undefined;
    onPress?: () => void | undefined;
}

export default function Avatar(props: AvatarProps): React.JSX.Element {

    const { server } = useApiClientContext();

    return (
        <YStack alignItems="center" width={size} marginHorizontal={10}>
            <TamaguiAvatar 
                circular={props.circular} 
                size={size}
                onPress={props.onPress}
                borderRadius={!!!props.circular ? 4 : 'unset'}
            >
                <TamaguiAvatar.Image src={`${server!.url}/Items/${props.itemId!}/Images/Primary`} />
                <TamaguiAvatar.Fallback backgroundColor={Colors.Secondary}/>
            </TamaguiAvatar>
            { props.children && (
                <Text>{props.children}</Text>
            )}
            { props.subheading && (
                <H6 fontWeight={900}>{ props.subheading }</H6>
            )}
        </YStack>
    )
}