import React from "react";
import { Button as GSButton, ButtonText } from "@gluestack-ui/themed";

type Props = {
  title: string;
  onPress: () => void;
  testID?: string;
};

export const Button = ({ title, onPress, testID }: Props) => {
  return (
    <GSButton
      className="w-full mt-4 rounded-xl p-3 bg-blue-600"
      onPress={onPress}
      testID={testID}
    >
      <ButtonText sx={{textAlign: 'center'}} className="text-white text-base font-semibold center">
        {title}
      </ButtonText>
    </GSButton>
  );
};
