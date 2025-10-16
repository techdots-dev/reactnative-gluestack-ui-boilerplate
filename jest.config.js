module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@gluestack-ui|@react-native-async-storage|@react-native|react-native|expo-router|expo(?:-.*)?|@expo/.*|@react-native-community/.*)'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
};
