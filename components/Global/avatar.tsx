import { Avatar as TamaguiAvatar, View } from "tamagui"
import { Label, Text } from "./text"
import { useApiClientContext } from "../jellyfin-api-provider"
import { Colors } from "../../enums/colors";

interface AvatarProps {
    circular?: boolean | undefined;
    itemId: string;
    children?: string | undefined;
    subheading?: string | undefined;
    onPress?: () => void | undefined;
}

export default function Avatar(props: AvatarProps): React.JSX.Element {

    const { server } = useApiClientContext();

    return (
        <View alignItems="center">
            <TamaguiAvatar 
                circular={props.circular} 
                size={100}
                onPress={props.onPress}
                borderRadius={!!!props.circular ? 2 : 'unset'}
            >
                <TamaguiAvatar.Image src={`${server!.url}/Items/${props.itemId!}/Images/Primary`} />
                <TamaguiAvatar.Fallback backgroundColor={Colors.Secondary}/>
            </TamaguiAvatar>
            { props.children && (
                <Text width={100}>{props.children}</Text>
            )}
        </View>
    )
}