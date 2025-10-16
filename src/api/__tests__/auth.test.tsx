import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadingProvider } from '../../contexts/LoadingContext';
import { useAuthApi } from '../auth';

test('useAuthApi exposes login function', () => {
  const wrapper = ({ children }: any) => (
    <QueryClientProvider client={new QueryClient()}>
      <LoadingProvider>{children}</LoadingProvider>
    </QueryClientProvider>
  );
  const { result } = renderHook(() => useAuthApi(), { wrapper });
  expect(typeof result.current.login).toBe('function');
});
