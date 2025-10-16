import React from "react";
import { Input as GSInput, InputField } from "@gluestack-ui/themed";
import { InputModeOptions, Text, View } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  type?: InputModeOptions;
  errorMessage?: string;
  testID?: string;
};

export const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  type,
  onBlur,
  errorMessage,
  testID,
}: Props) => {
  const borderClass = errorMessage ? "border-red-500" : "border-gray-300";
  return (
    <View className="w-full my-2">
      <GSInput className={`w-full border rounded-lg ${borderClass}`}>
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          inputMode={type}
          className="px-3 py-2 text-base"
          onBlur={onBlur}
          testID={testID}
        />
      </GSInput>
      {errorMessage && (
        <Text className="text-red-500 text-xs mt-1">{errorMessage}</Text>
      )}
    </View>
  );
};
