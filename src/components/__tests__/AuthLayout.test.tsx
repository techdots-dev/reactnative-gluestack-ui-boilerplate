import React from 'react';
import { render } from '@testing-library/react-native';
import { AuthLayout } from '../AuthLayout';

test('AuthLayout renders title and children', () => {
  const { getByText } = render(
    <AuthLayout title="Test Title">
      <></>
    </AuthLayout>
  );
  expect(getByText('Test Title')).toBeTruthy();
});
