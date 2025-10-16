describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should login, navigate to settings and logout', async () => {
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('123456');
    await element(by.id('loginButton')).tap();
    await element(by.id('settingsButton')).tap();
    await element(by.id('logoutButton')).tap();
  });
});
