import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AuthLayout } from "@/src/components/AuthLayout";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { useAuthApi } from "@/src/api/auth";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("Testtech5005@gmail.com");
  const [password, setPassword] = useState("1234567");
  const router = useRouter();
  const {login} = useAuthApi();
  const {storeUser} = useAuth();

  const handleLogin = async () => {
    try {
      const res = await login(email?.trim()?.toLowerCase(), password);
      if (res?.success) {
        const token = res?.data?.token ?? res?.data?.jwt;
        const user = res?.data?.user ?? {
          name: "Real User",
          email: "realuser@gmail.com",
        };
        storeUser(token, user);
      } else {
        console.warn("Login failed:", res);
      }
    } catch (err: any) {
      console.error("Login error:", err?.response?.data?.message || err.message || err);
    }
    
  };

  return (
    <AuthLayout title="Login">
      <Input placeholder="Email" value={email} onChangeText={setEmail} testID="username-input"/>
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry testID="password-input" />
      <Button title="Login" onPress={handleLogin} testID="login-button" />

      <TouchableOpacity onPress={() => router.push("/auth/forgot-password")}>
        <Text className="text-blue-600 mt-4 text-center">Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/signup")}>
        <Text className="text-gray-600 mt-2 text-center">
          Don’t have an account? <Text className="text-blue-500">Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
