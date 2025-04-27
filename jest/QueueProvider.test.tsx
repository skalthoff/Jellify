import 'react-native'
import React from 'react'
import { it, describe } from '@jest/globals'
import { render } from '@testing-library/react-native'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QueueProvider } from '../player/queue-provider'
import { View } from 'react-native'

const queryClient = new QueryClient()

it('renders correctly', () => {
	const queueProvider = render(
		<QueryClientProvider client={queryClient}>
			<QueueProvider>
				<View />
			</QueueProvider>
		</QueryClientProvider>,
	)
})
