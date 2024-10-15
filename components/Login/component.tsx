import _ from "lodash"
import ServerAuthentication from "./helpers/server-authentication";
import ServerAddress from "./helpers/server-address";
import { useServerUrl } from "../../api/queries/keychain";

export default function Login(): React.JSX.Element {

    let { error, isSuccess } = useServerUrl;

    return (
        (isSuccess ?
            <ServerAuthentication />
        : 
            <ServerAddress />
        )
    );
}