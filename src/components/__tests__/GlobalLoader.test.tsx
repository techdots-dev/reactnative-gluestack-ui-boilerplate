import React from 'react';
import { render } from '@testing-library/react-native';
import { GlobalLoader } from '../GlobalLoader';
import { LoadingProvider, useLoading } from '../../contexts/LoadingContext';

const Wrapper = () => {
  const { showLoading } = useLoading();
  React.useEffect(() => {
    showLoading();
  }, [showLoading]);
  return <GlobalLoader />;
};

test('GlobalLoader renders when loading', () => {
  const { getByTestId } = render(
    <LoadingProvider>
      <Wrapper />
    </LoadingProvider>
  );
  expect(getByTestId('global-loader')).toBeTruthy();
});
