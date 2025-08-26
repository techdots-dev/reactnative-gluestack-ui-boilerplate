import React, { useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AuthLayout } from "@/src/components/AuthLayout";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { useAuthApi } from "@/src/api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const {forgotPassword} = useAuthApi()

  const handleForgotPassword = async () => {
      try {
        const res = await forgotPassword(email?.toLowerCase?.());
        let message = res?.message || res?.data?.message
        if(message) {
           Alert.alert(message)
        }
      } catch (err: any) {
        console.log(err.message);
      }
    };

  return (
    <AuthLayout title="Forgot Password">
      <Input placeholder="Enter your email" value={email} type="email" onChangeText={setEmail} />
      <Button title="Reset Password" onPress={handleForgotPassword} />

      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-blue-600 mt-4 text-center">Back to Login</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
