/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  resolver: {
    assetExts: [...assetExts, 'jpg', 'jpeg', 'png', 'gif'], // ensure images are here
    // you may also adjust sourceExts if you have custom file types
  },
  transformer: {
    // usual options, if you're using SVG transformer etc.
  },
};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
