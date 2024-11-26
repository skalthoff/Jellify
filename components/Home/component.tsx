import { ScrollView, YStack } from "tamagui";
import _ from "lodash";
import { H1 } from "../helpers/text";
import RecentlyPlayed from "./helpers/recently-played";
import { useApiClientContext } from "../jellyfin-api-provider";
import RecentArtists from "./helpers/recent-artists";


export default function Home(): React.JSX.Element {

    const { user } = useApiClientContext();

    return (
            <ScrollView paddingLeft={10}>
                <YStack alignContent='flex-start'>
                    <H1>{`Hi, ${user!.name}`}</H1>
                    
                    <RecentArtists />
                    <RecentlyPlayed />
                </YStack>
            </ScrollView>
    );
}