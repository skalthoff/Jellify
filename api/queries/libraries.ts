import { QueryKeys } from "../../enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchMusicLibraries, fetchPlaylistLibrary, fetchUserViews } from "./functions/libraries";

/**
 * @deprecated use {@link useUserViews} instead as that will respect user permissions
 * @returns 
 */
export const useMusicLibraries = () => useQuery({
    queryKey: [QueryKeys.Libraries],
    queryFn: () => fetchMusicLibraries()
});

/**
 * @deprecated use {@link useUserViews} instead as that will respect user permissions
 * @returns 
 */
export const usePlaylistLibrary = () => useQuery({
    queryKey: [QueryKeys.Playlist],
    queryFn: () => fetchPlaylistLibrary()
});

/**
 * 
 * @returns 
 */
export const useUserViews = () => useQuery({
    queryKey: [QueryKeys.UserViews],
    queryFn: () => fetchUserViews()
});