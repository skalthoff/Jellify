import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models/base-item-dto'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { JellyfinService } from '../services/jellyfin-service'
import { ArtistModel } from '../../models/ArtistModel'

namespace ArtistQueries {

    export function fetchArtistById(artistJellyfinId: string) : UseQueryResult<ArtistModel> {
        return useQuery({ 
            queryKey: ['artists', artistJellyfinId], 
            queryFn: ({ queryKey }) => JellyfinService.instance.getArtistById(queryKey[1])
        })
    }
}
