import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AuthLayout } from "@/src/components/AuthLayout";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { useAuthApi } from "@/src/api/auth";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {signup} = useAuthApi()
  const {storeUser} = useAuth()

  const handleSignup = async () => {
    try {
      const res = await signup(name, email, password);
      if(res?.success) {
        storeUser(res?.data?.token, res?.data?.user)
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <AuthLayout title="Sign Up">
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Create Account" onPress={handleSignup} />

      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-gray-600 mt-4 text-center">
          Already have an account? <Text className="text-blue-600">Login</Text>
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
