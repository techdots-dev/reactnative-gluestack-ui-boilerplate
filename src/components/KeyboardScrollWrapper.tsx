import React, { ReactNode } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Box } from '@gluestack-ui/themed';

type Props = {
  children: ReactNode;
  contentContainerStyle?: object;
  extraScrollHeight?: number;
  enableOnAndroid?: boolean;
};

const KeyboardAwareWrapper = ({
  children,
  contentContainerStyle = {},
  extraScrollHeight = 20,
  enableOnAndroid = true,
}: Props) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={contentContainerStyle}
      extraScrollHeight={extraScrollHeight}
      enableOnAndroid={enableOnAndroid}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Box flexGrow={1} bg="$white" px="$0">
        {children}
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAwareWrapper;
