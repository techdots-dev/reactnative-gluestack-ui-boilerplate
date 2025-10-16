import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { USER_KEY } from "@/src/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the User interface
interface User {
  name: string;
  email: string;
  // Add other user properties as needed
  avatar?: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from local storage using the helper
    const getUser = async () => {
      try {
        const user = await AsyncStorage.getItem(USER_KEY);
        if (user) {
          setCurrentUser(JSON.parse(user));
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-gray-500">Loading...</Text>
      </View>
    );
  }

  if (!currentUser) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-gray-500">No user data found</Text>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/login")}
          className="bg-blue-500 px-6 py-3 rounded-lg mt-4"
        >
          <Text className="text-white text-center font-semibold">Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Image
        source={{ 
          uri: currentUser?.avatar || "https://picsum.photos/seed/picsum/200/300" 
        }}
        className="w-24 h-24 rounded-full mb-4"
      />
      <Text className="text-lg font-bold mb-1">{currentUser.name}</Text>
      <Text className="text-gray-500 mb-4">{currentUser.email}</Text>

      <TouchableOpacity
        onPress={() => router.push("/app/settings")}
        className="bg-blue-500 px-6 py-3 rounded-lg"
        testID="settingsButton"
      >
        <Text className="text-white text-center font-semibold">Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
}