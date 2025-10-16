import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAnalyticsPreference, getAnalyticsPreference } from '../posthog';

test('analytics preference helpers work', async () => {
  await setAnalyticsPreference(true);
  expect(AsyncStorage.setItem).toHaveBeenCalled();
  const pref = await getAnalyticsPreference();
  expect(typeof pref).toBe('boolean');
});
