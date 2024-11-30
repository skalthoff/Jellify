import { ImageFormat } from "@jellyfin/sdk/lib/generated-client/models";

export const queryConfig = {
    limits: {
        recents: 50
    },
    images: {
        width: 480,
        height: 480,
        format: ImageFormat.Jpg
    }
}