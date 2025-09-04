import React from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/src/components/AuthLayout";
import { Input } from "@/src/components/Input";
import { Button } from "@/src/components/Button";
import { useAuthApi } from "@/src/api/auth";

const forgotSchema = z.object({
  email: z.string().email("Invalid email"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const { forgotPassword } = useAuthApi();

  const { control, handleSubmit } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const handleForgotPassword = async (data: ForgotForm) => {
    try {
      const res = await forgotPassword(data.email.toLowerCase());
      const message = res?.message || res?.data?.message;
      if (message) {
        Alert.alert(message);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
          <Input
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            type="email"
            errorMessage={error?.message}
          />
        )}
      />
      <Button title="Reset Password" onPress={handleSubmit(handleForgotPassword)} />

      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-blue-600 mt-4 text-center">Back to Login</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
