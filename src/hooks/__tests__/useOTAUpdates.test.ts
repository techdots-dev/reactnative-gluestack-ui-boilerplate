import { renderHook } from '@testing-library/react-native';
import { useOTAUpdates } from '../useOTAUpdates';

test('useOTAUpdates runs without crashing', () => {
  renderHook(() => useOTAUpdates());
});
