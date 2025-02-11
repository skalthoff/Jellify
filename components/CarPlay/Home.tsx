import { QueryKeys } from "../../enums/query-keys";
import Client from "../../api/client";
import { fetchRecentlyPlayed, fetchRecentlyPlayedArtists } from "../../api/queries/functions/recents";
import { CarPlay, ListTemplate } from "react-native-carplay";
import { CarPlayRecentlyPlayed } from "./RecentlyPlayed";

const CarPlayHome : ListTemplate = new ListTemplate({
    id: 'Home',
    title: "Home",
    tabTitle: "Home",
    sections: [
        {
            header: Client.user!.name,
            items: [
                { id: QueryKeys.RecentlyPlayedArtists, text: 'Recent Artists' },
                { id: QueryKeys.RecentlyPlayed, text: 'Recently Played'},
                { id: QueryKeys.UserPlaylists, text: 'Your Playlists'}
            ]
        }
    ],
    onItemSelect: async (item) => {
        console.log(item);

        const tracks = await fetchRecentlyPlayed()

        CarPlay.pushTemplate(CarPlayRecentlyPlayed(tracks))
    }
});

export default CarPlayHome;