import React from "react";
import { useRouter } from "expo-router";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/src/components/AuthLayout";
import { useAuthApi } from "@/src/api/auth";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  Input,
  InputField,
  Button,
  ButtonText,
  Text,
  Pressable,
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@gluestack-ui/themed";

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
      email: "",
      password: "",
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
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <FormControl isInvalid={!!error} mb="$4">
            <Input>
              <InputField
                placeholder="Email"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                testID="emailInput"
              />
            </Input>
            {error && (
              <FormControlError>
                <FormControlErrorText>{error.message}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <FormControl isInvalid={!!error} mb="$4">
            <Input>
              <InputField
                placeholder="Password"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry
                testID="passwordInput"
              />
            </Input>
            {error && (
              <FormControlError>
                <FormControlErrorText>{error.message}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <Button onPress={handleSubmit(handleLogin)} mt="$2" testID="loginButton">
        <ButtonText>Login</ButtonText>
      </Button>

      <Pressable onPress={() => router.push("/auth/forgot-password")} mt="$4">
        <Text color="$blue600" textAlign="center">
          Forgot Password?
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push("/auth/signup")} mt="$2" testID="signupLink">
        <Text color="$gray600" textAlign="center">
          Don’t have an account?{" "}
          <Text color="$blue500" fontWeight="$semibold">
            Sign Up
          </Text>
        </Text>
      </Pressable>
    </AuthLayout>
  );
}
