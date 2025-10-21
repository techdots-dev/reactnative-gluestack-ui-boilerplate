import React from 'react';
import { useRouter } from 'expo-router';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VStack, Text, Pressable, Input, InputField, Button, ButtonText } from '@gluestack-ui/themed';
import { useAuthApi } from '@/src/api/auth';
import { useAuth } from '@/src/contexts/AuthContext';
import { AuthLayout } from '@/src/components/AuthLayout';

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const router = useRouter();
  const { signup } = useAuthApi();
  const { storeUser } = useAuth();

  const { control, handleSubmit } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const handleSignup = async (data: SignupForm) => {
    try {
      const res = await signup(data.name, data.email, data.password);
      if (res?.success) {
        storeUser(res?.data?.token, res?.data?.user);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <AuthLayout title="Sign Up">
      <VStack space="md" mt="$4">
        {/* Name Field */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
            <VStack space="xs">
              <Input>
                <InputField
                  placeholder="Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  testID="signupNameInput"
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

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
            <VStack space="xs">
              <Input>
                <InputField
                  placeholder="Email"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  testID="signupEmailInput"
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

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
            <VStack space="xs">
              <Input>
                <InputField
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  testID="signupPasswordInput"
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

        <Button onPress={handleSubmit(handleSignup)} testID="signupButton">
          <ButtonText>Create Account</ButtonText>
        </Button>

        <Pressable mt="$4" onPress={() => router.back()} testID="loginLink">
          <Text color="$gray600" textAlign="center">
            Already have an account?{' '}
            <Text color="$blue600" fontWeight="$semibold">
              Login
            </Text>
          </Text>
        </Pressable>
      </VStack>
    </AuthLayout>
  );
}
