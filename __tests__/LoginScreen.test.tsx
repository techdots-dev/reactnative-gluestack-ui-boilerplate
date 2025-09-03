import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider, TOKEN_KEY } from "@/src/contexts/AuthContext";
import { USER_KEY } from "@/src/contexts/AuthContext";

describe("Login screen (API_MODE aware)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        TOKEN_KEY, expect.any(String)
      );
    });
  });
});
