import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, spacing, typography } from '@/theme';
import { ScreenHeader, SectionHeader } from '@/components/ui';
import { TabScreenProps } from '@/navigation/types';

type Props = TabScreenProps<'Home'>;

export function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader onPressSearch={() => {}} onPressBag={() => navigation.navigate('Cart')} />

        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>The New Season Edit</Text>
          <Text style={styles.heroTitle}>Dress your{'\n'}best self</Text>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Featured" />
          <ProductRowPlaceholder />
        </View>

        <View style={styles.section}>
          <SectionHeader title="New Arrivals" />
          <ProductRowPlaceholder />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Best Sellers" />
          <ProductRowPlaceholder />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProductRowPlaceholder() {
  return (
    <View style={styles.placeholderRow}>
      <Text style={styles.placeholderText}>New arrivals are on their way.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.xxxl,
    borderRadius: radii.lg,
    backgroundColor: colors.black,
    padding: spacing.xxl,
    justifyContent: 'flex-end',
    height: 280,
  },
  heroEyebrow: {
    ...typography.label,
    color: colors.white,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  heroTitle: {
    ...typography.display,
    color: colors.white,
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  placeholderRow: {
    marginHorizontal: spacing.xl,
    height: 140,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
});
