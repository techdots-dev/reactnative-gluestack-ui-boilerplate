import React from "react";
import { Modal, View, ActivityIndicator } from "react-native";
import { useLoading } from "../contexts/LoadingContext";

export const GlobalLoader = () => {
  const { isLoading } = useLoading();

  return (
    <Modal visible={isLoading} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
};
