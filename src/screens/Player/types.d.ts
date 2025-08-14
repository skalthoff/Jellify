import { RootStackParamList } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'

type PlayerParamList = RootStackParamList & {
	Player: undefined
	Queue: undefined

	MultipleArtists: {
		artists: BaseItemDto[]
	}
}

export type MultipleArtistsProps = NativeStackScreenProps<PlayerParamList, 'MultipleArtists'>
