import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '@/theme';
import { Divider } from '@/components/ui';

interface MenuItem {
  icon: keyof typeof Feather.glyphMap;
  label: string;
}

const ACCOUNT_ITEMS: MenuItem[] = [
  { icon: 'shopping-bag', label: 'Orders' },
  { icon: 'sliders', label: 'Style Profile' },
  { icon: 'map-pin', label: 'Addresses' },
  { icon: 'credit-card', label: 'Payment Methods' },
];

const SUPPORT_ITEMS: MenuItem[] = [
  { icon: 'settings', label: 'Settings' },
  { icon: 'help-circle', label: 'Help & Support' },
  { icon: 'log-out', label: 'Log Out' },
];

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.header}>Profile</Text>

        <View style={styles.identity}>
          <View style={styles.avatar}>
            <Feather name="user" size={28} color={colors.white} />
          </View>
          <View>
            <Text style={styles.name}>Guest User</Text>
            <Text style={styles.email}>Sign in to sync your style profile</Text>
          </View>
        </View>

        <MenuSection title="Account" items={ACCOUNT_ITEMS} />
        <MenuSection title="Preferences" items={SUPPORT_ITEMS} />
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuSection({ title, items }: { title: string; items: MenuItem[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{title}</Text>
      <View style={styles.menuCard}>
        {items.map((item, index) => (
          <View key={item.label}>
            <Pressable style={styles.menuRow}>
              <Feather name={item.icon} size={18} color={colors.textPrimary} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={18} color={colors.gray300} />
            </Pressable>
            {index < items.length - 1 && <Divider style={styles.menuDivider} />}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.massive,
  },
  header: {
    ...typography.h1,
    color: colors.textPrimary,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xxxl,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radii.full,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  email: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  menuCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  menuLabel: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  menuDivider: {
    marginLeft: spacing.lg + 18 + spacing.md,
  },
});
