import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '@/theme';

interface BadgeProps {
  label: string;
  tone?: 'dark' | 'light' | 'accent';
}

export function Badge({ label, tone = 'dark' }: BadgeProps) {
  return (
    <View style={[styles.base, toneStyles[tone]]}>
      <Text style={[styles.label, toneLabelStyles[tone]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: radii.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  label: {
    ...typography.labelSmall,
    textTransform: 'uppercase',
  },
});

const toneStyles = StyleSheet.create({
  dark: { backgroundColor: colors.black },
  light: { backgroundColor: colors.white },
  accent: { backgroundColor: colors.accent },
});

const toneLabelStyles = StyleSheet.create({
  dark: { color: colors.white },
  light: { color: colors.black },
  accent: { color: colors.white },
});
