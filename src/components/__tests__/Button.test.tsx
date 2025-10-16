import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

test('Button fires onPress', () => {
  const onPress = jest.fn();
  const { getByText } = render(<Button title="Press" onPress={onPress} />);
  fireEvent.press(getByText('Press'));
  expect(onPress).toHaveBeenCalled();
});
