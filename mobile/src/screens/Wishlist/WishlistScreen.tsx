import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@/theme';
import { EmptyState, ProductCard } from '@/components/ui';
import { mockProducts } from '@/data/mockProducts';
import { useWishlist } from '@/store/WishlistContext';
import { TabScreenProps } from '@/navigation/types';

type Props = TabScreenProps<'Wishlist'>;

const CARD_WIDTH = 168;

export function WishlistScreen({ navigation }: Props) {
  const { wishlistIds, isWishlisted, toggleWishlist } = useWishlist();
  const products = mockProducts.filter((product) => wishlistIds.includes(product.id));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Text style={styles.header}>Wishlist</Text>

      {products.length === 0 ? (
        <EmptyState
          icon="heart"
          title="Your wishlist is empty"
          message="Save the pieces you love and find them here anytime."
          actionLabel="Start Browsing"
          onPressAction={() => navigation.navigate('Home')}
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: spacing.lg }}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: spacing.xl }} />}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              width={CARD_WIDTH}
              wishlisted={isWishlisted(item.id)}
              onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
              onToggleWishlist={() => toggleWishlist(item.id)}
            />
          )}
        />
      )}
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
  list: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
});
