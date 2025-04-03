// https://docs.swmansion.com/react-native-gesture-handler/docs/guides/testing
module.exports = {
  preset: 'react-native',
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  extensionsToTreatAsEsm: ['.ts', '.tsx']
};
