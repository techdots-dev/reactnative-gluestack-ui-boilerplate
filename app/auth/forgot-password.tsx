import React from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  VStack,
  Text,
  Pressable,
  Input,
  InputField,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import { AuthLayout } from '@/src/components/AuthLayout';
import { useAuthApi } from '@/src/api/auth';

const forgotSchema = z.object({
  email: z.string().email('Invalid email'),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const { forgotPassword } = useAuthApi();

  const { control, handleSubmit } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  });

  const handleForgotPassword = async (data: ForgotForm) => {
    try {
      const res = await forgotPassword(data.email.toLowerCase());
      const message = res?.message || res?.data?.message;
      if (message) {
        Alert.alert('Info', message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <VStack space="md" mt="$4">

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
            <VStack space="xs">
              <Input>
                <InputField
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  testID='forgotPasswordInput'
                />
              </Input>
              {error?.message && (
                <Text color="$red600" fontSize="$sm">
                  {error.message}
                </Text>
              )}
            </VStack>
          )}
        />

        <Button onPress={handleSubmit(handleForgotPassword)}>
          <ButtonText>Reset Password</ButtonText>
        </Button>

        <Pressable mt="$4" onPress={() => router.back()}>
          <Text color="$blue600" textAlign="center" fontWeight="$semibold">
            Back to Login
          </Text>
        </Pressable>
      </VStack>
    </AuthLayout>
  );
}
