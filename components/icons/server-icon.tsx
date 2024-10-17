import { Colors } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ServerIcon(): React.JSX.Element {

    return (
        <Icon name="server-network" color={Colors.$iconPrimary} size={30}></Icon>
    )
}