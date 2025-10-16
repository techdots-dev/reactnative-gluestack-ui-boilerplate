import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../AuthContext';

test('AuthProvider can store and logout user', async () => {
  const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
  const { result } = renderHook(() => useAuth(), { wrapper });
  await act(async () => {
    await result.current.storeUser('token', { name: 'Test' });
  });
  expect(result.current.isLoggedIn).toBe(true);
  await act(async () => {
    await result.current.logout();
  });
  expect(result.current.isLoggedIn).toBe(false);
});
