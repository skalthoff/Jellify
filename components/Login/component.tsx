import _, { isError } from "lodash"
import ServerAuthentication from "./helpers/server-authentication";
import ServerAddress from "./helpers/server-address";
import { useServer } from "../../api/queries/keychain";
import { View } from "react-native";

export default function Login(): React.JSX.Element {

    let { isError } = useServer;

    return (
        <View>
            { isError ? <ServerAddress /> : <ServerAuthentication /> }
        </View>
    );
}