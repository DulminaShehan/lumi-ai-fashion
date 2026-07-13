import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radii, spacing, typography } from '@/theme';
import { ProductCard, ScreenHeader, SectionHeader } from '@/components/ui';
import { getBestSellers, getFeaturedProducts, getNewArrivals } from '@/data/mockProducts';
import { useWishlist } from '@/store/WishlistContext';
import { TabScreenProps } from '@/navigation/types';
import { Product } from '@/types/product';

type Props = TabScreenProps<'Home'>;

const CARD_WIDTH = 180;

export function HomeScreen({ navigation }: Props) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  const openProduct = (product: Product) => {
    navigation.navigate('ProductDetails', { productId: product.id });
  };

  const renderRow = (products: Product[]) => (
    <FlatList
      data={products}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.rowContent}
      ItemSeparatorComponent={() => <View style={{ width: spacing.lg }} />}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          width={CARD_WIDTH}
          wishlisted={isWishlisted(item.id)}
          onPress={() => openProduct(item)}
          onToggleWishlist={() => toggleWishlist(item.id)}
        />
      )}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader onPressSearch={() => {}} onPressBag={() => navigation.navigate('Cart')} />

        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://picsum.photos/seed/lumi-hero/1200/1500' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroEyebrow}>The New Season Edit</Text>
            <Text style={styles.heroTitle}>Dress your{'\n'}best self</Text>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Featured" />
          {renderRow(getFeaturedProducts())}
        </View>

        <View style={styles.section}>
          <SectionHeader title="New Arrivals" />
          {renderRow(getNewArrivals())}
        </View>

        <View style={styles.section}>
          <SectionHeader title="Best Sellers" />
          {renderRow(getBestSellers())}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    overflow: 'hidden',
    height: 420,
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.xxl,
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
  rowContent: {
    paddingHorizontal: spacing.xl,
  },
});
