import { renderHook } from '@testing-library/react-native';
import { useFeatureFlag } from '../useFeatureFlag';

test('useFeatureFlag returns default value', () => {
  const { result } = renderHook(() => useFeatureFlag('flag'));
  expect(result.current).toBe(false);
});
