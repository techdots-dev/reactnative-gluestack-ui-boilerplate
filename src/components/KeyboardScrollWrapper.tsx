import React, { ReactNode } from "react";
import { StyleSheet} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
      contentContainerStyle={[styles.container, contentContainerStyle]}
      extraScrollHeight={extraScrollHeight}
      enableOnAndroid={enableOnAndroid}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
});

export default KeyboardAwareWrapper;
