import React from "react";
import { Input as GSInput, InputField } from "@gluestack-ui/themed";
import { InputModeOptions } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  type?: InputModeOptions;
};

export const Input = ({ placeholder, value, onChangeText, secureTextEntry, type }: Props) => {
  return (
    <GSInput className="w-full my-2 border border-gray-300 rounded-lg">
      <InputField
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        inputMode={type}
        className="px-3 py-2 text-base"
      />
    </GSInput>
  );
};
