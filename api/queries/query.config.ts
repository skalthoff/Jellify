import { ImageFormat } from "@jellyfin/sdk/lib/generated-client/models";

export const queryConfig = {
    limits: {
        recents: 50
    },
    images: {
        fillWidth: 480,
        fillHeight: 480,
        format: ImageFormat.Jpg
    }
}