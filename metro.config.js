const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// NativeWind v4 doesn't need metro plugin, it works with Babel
module.exports = config;

