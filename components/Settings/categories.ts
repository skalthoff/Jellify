import { QueryKeys } from "../../enums/query-keys";

interface CategoryRoute {
    name: any; // ¯\_(ツ)_/¯
    iconName: string;
    params?: {
        query: QueryKeys
    };
};

const Categories : CategoryRoute[] = [
    { name: "AccountDetails", iconName: "account-key-outline" },
    { name: "ServerDetails", iconName: "server-network" },
    { name: "PlaybackDetails", iconName: "disc-player" },
    { name: "Labs", iconName: "flask-outline" },
];

export default Categories;