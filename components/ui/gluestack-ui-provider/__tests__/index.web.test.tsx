/** @jest-environment jsdom */
import React from 'react';
import { render } from '@testing-library/react-native';
import { GluestackUIProvider } from '../index.web';

test('web GluestackUIProvider renders', () => {
  const { toJSON } = render(
    <GluestackUIProvider>
      <></>
    </GluestackUIProvider>
  );
  expect(toJSON()).toBeTruthy();
});
