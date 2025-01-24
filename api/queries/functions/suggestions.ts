import Client from "../../../api/client";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { getSuggestionsApi } from "@jellyfin/sdk/lib/utils/api";

export async function fetchSearchSuggestions() : Promise<BaseItemDto[]> {
    return new Promise((resolve, reject) => {
        getSuggestionsApi(Client.api!)
            .getSuggestions({
                userId: Client.user!.id,
                type: [
                    'MusicArtist',
                    'MusicAlbum',
                    'Audio',
                    'Playlist'
                ]
            })
            .then((response) => {
                if (response.data.Items)
                    resolve(response.data.Items)
                else
                    resolve([]);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export async function fetchSuggestedArtists() : Promise<BaseItemDto[]> {
    return new Promise((resolve, reject) => {
        getSuggestionsApi(Client.api!)
            .getSuggestions({
                userId: Client.user!.id,
                type: [
                    'MusicArtist'
                ]
            })
            .then((response) => {
                if (response.data.Items)
                    resolve(response.data.Items)
                else
                    resolve([]);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export async function fetchSuggestedAlbums() : Promise<BaseItemDto[]> {
    return new Promise((resolve, reject) => {
        getSuggestionsApi(Client.api!)
            .getSuggestions({
                userId: Client.user!.id,
                type: [
                    'MusicAlbum'
                ]
            })
            .then((response) => {
                if (response.data.Items)
                    resolve(response.data.Items)
                else
                    resolve([]);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export async function fetchSuggestedTracks() : Promise<BaseItemDto[]> {
    return new Promise((resolve, reject) => {
        getSuggestionsApi(Client.api!)
            .getSuggestions({
                userId: Client.user!.id,
                type: [
                    'Audio'
                ]
            })
            .then((response) => {
                if (response.data.Items)
                    resolve(response.data.Items)
                else
                    resolve([]);
            })
            .catch((error) => {
                reject(error);
            })
    })
}