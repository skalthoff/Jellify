import { JellyfinAuthenticationProvider } from './Login/provider'
import Auto from './Auto/component'

export default function JellifyAuto(): React.JSX.Element {
	console.debug('Launching Auto interface')

	return (
		<JellyfinAuthenticationProvider>
			<Auto />
		</JellyfinAuthenticationProvider>
	)
}
