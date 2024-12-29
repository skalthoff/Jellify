import { ImageFormat } from "@jellyfin/sdk/lib/generated-client/models";

export const queryConfig = {
    limits: {
        recents: 50
    },
    images: {
        fillHeight: 300,
        fillWidth: 300,
        format: ImageFormat.Jpg
    },
    logos: {
        fillHeight: 25,
        fillWidth: 100,
        format: ImageFormat.Png
    },
    miniplayerArtwork: {
        height: 100,
        width: 100,
        fillHeight: 100,
        fillWidth: 100,
        format: ImageFormat.Jpg
    },
    playerArtwork: {
        fillHeight: 500,
        fillWidth: 500,
        format: ImageFormat.Jpg
    }
}