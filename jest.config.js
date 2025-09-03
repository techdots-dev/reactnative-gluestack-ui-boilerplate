module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|expo|@react-navigation|expo-router|@react-native-async-storage|react-native-reanimated)'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  