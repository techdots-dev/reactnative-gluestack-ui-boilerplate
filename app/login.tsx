import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AuthLayout } from "@/src/components/AuthLayout";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { useAuthApi } from "@/src/api/auth";

export default function Login() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const router = useRouter();
  const {login} = useAuthApi()

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      console.log('Logged in as: ', res)
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <AuthLayout title="Login">
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => router.push("/forgot-password")}>
        <Text className="text-blue-600 mt-4 text-center">Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text className="text-gray-600 mt-2 text-center">
          Don’t have an account? <Text className="text-blue-500">Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
