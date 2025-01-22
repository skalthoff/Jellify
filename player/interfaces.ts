import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";

export interface QueueMutation { 
    track: BaseItemDto;
    index?: number | undefined;
    tracklist: BaseItemDto[];
    queueName: string;
}