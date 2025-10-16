const React = require('react');
const { View, Text, TextInput, TouchableOpacity } = require('react-native');

module.exports = {
  Button: ({ children, ...props }) => React.createElement(TouchableOpacity, props, children),
  ButtonText: ({ children, ...props }) => React.createElement(Text, props, children),
  Input: ({ children, ...props }) => React.createElement(View, props, children),
  InputField: (props) => React.createElement(TextInput, props),
  SafeAreaView: ({ children, ...props }) => React.createElement(View, props, children),
};
