import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radii } from '@/theme';

interface IconButtonProps {
  name: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  size?: number;
  color?: string;
  variant?: 'plain' | 'filled';
  style?: ViewStyle;
}

export function IconButton({
  name,
  onPress,
  size = 20,
  color = colors.black,
  variant = 'plain',
  style,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.base,
        variant === 'filled' && styles.filled,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Feather name={name} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.full,
  },
  filled: {
    backgroundColor: colors.white,
  },
  pressed: {
    opacity: 0.6,
  },
});
