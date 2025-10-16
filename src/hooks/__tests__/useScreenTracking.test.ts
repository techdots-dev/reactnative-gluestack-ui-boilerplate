import { renderHook } from '@testing-library/react-native';
import { useScreenTracking } from '../useScreenTracking';

test('useScreenTracking captures screen', () => {
  const client = { capture: jest.fn() };
  renderHook(() => useScreenTracking(client));
  expect(client.capture).toHaveBeenCalled();
});
