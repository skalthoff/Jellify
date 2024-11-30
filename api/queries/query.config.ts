import { ImageFormat } from "@jellyfin/sdk/lib/generated-client/models";

export const queryConfig = {
    limits: {
        recents: 50
    },
    images: {
        album: {
            fillHeight: 300,
            fillWidth: 300,
            format: ImageFormat.Jpg
        },
        artist: {
            fillWidth: 300,
            fillHeight: 400,
            format: ImageFormat.Jpg
        }
    }
}