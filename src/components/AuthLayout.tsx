import React, { ReactNode } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Box, Text } from '@gluestack-ui/themed';

type Props = {
  title: string;
  children: ReactNode;
};

export const AuthLayout = ({ title, children }: Props) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={20}
      showsVerticalScrollIndicator={false}
    >
      <Box testID="auth-layout" flex={1} justifyContent="center" px="$6" bg="$white">
        <Text
          fontSize="$2xl"
          fontWeight="$bold"
          textAlign="center"
          mb="$6"
        >
          {title}
        </Text>
        {children}
      </Box>
    </KeyboardAwareScrollView>
  );
};
