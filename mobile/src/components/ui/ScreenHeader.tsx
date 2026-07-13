import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { IconButton } from './IconButton';

interface ScreenHeaderProps {
  title?: string;
  onPressSearch?: () => void;
  onPressBag?: () => void;
}

export function ScreenHeader({ title = 'LUMI', onPressSearch, onPressBag }: ScreenHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.side} />
      <Text style={styles.wordmark}>{title}</Text>
      <View style={[styles.side, styles.actions]}>
        {onPressSearch && <IconButton name="search" size={20} onPress={onPressSearch} />}
        {onPressBag && <IconButton name="shopping-bag" size={20} onPress={onPressBag} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  side: {
    minWidth: 40,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  wordmark: {
    ...typography.wordmark,
    color: colors.textPrimary,
  },
});
