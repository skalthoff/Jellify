import { ScrollView, YStack } from "tamagui";
import _ from "lodash";
import { Heading } from "../helpers/text";
import RecentlyPlayed from "./helpers/recently-played";


export default function Home(): React.JSX.Element {

    return (
            <ScrollView paddingLeft={10}>
                <YStack alignContent='flex-start'>
                    <Heading>Hi there</Heading>
                    
                    <RecentlyPlayed />
                </YStack>
            </ScrollView>
    );
}