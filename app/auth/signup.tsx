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

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const router = useRouter();
  const { signup } = useAuthApi();
  const { storeUser } = useAuth();

  const { control, handleSubmit } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const handleSignup = async (data: SignupForm) => {
    try {
      const res = await signup(data.name, data.email, data.password);
      if (res?.success) {
        storeUser(res?.data?.token, res?.data?.user);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <AuthLayout title="Sign Up">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
          <Input
            placeholder="Name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
          <Input
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            type="email"
            errorMessage={error?.message}
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
      <Button title="Create Account" onPress={handleSubmit(handleSignup)} />

      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-gray-600 mt-4 text-center">
          Already have an account? <Text className="text-blue-600">Login</Text>
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
