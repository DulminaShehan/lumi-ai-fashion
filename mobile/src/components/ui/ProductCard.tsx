import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, typography } from '@/theme';
import { Product } from '@/types/product';
import { Badge } from './Badge';

interface ProductCardProps {
  product: Product;
  width?: number;
  wishlisted?: boolean;
  onPress?: () => void;
  onToggleWishlist?: () => void;
}

export function ProductCard({
  product,
  width = 200,
  wishlisted = false,
  onPress,
  onToggleWishlist,
}: ProductCardProps) {
  const hasDiscount = product.discountPrice != null;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ width }, pressed && styles.pressed]}
    >
      <View style={[styles.imageWrap, { width, height: width * 1.25 }]}>
        <Image source={{ uri: product.images[0] }} style={styles.image} resizeMode="cover" />

        <View style={styles.badgeRow}>
          {product.isNewArrival && <Badge label="New" />}
        </View>

        <Pressable
          onPress={onToggleWishlist}
          hitSlop={10}
          style={styles.wishlistButton}
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={16}
            color={colors.black}
          />
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text style={styles.category} numberOfLines={1}>
          {product.categoryName}
        </Text>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={[styles.price, hasDiscount && styles.priceStrike]}>
            ${product.price.toFixed(0)}
          </Text>
          {hasDiscount && (
            <Text style={styles.discountPrice}>${product.discountPrice!.toFixed(0)}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.9,
  },
  imageWrap: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
  },
  wishlistButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: radii.full,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginTop: spacing.sm,
    gap: 2,
  },
  category: {
    ...typography.labelSmall,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 2,
  },
  price: {
    ...typography.price,
    color: colors.textPrimary,
  },
  priceStrike: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    fontFamily: typography.priceSmall.fontFamily,
    fontSize: typography.priceSmall.fontSize,
  },
  discountPrice: {
    ...typography.price,
    color: colors.accent,
  },
});
