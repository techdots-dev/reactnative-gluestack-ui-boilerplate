import React from 'react';
import { render } from '@testing-library/react-native';
import { GluestackUIProvider } from '../index';

test('GluestackUIProvider renders children', () => {
  const { toJSON } = render(
    <GluestackUIProvider>
      <></>
    </GluestackUIProvider>
  );
  expect(toJSON()).toBeTruthy();
});
