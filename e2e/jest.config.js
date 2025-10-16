module.exports = {
  preset: 'detox',
  testTimeout: 120000,
  setupFilesAfterEnv: ['detox/runners/jest/adapter'],
};
