module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          "@components": "./src/components",
          "@services": "./src/services",
          "@redux": "./src/redux",
          "@screens": "./src/screens",
          "@navigations": "./src/navigations",
          "@constants": "./src/constants",
          "@asset": "./src/asset",
          "@utils": "./src/utils",
        },
      },
    ]
  ],
};
