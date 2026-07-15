import type { BodyType, BudgetTier, FashionStyle, Gender, Occasion, SkinTone } from '@/types';

export const GENDER_OPTIONS: Gender[] = ['UNISEX', 'MEN', 'WOMEN'];
export const BUDGET_TIER_OPTIONS: BudgetTier[] = ['BUDGET', 'MID_RANGE', 'PREMIUM', 'LUXURY'];
export const SKIN_TONE_OPTIONS: SkinTone[] = ['FAIR', 'LIGHT', 'MEDIUM', 'OLIVE', 'TAN', 'DEEP'];
export const BODY_TYPE_OPTIONS: BodyType[] = [
  'RECTANGLE',
  'HOURGLASS',
  'PEAR',
  'INVERTED_TRIANGLE',
  'APPLE',
  'ATHLETIC',
];
export const FASHION_STYLE_OPTIONS: FashionStyle[] = [
  'CASUAL',
  'FORMAL',
  'STREETWEAR',
  'MINIMALIST',
  'BOHEMIAN',
  'CLASSIC',
  'SPORTY',
  'VINTAGE',
];
export const OCCASION_OPTIONS: Occasion[] = [
  'CASUAL',
  'WORK',
  'FORMAL',
  'PARTY',
  'WEDDING',
  'VACATION',
  'SPORT',
  'DATE_NIGHT',
];
