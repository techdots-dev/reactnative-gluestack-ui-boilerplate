import React from "react";
import { Button as GSButton, ButtonText } from "@gluestack-ui/themed";

type Props = {
  title: string;
  onPress: () => void;
};

export const Button = ({ title, onPress }: Props) => {
  return (
    <GSButton
      className="w-full mt-4 rounded-xl p-3 bg-blue-600"
      onPress={onPress}
    >
      <ButtonText sx={{textAlign: 'center'}} className="text-white text-base font-semibold center">
        {title}
      </ButtonText>
    </GSButton>
  );
};
