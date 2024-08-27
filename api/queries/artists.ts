import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models/base-item-dto'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { JellyfinService } from '../jellyfinservice'
import { ArtistModel } from '../models/ArtistModel'

namespace ArtistQueries {

    export function fetchArtistById(artistJellyfinId: string) : UseQueryResult<ArtistModel> {
        return useQuery({ 
            queryKey: ['artists', artistJellyfinId], 
            queryFn: async () => {
                return JellyfinService.instance.getArtistById(artistJellyfinId);
            }
        })
    }
}
