// AsyncStorage mock
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Expo Router mock
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// Reanimated mock
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

// Minimal Gluestack UI mock
jest.mock('@gluestack-ui/themed', () => ({
  __esModule: true,
  Input: (props) => <input {...props} />,      // can be <View> or <TextInput> if you prefer
  InputField: (props) => <div {...props} />,
  Button: (props) => <button {...props}>{props.children}</button>,
  ButtonText: (props) => <span {...props}>{props.children}</span>,
}));
