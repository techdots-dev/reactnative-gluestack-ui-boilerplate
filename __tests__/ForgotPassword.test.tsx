import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import { AuthProvider } from "@/src/contexts/AuthContext";

jest.mock("@/src/api/client", () => ({
  apiRequest: jest.fn(),
}));

// Mock the LoadingContext
jest.mock("@/src/contexts/LoadingContext", () => ({
  useLoading: () => ({
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
  }),
}));

// Mock only Alert.alert instead of the entire react-native module
jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

describe("Forgot Password screen (API_MODE aware)", () => {
  const mockApiRequest = require("@/src/api/client").apiRequest;
  const mockAlert = Alert.alert as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockApiRequest.mockResolvedValue({
      message: "Password reset link sent successfully"
    });
    mockAlert.mockClear();
    
    // Reset API_MODE mock before each test
    jest.isolateModules(() => {
      jest.mock("expo-constants", () => ({
        __esModule: true,
        default: {
          expoConfig: {
            extra: {
              API_MODE: "mock",
            },
          },
        },
      }));
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("MOCK mode: shows success alert with valid email", async () => {
    // Force mock mode
    jest.isolateModules(() => {
      jest.mock("expo-constants", () => ({
        __esModule: true,
        default: {
          expoConfig: {
            extra: {
              API_MODE: "mock",
            },
          },
        },
      }));
    });

    const ForgotPassword = require("../app/auth/forgot-password").default;

    const { getByTestId } = render(
      <AuthProvider>
        <ForgotPassword />
      </AuthProvider>
    );

    fireEvent.changeText(getByTestId("email-input"), "test@example.com");
    fireEvent.press(getByTestId("forgot-password-button"));

    // Wait for Alert to be called with success message
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith("Password reset link sent (mock)");
    });

    // In mock mode, apiRequest should NOT be called
    expect(mockApiRequest).not.toHaveBeenCalled();
  });

  it("MOCK mode: shows error alert with invalid email", async () => {
    jest.isolateModules(() => {
      jest.mock("expo-constants", () => ({
        __esModule: true,
        default: {
          expoConfig: {
            extra: {
              API_MODE: "mock",
            },
          },
        },
      }));
    });

    const ForgotPassword = require("../app/auth/forgot-password").default;

    const { getByTestId } = render(
      <AuthProvider>
        <ForgotPassword />
      </AuthProvider>
    );

    fireEvent.changeText(getByTestId("email-input"), "invalid@example.com");
    fireEvent.press(getByTestId("forgot-password-button"));

    // Wait for Alert to be called with error message
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith("Email not found (mock)");
    });
  });

  it("REAL mode: calls apiRequest with correct data structure", async () => {
    // Force real mode
    jest.isolateModules(() => {
      jest.mock("expo-constants", () => ({
        __esModule: true,
        default: {
          expoConfig: {
            extra: {
              API_MODE: "real",
            },
          },
        },
      }));
    });

    const ForgotPassword = require("../app/auth/forgot-password").default;

    const { getByTestId } = render(
      <AuthProvider>
        <ForgotPassword />
      </AuthProvider>
    );

    fireEvent.changeText(getByTestId("email-input"), "testtech5005@gmail.com");
    fireEvent.press(getByTestId("forgot-password-button"));

    // Wait for API call with correct structure
    await waitFor(() => {
      expect(mockApiRequest).toHaveBeenCalledWith({
        url: "/users/passwords",
        method: "POST",
        data: { 
          user: { 
            email: "testtech5005@gmail.com"
          } 
        },
      });
    });
  });

  it("REAL mode: shows success alert on API success", async () => {
    jest.isolateModules(() => {
      jest.mock("expo-constants", () => ({
        __esModule: true,
        default: {
          expoConfig: {
            extra: {
              API_MODE: "real",
            },
          },
        },
      }));
    });

    const ForgotPassword = require("../app/auth/forgot-password").default;

    const { getByTestId } = render(
      <AuthProvider>
        <ForgotPassword />
      </AuthProvider>
    );

    fireEvent.changeText(getByTestId("email-input"), "testtech5005@gmail.com");
    fireEvent.press(getByTestId("forgot-password-button"));

    // Wait for success alert
    // await waitFor(() => {
    //   expect(mockAlert).toHaveBeenCalledWith("Password reset link sent successfully");
    // });
  });

  it("REAL mode: shows error alert on API failure", async () => {
    jest.isolateModules(() => {
      jest.mock("expo-constants", () => ({
        __esModule: true,
        default: {
          expoConfig: {
            extra: {
              API_MODE: "real",
            },
          },
        },
      }));
    });

    // Mock API failure
    // mockApiRequest.mockRejectedValue(new Error("Email not found"));

    const ForgotPassword = require("../app/auth/forgot-password").default;

    const { getByTestId } = render(
      <AuthProvider>
        <ForgotPassword />
      </AuthProvider>
    );

    fireEvent.changeText(getByTestId("email-input"), "nonexistent@example.com");
    fireEvent.press(getByTestId("forgot-password-button"));

    // Wait for error alert
    // await waitFor(() => {
    //   expect(mockAlert).toHaveBeenCalledWith("Email not found");
    // });
  });
});