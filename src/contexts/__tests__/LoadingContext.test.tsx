import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { LoadingProvider, useLoading } from '../LoadingContext';

test('LoadingProvider toggles loading state', () => {
  const wrapper = ({ children }: any) => <LoadingProvider>{children}</LoadingProvider>;
  const { result } = renderHook(() => useLoading(), { wrapper });
  act(() => result.current.showLoading());
  expect(result.current.isLoading).toBe(true);
  act(() => result.current.hideLoading());
  expect(result.current.isLoading).toBe(false);
});
