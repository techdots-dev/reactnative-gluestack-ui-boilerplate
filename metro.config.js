const { withNativeWind } = require("nativewind/metro");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

let config = getSentryExpoConfig(__dirname);

config = withNativeWind(config);

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...(config.resolver?.extraNodeModules || {}),
    "react-dom": require.resolve("react-native"), // stub react-dom to react-native
  },
};

module.exports = config;
