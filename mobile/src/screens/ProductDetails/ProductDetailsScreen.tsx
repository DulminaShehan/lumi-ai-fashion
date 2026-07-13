import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, spacing, typography } from '@/theme';
import { Button, IconButton } from '@/components/ui';
import { getProductById } from '@/data/mockProducts';
import { useWishlist } from '@/store/WishlistContext';
import { useCart } from '@/store/CartContext';
import { RootScreenProps } from '@/navigation/types';

type Props = RootScreenProps<'ProductDetails'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function ProductDetailsScreen({ route, navigation }: Props) {
  const product = getProductById(route.params.productId);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);

  if (!product) return null;

  const hasDiscount = product.discountPrice != null;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.gallery}>
          <FlatList
            data={product.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(uri) => uri}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
            )}
          />
          <SafeAreaView edges={['top']} style={styles.galleryControls}>
            <IconButton name="arrow-left" variant="filled" onPress={() => navigation.goBack()} />
            <IconButton
              name="heart"
              variant="filled"
              color={isWishlisted(product.id) ? colors.accent : colors.black}
              onPress={() => toggleWishlist(product.id)}
            />
          </SafeAreaView>
        </View>

        <View style={styles.body}>
          <Text style={styles.category}>{product.categoryName}</Text>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={[styles.price, hasDiscount && styles.priceStrike]}>
              ${product.price.toFixed(0)}
            </Text>
            {hasDiscount && (
              <Text style={styles.discountPrice}>${product.discountPrice!.toFixed(0)}</Text>
            )}
          </View>

          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.optionLabel}>Color — {selectedColor}</Text>
          <View style={styles.optionRow}>
            {product.colors.map((color) => (
              <Pressable
                key={color}
                onPress={() => setSelectedColor(color)}
                style={[styles.pill, selectedColor === color && styles.pillActive]}
              >
                <Text
                  style={[styles.pillText, selectedColor === color && styles.pillTextActive]}
                >
                  {color}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.optionLabel}>Size — {selectedSize}</Text>
          <View style={styles.optionRow}>
            {product.sizes.map((size) => (
              <Pressable
                key={size}
                onPress={() => setSelectedSize(size)}
                style={[styles.sizeBox, selectedSize === size && styles.pillActive]}
              >
                <Text
                  style={[styles.pillText, selectedSize === size && styles.pillTextActive]}
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <Button
          label="Add to Bag"
          fullWidth
          size="lg"
          onPress={() => {
            if (selectedSize && selectedColor) {
              addToCart(product, selectedSize, selectedColor);
            }
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gallery: {
    height: SCREEN_WIDTH * 1.25,
  },
  image: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  galleryControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  body: {
    padding: spacing.xl,
  },
  category: {
    ...typography.labelSmall,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  name: {
    ...typography.h1,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  price: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  priceStrike: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    ...typography.h3,
    color: colors.accent,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xl,
  },
  optionLabel: {
    ...typography.label,
    color: colors.textPrimary,
    textTransform: 'uppercase',
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sizeBox: {
    minWidth: 44,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillActive: {
    borderColor: colors.black,
    backgroundColor: colors.black,
  },
  pillText: {
    ...typography.bodySmall,
    color: colors.textPrimary,
  },
  pillTextActive: {
    color: colors.white,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
});
