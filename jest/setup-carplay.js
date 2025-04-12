jest.mock('react-native-carplay', () => {
	return {
		default: {
			checkForConnection: jest.fn(),
		},
	}
})
