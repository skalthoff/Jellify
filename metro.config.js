const { getDefaultConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname, {
    isCSSEnabled: true
});

config.resolver.sourceExts.push('mjs');

config.watchFolders = [
    "components",
    "api",
    "player"
]

module.exports = config;
