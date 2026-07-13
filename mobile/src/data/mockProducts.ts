import { Product } from '@/types/product';

const img = (seed: string, n = 1) =>
  Array.from({ length: n }, (_, i) => `https://picsum.photos/seed/lumi-${seed}-${i}/900/1125`);

// Placeholder imagery — swap for Cloudinary URLs once the Products API is wired up.
export const mockProducts: Product[] = [
  {
    id: 'p-tailored-coat',
    name: 'Tailored Wool Coat',
    categoryName: 'Outerwear',
    price: 289,
    images: img('tailored-coat', 3),
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Camel'],
    isFeatured: true,
    isNewArrival: true,
    description:
      'A structured wool-blend coat with clean lines and a fluid drape, designed to layer effortlessly over tailoring or knitwear.',
  },
  {
    id: 'p-silk-slip-dress',
    name: 'Silk Slip Dress',
    categoryName: 'Dresses',
    price: 195,
    discountPrice: 149,
    images: img('silk-slip-dress', 3),
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ivory', 'Black'],
    isFeatured: true,
    isBestSeller: true,
    description:
      'Cut on the bias from fluid silk, this slip dress skims the body for an understated, elevated silhouette.',
  },
  {
    id: 'p-merino-knit',
    name: 'Merino Crewneck Knit',
    categoryName: 'Knitwear',
    price: 129,
    images: img('merino-knit', 2),
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ecru', 'Charcoal', 'Navy'],
    isNewArrival: true,
    description:
      'Fine-gauge merino wool knitted in a relaxed fit, finished with a ribbed crewneck and cuffs.',
  },
  {
    id: 'p-wide-leg-trouser',
    name: 'Wide-Leg Tailored Trouser',
    categoryName: 'Tailoring',
    price: 165,
    images: img('wide-leg-trouser', 2),
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Stone'],
    isBestSeller: true,
    description:
      'High-waisted trousers with a fluid wide leg and a single pleat, tailored from a heavyweight suiting fabric.',
  },
  {
    id: 'p-straight-jean',
    name: 'Straight Rigid Denim',
    categoryName: 'Denim',
    price: 110,
    images: img('straight-jean', 2),
    sizes: ['24', '25', '26', '27', '28', '29', '30'],
    colors: ['Indigo', 'Washed Black'],
    isNewArrival: true,
    description:
      'A straight-leg jean cut from rigid organic cotton denim that softens and molds to the body over time.',
  },
  {
    id: 'p-leather-loafer',
    name: 'Leather Penny Loafer',
    categoryName: 'Footwear',
    price: 245,
    images: img('leather-loafer', 2),
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: ['Black', 'Tan'],
    isBestSeller: true,
    isFeatured: true,
    description: 'Handcrafted leather loafers with a moc-stitched apron toe and a leather sole.',
  },
  {
    id: 'p-cashmere-scarf',
    name: 'Cashmere Scarf',
    categoryName: 'Accessories',
    price: 95,
    images: img('cashmere-scarf', 1),
    sizes: ['One Size'],
    colors: ['Camel', 'Grey', 'Black'],
    isNewArrival: true,
    description: 'A generously sized pure cashmere scarf, soft to the touch with a fine fringed edge.',
  },
  {
    id: 'p-tech-jacket',
    name: 'Lightweight Tech Jacket',
    categoryName: 'Activewear',
    price: 175,
    images: img('tech-jacket', 2),
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Sage'],
    isFeatured: true,
    description:
      'A water-resistant shell built for movement, with sealed seams and a packable hood.',
  },
];

export const getFeaturedProducts = () => mockProducts.filter((p) => p.isFeatured);
export const getNewArrivals = () => mockProducts.filter((p) => p.isNewArrival);
export const getBestSellers = () => mockProducts.filter((p) => p.isBestSeller);
export const getProductById = (id: string) => mockProducts.find((p) => p.id === id);
