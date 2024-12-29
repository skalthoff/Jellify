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
        fillHeight: 100,
        fillWidth: 100,
        format: ImageFormat.Jpg
    }
}