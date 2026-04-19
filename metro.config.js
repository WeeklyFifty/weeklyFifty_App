// metro.config.js
// Standard Expo Metro config. Alias resolution is handled by
// babel-plugin-module-resolver (see babel.config.js) so no
// resolver.alias customisation is required here yet.

const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = config;
