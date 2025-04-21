import { JellyfinAuthenticationProvider } from './Login/provider'
import Auto from './Auto/component'

export default function JellifyAuto(): React.JSX.Element {
	return (
		<JellyfinAuthenticationProvider>
			<Auto />
		</JellyfinAuthenticationProvider>
	)
}
