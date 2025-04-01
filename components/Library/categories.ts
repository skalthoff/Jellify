import { QueryKeys } from '../../enums/query-keys'

interface CategoryRoute {
	name: any // ¯\_(ツ)_/¯
	iconName: string
	params?: {
		query: QueryKeys
	}
}

const Categories : CategoryRoute[] = [
    { name: "Artists", iconName: "microphone-variant", params: { query: QueryKeys.AllArtists } },
    { name: "Albums", iconName: "music-box-multiple", params: { query: QueryKeys.AllAlbums} },
    { name: "Favorite Tracks", iconName: "music-note", params: { query: QueryKeys.FavoriteTracks } },
    { name: "Playlists", iconName: "playlist-music" },
];

export default Categories
