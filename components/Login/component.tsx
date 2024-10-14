import _ from "lodash"
import ServerAuthentication from "./helpers/server-authentication";
import ServerAddress from "./helpers/server-address";

export default function Login(): React.JSX.Element {

    let isError = true, isSuccess;

    return (
        (isError ?
            <ServerAddress />
        : 
            <ServerAuthentication />
        )
    );
}