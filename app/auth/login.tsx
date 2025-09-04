import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/src/components/AuthLayout";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { useAuthApi } from "@/src/api/auth";
import { useAuth } from "@/src/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const { login } = useAuthApi();
  const { storeUser } = useAuth();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test@example.com",
      password: "123456",
    },
  });

  const handleLogin = async (data: LoginForm) => {
    try {
      const res = await login(data.email.toLowerCase(), data.password);
      if (res?.success) {
        storeUser(res?.data?.token, res?.data?.user);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <AuthLayout title="Login">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
          <Input
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={error?.message}
            type="email"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
          <Input
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            errorMessage={error?.message}
          />
        )}
      />
      <Button title="Login" onPress={handleSubmit(handleLogin)} />

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
