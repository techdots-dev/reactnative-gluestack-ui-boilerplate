import { View, Text } from "react-native";
import { useEffect } from "react";
import { login } from "@/src/api/auth";

export default function Home() {
    const email = "test@example.com";
    const password = "123456";

    useEffect(() => {
        const handleLogin = async () => {
            try {
              const res = await login(email, password);
              console.log(`Logged in as!: `, res);
            } catch (err: any) {
              console.log(err.message);
            }
        };
    handleLogin()
    
    }, [])

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Welcome to React Native Gluestack-ui-Boilerplate</Text>
    </View>
  );
}
