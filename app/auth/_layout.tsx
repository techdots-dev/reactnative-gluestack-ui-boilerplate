import { Stack } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function AuthLayout() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isLoggedIn) {
    return <Redirect href="/app" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}