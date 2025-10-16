import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import KeyboardScrollWrapper from '../KeyboardScrollWrapper';

test('KeyboardScrollWrapper renders children', () => {
  const { getByText } = render(
    <KeyboardScrollWrapper>
      <Text>Child</Text>
    </KeyboardScrollWrapper>
  );
  expect(getByText('Child')).toBeTruthy();
});
