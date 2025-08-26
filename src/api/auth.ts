import Constants from "expo-constants";
import { useLoading } from "../contexts/LoadingContext";
import { apiRequest } from "./client";

const { API_MODE } = Constants.expoConfig?.extra || {};

export const useAuthApi = () => {
  const { showLoading, hideLoading } = useLoading(); // global loading

  const handleApi = async (apiFn: () => Promise<any>) => {
    try {
      showLoading();
      const res = await apiFn();
      hideLoading();
      return res;
    } catch (err: any) {
      hideLoading();
      throw err;
    }
  };

  const login = (email: string, password: string) => handleApi(async () => {
    if (API_MODE === "mock") {
      if (email === "test@example.com" && password === "123456") {
        return { success: true, data: { token: "mock-token-123", user: {name: "Mock User", email: "test@example.com"} } };
      } else {
        return { success: false, message: "Invalid credentials (mock)" };
      }
    }

    try {
      const data = await apiRequest<any>({
        url: "/users/tokens",
        method: "POST",
        data: { auth: { email, password } },
      });
      return { success: true, data };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  });

  const signup = (name: string, email: string, password: string) =>
    handleApi(async () => {
      if (API_MODE === "mock") {
        if (name && email && password) return { success: true, data: { token: "mock-signup-token", user: {name: "Mock User", email: "test@example.com"} } };
        else return { success: false, message: "Missing required fields (mock)" };
      }
      try {
        const data = await apiRequest<any>({
          url: "/users",
          method: "POST",
          data: { user: { name, email, password } },
        });
        return { success: true, data };
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    });

  const forgotPassword = (email: string) =>
    handleApi(async () => {
      if (API_MODE === "mock") {
        if (email === "test@example.com") return { success: true, data: { message: "Password reset link sent (mock)" } };
        else return { success: false, message: "Email not found (mock)" };
      }
      try {
        const data = await apiRequest<any>({
          url: "/users/forgot-password",
          method: "POST",
          data: { email },
        });
        return { success: true, data };
      } catch (err: any) {
        return { success: false, message: err.message };
      }
    });

  return { login, signup, forgotPassword };
};
