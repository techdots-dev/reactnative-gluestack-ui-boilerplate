import { Redirect } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={isLoggedIn ? "/app" : "/auth/login"} />;
}