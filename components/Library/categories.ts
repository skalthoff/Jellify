import { QueryKeys } from "../../enums/query-keys";

interface CategoryRoute {
    name: any; // ¯\_(ツ)_/¯
    params?: {
        query: QueryKeys
    };
};

const Categories : CategoryRoute[] = [
    { name: "Favorites", params: { query: QueryKeys.Favorites } },
    { name: "Artists", params: { query: QueryKeys.AllArtists } },
    { name: "Albums", params: { query: QueryKeys.AllAlbums} },
    { name: "Genres", params: { query: QueryKeys.Genres} },
    { name: "Playlists", params: { query: QueryKeys.Playlists}  },
];

export default Categories;