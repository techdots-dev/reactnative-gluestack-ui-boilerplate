import { View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Welcome to React Native Gluestack-ui-Boilerplate</Text>
    </View>
  );
}
