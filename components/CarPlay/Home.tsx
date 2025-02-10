import { QueryKeys } from "../../enums/query-keys";
import Client from "../../api/client";
import { fetchRecentlyPlayedArtists } from "../../api/queries/functions/recents";
import { ListTemplate } from "react-native-carplay";

const recentArtists = fetchRecentlyPlayedArtists()

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
    // onItemSelect: (item) => {

    // }
});

export default CarPlayHome;