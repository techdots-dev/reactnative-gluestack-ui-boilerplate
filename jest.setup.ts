jest.mock('expo-constants', () => ({ expoConfig: { extra: { API_MODE: 'mock' } } }));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(async () => null),
  removeItem: jest.fn(),
  multiRemove: jest.fn(),
}));

jest.mock('expo-updates', () => ({
  checkForUpdateAsync: jest.fn().mockResolvedValue({ isAvailable: false }),
  fetchUpdateAsync: jest.fn(),
  reloadAsync: jest.fn(),
}));

jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: ({ children }: any) => children,
}));

jest.mock('expo-router', () => ({
  usePathname: jest.fn(() => '/'),
  Redirect: ({ children }: any) => children,
  Slot: ({ children }: any) => children,
  Stack: ({ children }: any) => children,
}));

jest.mock('expo-router/entry', () => ({}));

jest.mock('@gluestack-ui/themed');

jest.mock('@gluestack-ui/overlay', () => ({ OverlayProvider: ({ children }: any) => children }));
jest.mock('@gluestack-ui/toast', () => ({ ToastProvider: ({ children }: any) => children }));

jest.mock('posthog-react-native', () => {
  return { PostHog: function () { this.isFeatureEnabled = jest.fn(() => false); this.optIn = jest.fn(); this.optOut = jest.fn(); } };
});
