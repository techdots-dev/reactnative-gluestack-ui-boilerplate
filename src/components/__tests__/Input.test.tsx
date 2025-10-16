import React from 'react';
import { render } from '@testing-library/react-native';
import { Input } from '../Input';

test('Input renders with placeholder', () => {
  const { getByPlaceholderText } = render(
    <Input placeholder="Email" value="" onChangeText={() => {}} />
  );
  expect(getByPlaceholderText('Email')).toBeTruthy();
});
