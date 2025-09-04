import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider, TOKEN_KEY } from "@/src/contexts/AuthContext";
import { USER_KEY } from "@/src/contexts/AuthContext";


jest.mock("@/src/api/client", () => ({
  apiRequest: jest.fn(),
}));

// Mock the LoadingContext
jest.mock("@/src/contexts/LoadingContext", () => ({
  useLoading: () => ({
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
  }),
}))

describe("Login screen (API_MODE aware)", () => {
  const mockApiRequest = require("@/src/api/client").apiRequest;
  const mockToken = "real-token-" + Math.random().toString(36).substring(2);
  const mockUser = {
    id: 1,
    name: "Test User",
    email: "testtech5005@gmail.com"
  };
  beforeEach(() => {
    jest.clearAllMocks();
    mockApiRequest.mockResolvedValue({
      token: mockToken,
      user: mockUser
    });
    jest.mock("expo-constants", () => ({
      __esModule: true,
      default: {
        expoConfig: {
          extra: {
            API_MODE: "mock", // <-- force value for tests
          },
        },
      },
    }));
  });

  it("MOCK mode: uses mock login", async () => {

    const Login = require("../app/auth/login").default;

    const { getByTestId } = render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    fireEvent.changeText(getByTestId("username-input"), "test@example.com");
    fireEvent.changeText(getByTestId("password-input"), "123456");
    fireEvent.press(getByTestId("login-button"));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        TOKEN_KEY, "mock-token-123"
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        USER_KEY,
        JSON.stringify({ name: 'Mock User', email: 'test@example.com' })
      );
    });
  });

  it("REAL mode: calls apiRequest and stores user", async () => {

    const Login = require("../app/auth/login").default;

    const { getByTestId } = render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    fireEvent.changeText(getByTestId("username-input"), "testtech5005@gmail.com");
    fireEvent.changeText(getByTestId("password-input"), "1234567");
    fireEvent.press(getByTestId("login-button"));

    await waitFor(() => {
      expect(mockApiRequest).toHaveBeenCalledWith({
        url: "/users/tokens",
        method: "POST",
        data: { 
          auth: { 
            email: "testtech5005@gmail.com", 
            password: "1234567" 
          } 
        },
      });
    });

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        TOKEN_KEY, expect.any(String)
      );
    });
  });
});
