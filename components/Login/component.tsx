import _, { isError } from "lodash"
import ServerAuthentication from "./helpers/server-authentication";
import ServerAddress from "./helpers/server-address";
import { useServerUrl } from "../../api/queries/keychain";

export default function Login(): React.JSX.Element {

    let { isError } = useServerUrl;

    return (
        (isError ?
            <ServerAddress />
        : 
            <ServerAuthentication />
        )
    );
}