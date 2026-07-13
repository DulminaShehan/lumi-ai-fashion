import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, spacing, typography } from '@/theme';
import { Button, Divider, EmptyState, IconButton } from '@/components/ui';
import { CartLine, useCart } from '@/store/CartContext';
import { TabScreenProps } from '@/navigation/types';

type Props = TabScreenProps<'Cart'>;

export function CartScreen({ navigation }: Props) {
  const { lines, subtotal, removeLine, setQuantity } = useCart();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Text style={styles.header}>Shopping Bag</Text>

      {lines.length === 0 ? (
        <EmptyState
          icon="shopping-bag"
          title="Your bag is empty"
          message="Items you add to your bag will show up here."
          actionLabel="Start Browsing"
          onPressAction={() => navigation.navigate('Home')}
        />
      ) : (
        <>
          <FlatList
            data={lines}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            renderItem={({ item }) => (
              <CartRow line={item} onRemove={removeLine} onSetQuantity={setQuantity} />
            )}
          />

          <View style={styles.footer}>
            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Subtotal</Text>
              <Text style={styles.subtotalValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <Button label="Checkout" fullWidth size="lg" onPress={() => {}} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

function CartRow({
  line,
  onRemove,
  onSetQuantity,
}: {
  line: CartLine;
  onRemove: (id: string) => void;
  onSetQuantity: (id: string, quantity: number) => void;
}) {
  const price = line.product.discountPrice ?? line.product.price;

  return (
    <View style={styles.row}>
      <Image source={{ uri: line.product.images[0] }} style={styles.thumb} resizeMode="cover" />
      <View style={styles.rowInfo}>
        <View style={styles.rowTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={1}>
              {line.product.name}
            </Text>
            <Text style={styles.meta}>
              {line.color} · {line.size}
            </Text>
          </View>
          <IconButton name="x" size={16} onPress={() => onRemove(line.id)} />
        </View>

        <View style={styles.rowBottom}>
          <View style={styles.stepper}>
            <IconButton
              name="minus"
              size={14}
              onPress={() => onSetQuantity(line.id, line.quantity - 1)}
            />
            <Text style={styles.qty}>{line.quantity}</Text>
            <IconButton
              name="plus"
              size={14}
              onPress={() => onSetQuantity(line.id, line.quantity + 1)}
            />
          </View>
          <Text style={styles.price}>${(price * line.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
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
  list: {
    paddingHorizontal: spacing.xl,
  },
  divider: {
    marginVertical: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  thumb: {
    width: 88,
    height: 110,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
  },
  rowInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  meta: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.full,
    paddingHorizontal: spacing.xs,
  },
  qty: {
    ...typography.body,
    color: colors.textPrimary,
    minWidth: 24,
    textAlign: 'center',
  },
  price: {
    ...typography.price,
    color: colors.textPrimary,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    gap: spacing.lg,
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtotalLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  subtotalValue: {
    ...typography.h3,
    color: colors.textPrimary,
  },
});
