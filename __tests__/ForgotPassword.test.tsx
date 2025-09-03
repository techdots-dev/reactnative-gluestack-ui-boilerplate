// __tests__/screens/ForgotPassword.test.tsx
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import ForgotPassword from '@/app/auth/forgot-password';

// Mock the API
const mockForgotPassword = jest.fn();
jest.mock('@/src/api/auth', () => ({
  useAuthApi: () => ({
    forgotPassword: mockForgotPassword,
  }),
}));

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Mock router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

// Mock components with testIDs
jest.mock('@/src/components/AuthLayout', () => {
  const { View } = require('react-native');
  return {
    AuthLayout: ({ children }: any) => <View>{children}</View>,
  };
});

jest.mock('@/src/components/Input', () => {
  const { TextInput } = require('react-native');
  return {
    Input: ({ onChangeText, value, placeholder }: any) => (
      <TextInput
        testID="email-input"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    ),
  };
});

jest.mock('@/src/components/Button', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return {
    Button: ({ title, onPress }: any) => (
      <TouchableOpacity testID="reset-button" onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    ),
  };
});

describe('ForgotPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls forgotPassword with entered email when reset button is pressed', async () => {
    mockForgotPassword.mockResolvedValue({ 
      data: { message: 'Password reset email sent!' } 
    });

    render(<ForgotPassword />);

    // User enters email
    fireEvent.changeText(screen.getByTestId('email-input'), 'test@example.com');
    
    // User presses reset button
    fireEvent.press(screen.getByTestId('reset-button'));

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('converts email to lowercase before calling API', async () => {
    mockForgotPassword.mockResolvedValue({});

    render(<ForgotPassword />);

    fireEvent.changeText(screen.getByTestId('email-input'), 'TEST@Example.COM');
    fireEvent.press(screen.getByTestId('reset-button'));

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('shows alert with success message from API response', async () => {
    const alertMock = require('react-native/Libraries/Alert/Alert').alert;
    const successMessage = 'Check your email for reset instructions';
    
    mockForgotPassword.mockResolvedValue({ 
      data: { message: successMessage } 
    });

    render(<ForgotPassword />);

    fireEvent.changeText(screen.getByTestId('email-input'), 'test@example.com');
    fireEvent.press(screen.getByTestId('reset-button'));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(successMessage);
    });
  });

  it('shows alert with message from root response', async () => {
    const alertMock = require('react-native/Libraries/Alert/Alert').alert;
    const successMessage = 'Reset link sent successfully';
    
    mockForgotPassword.mockResolvedValue({ 
      message: successMessage 
    });

    render(<ForgotPassword />);

    fireEvent.changeText(screen.getByTestId('email-input'), 'test@example.com');
    fireEvent.press(screen.getByTestId('reset-button'));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(successMessage);
    });
  });

  it('handles API errors without showing alert', async () => {
    const alertMock = require('react-native/Libraries/Alert/Alert').alert;
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    mockForgotPassword.mockRejectedValue(new Error('Network error'));

    render(<ForgotPassword />);

    fireEvent.changeText(screen.getByTestId('email-input'), 'test@example.com');
    fireEvent.press(screen.getByTestId('reset-button'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Network error');
      expect(alertMock).not.toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it('calls API with empty string when no email is entered', async () => {
    mockForgotPassword.mockResolvedValue({});

    render(<ForgotPassword />);

    // Don't enter any email, just press the button
    fireEvent.press(screen.getByTestId('reset-button'));

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith('');
    });
  });
});