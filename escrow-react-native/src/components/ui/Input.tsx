import React from 'react';
import { TextInput, StyleSheet, ViewStyle, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  style?: ViewStyle;
}

export function Input({ style, ...props }: InputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#000',
  },
});
