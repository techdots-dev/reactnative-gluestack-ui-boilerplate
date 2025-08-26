import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Alert } from "react-native";
import Constants from "expo-constants";
import { useAuth } from "@/src/contexts/AuthContext";
import { getSessionReplayPreference } from "@/src/hooks/provider/posthog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from 'expo-updates';

export default function SettingsScreen() {
  const {logout} = useAuth()
  const [isSessionReplay, setIsSessionReplay] = useState(false)
  const apiMode = Constants.expoConfig?.extra?.API_MODE || "mock";

  useEffect(() => {
    const getSessionReplay = async () => {
      const enableSessionReplay = await getSessionReplayPreference();
      setIsSessionReplay(enableSessionReplay)
    }

    getSessionReplay()
  }, [])

  const onToggleSessionReplay = () => {
    Alert.alert(
      'Restart Required',
      'The app needs to restart to apply these changes.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Restart Now', onPress: async () => {
          await AsyncStorage.setItem('sessionReplayEnabled', (!isSessionReplay)?.toString())
          await Updates.reloadAsync();
        }},
      ],
      {cancelable: false},
    );
  }

  return (
    <View className="flex-1 bg-white p-4">

      {/* Session Replay */}
      <View className="flex-row justify-between items-center my-3">
        <Text className="text-md">Session Replay</Text>
        <Switch value={isSessionReplay} onValueChange={onToggleSessionReplay} />
      </View>

      {/* API Mode */}
      <View className="flex-row justify-between items-center my-3">
        <Text className="text-md">API Mode</Text>
        <Text className="text-md">{apiMode}</Text>
      </View>

      {/* Sign Out */}
      <TouchableOpacity
        onPress={logout}
        className="bg-red-500 px-6 py-3 rounded-lg mt-6"
      >
        <Text className="text-white text-center font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
