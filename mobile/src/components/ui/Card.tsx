import type { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radii, shadows, spacing } from '@/theme';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  bordered?: boolean;
  elevated?: boolean;
}

export function Card({ children, style, bordered = true, elevated = false }: CardProps) {
  return (
    <View
      style={[
        styles.base,
        bordered && styles.bordered,
        elevated && shadows.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.border,
  },
});
