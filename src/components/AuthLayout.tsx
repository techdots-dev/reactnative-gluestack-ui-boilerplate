import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import KeyboardScrollWrapper from "./KeyboardScrollWrapper";

type Props = {
  title: string;
  children: ReactNode;
};

export const AuthLayout = ({ title, children }: Props) => {
  return (
    <KeyboardScrollWrapper>
      <View className="flex-1 justify-center px-6 bg-white">
        <Text className="text-2xl font-bold text-center mb-6">{title}</Text>
        {children}
      </View>
    </KeyboardScrollWrapper>
  );
};
