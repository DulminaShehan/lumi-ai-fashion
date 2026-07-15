import { z } from 'zod';

const genderEnum = z.enum(['MEN', 'WOMEN', 'UNISEX']);
const skinToneEnum = z.enum(['FAIR', 'LIGHT', 'MEDIUM', 'OLIVE', 'TAN', 'DEEP']);
const bodyTypeEnum = z.enum(['RECTANGLE', 'HOURGLASS', 'PEAR', 'INVERTED_TRIANGLE', 'APPLE', 'ATHLETIC']);
const fashionStyleEnum = z.enum([
  'CASUAL',
  'FORMAL',
  'STREETWEAR',
  'MINIMALIST',
  'BOHEMIAN',
  'CLASSIC',
  'SPORTY',
  'VINTAGE',
]);
const occasionEnum = z.enum(['CASUAL', 'WORK', 'FORMAL', 'PARTY', 'WEDDING', 'VACATION', 'SPORT', 'DATE_NIGHT']);
const budgetTierEnum = z.enum(['BUDGET', 'MID_RANGE', 'PREMIUM', 'LUXURY']);

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().positive(),
  discountPrice: z.coerce.number().positive().optional(),
  images: z.array(z.string().url()).min(1),
  sizes: z.array(z.string()).min(1),
  colors: z.array(z.string()).min(1),
  stock: z.coerce.number().int().min(0).default(0),
  gender: genderEnum.default('UNISEX'),
  categoryId: z.string().min(1),
  suitableBodyTypes: z.array(bodyTypeEnum).default([]),
  suitableSkinTones: z.array(skinToneEnum).default([]),
  styleTags: z.array(fashionStyleEnum).default([]),
  occasionTags: z.array(occasionEnum).default([]),
  budgetTier: budgetTierEnum,
  isFeatured: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
});

export const updateProductSchema = createProductSchema.partial();

export const listProductsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  categoryId: z.string().optional(),
  search: z.string().optional(),
  isFeatured: z.coerce.boolean().optional(),
  isNewArrival: z.coerce.boolean().optional(),
  isBestSeller: z.coerce.boolean().optional(),
});
