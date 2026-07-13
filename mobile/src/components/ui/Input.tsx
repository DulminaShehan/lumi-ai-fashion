import { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '@/theme';

interface InputProps extends TextInputProps {
  icon?: keyof typeof Feather.glyphMap;
}

export const Input = forwardRef<TextInput, InputProps>(({ icon, style, ...rest }, ref) => {
  return (
    <View style={styles.wrap}>
      {icon && <Feather name={icon} size={18} color={colors.textMuted} style={styles.icon} />}
      <TextInput
        ref={ref}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, icon && styles.inputWithIcon, style]}
        {...rest}
      />
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    ...typography.body,
    color: colors.textPrimary,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
});
