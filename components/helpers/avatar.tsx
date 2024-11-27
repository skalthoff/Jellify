import { Avatar as TamaguiAvatar, View } from "tamagui"
import { Label, Text } from "./text"
import { useApiClientContext } from "../jellyfin-api-provider"
import { Colors } from "../../enums/colors";

interface AvatarProps {
    circular?: boolean | undefined;
    itemId: string;
    children?: string | undefined;
}

export default function Avatar(props: AvatarProps): React.JSX.Element {

    const { server } = useApiClientContext();

    return (
        <View>
            <TamaguiAvatar 
                circular={props.circular} 
                size="$10"
            >
                <TamaguiAvatar.Image src={`${server!.url}/Items/${props.itemId!}/Images/Primary`} />
                <TamaguiAvatar.Fallback backgroundColor={Colors.Secondary}/>
            </TamaguiAvatar>
            { props.children && (
                <Label htmlFor={""} size={"$3"}>{props.children}</Label>
            )}
        </View>
    )
}