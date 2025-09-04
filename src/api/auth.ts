import Constants from "expo-constants";
import { useLoading } from "../contexts/LoadingContext";
import { apiRequest } from "./client";
import { useMutation } from "@tanstack/react-query";

const { API_MODE } = Constants.expoConfig?.extra || {};

export const useAuthApi = () => {
  const { showLoading, hideLoading } = useLoading();

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      if (API_MODE === "mock") {
        if (email === "test@example.com" && password === "123456") {
          return {
            success: true,
            data: {
              token: "mock-token-123",
              user: { name: "Mock User", email: "test@example.com" },
            },
          };
        }
        return { success: false, message: "Invalid credentials (mock)" };
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
    },
    onMutate: showLoading,
    onSettled: hideLoading,
  });

  const signupMutation = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      if (API_MODE === "mock") {
        if (name && email && password)
          return {
            success: true,
            data: {
              token: "mock-signup-token",
              user: { name: "Mock User", email: "test@example.com" },
            },
          };
        return { success: false, message: "Missing required fields (mock)" };
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
    },
    onMutate: showLoading,
    onSettled: hideLoading,
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      if (API_MODE === "mock") {
        if (email === "test@example.com")
          return {
            success: true,
            data: { message: "Password reset link sent (mock)" },
          };
        return { success: false, message: "Email not found (mock)" };
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
    },
    onMutate: showLoading,
    onSettled: hideLoading,
  });

  return {
    login: (email: string, password: string) =>
      loginMutation.mutateAsync({ email, password }),
    signup: (name: string, email: string, password: string) =>
      signupMutation.mutateAsync({ name, email, password }),
    forgotPassword: (email: string) =>
      forgotPasswordMutation.mutateAsync({ email }),
    loginStatus: loginMutation,
    signupStatus: signupMutation,
    forgotPasswordStatus: forgotPasswordMutation,
  };
};
