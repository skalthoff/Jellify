jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

jest.mock('react-native-haptic-feedback', () => {
	return {
		default: {
			trigger: jest.fn(),
		},
	}
})
