import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import React from 'react'
import { StackParamList } from '../../types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { QueryKeys } from '../../../enums/query-keys'
import { useQuery } from '@tanstack/react-query'
import { fetchInstantMixFromItem } from '../../../api/queries/instant-mixes'
import Icon from '../helpers/icon'
import { getToken, Spacer, Spinner } from 'tamagui'

export default function InstantMixButton({
	item,
	navigation,
}: {
	item: BaseItemDto
	navigation: NativeStackNavigationProp<StackParamList>
}): React.JSX.Element {
	const { data, isFetching, refetch } = useQuery({
		queryKey: [QueryKeys.InstantMix, item.Id!],
		queryFn: () => fetchInstantMixFromItem(item),
	})

	return data ? (
		<Icon
			name='compass-outline'
			color={getToken('$color.success')}
			onPress={() =>
				navigation.navigate('InstantMix', {
					item,
					mix: data,
				})
			}
		/>
	) : (
		<Spacer />
	)
}
