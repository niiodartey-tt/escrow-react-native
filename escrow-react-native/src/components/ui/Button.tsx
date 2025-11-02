import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  style?: ViewStyle;
  disabled?: boolean;
}

export function Button({ children, onPress, variant = 'default', style, disabled }: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        styles.text,
        variant === 'outline' && styles.outlineText,
        variant === 'ghost' && styles.ghostText
      ]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#043b69',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#043b69',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineText: {
    color: '#043b69',
  },
  ghostText: {
    color: '#043b69',
  },
});
