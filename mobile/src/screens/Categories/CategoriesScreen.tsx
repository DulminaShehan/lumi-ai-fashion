import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/theme';
import { EmptyState } from '@/components/ui';

export function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Text style={styles.header}>Categories</Text>
      <EmptyState
        icon="grid"
        title="No categories yet"
        message="Categories will appear here once the catalog is live."
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    ...typography.h1,
    color: colors.textPrimary,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
});
