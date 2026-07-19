export type UserRole = 'CUSTOMER' | 'ADMIN';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
}

export type Gender = 'MEN' | 'WOMEN' | 'UNISEX';
export type SkinTone = 'FAIR' | 'LIGHT' | 'MEDIUM' | 'OLIVE' | 'TAN' | 'DEEP';
export type BodyType = 'RECTANGLE' | 'HOURGLASS' | 'PEAR' | 'INVERTED_TRIANGLE' | 'APPLE' | 'ATHLETIC';
export type FashionStyle =
  | 'CASUAL'
  | 'FORMAL'
  | 'STREETWEAR'
  | 'MINIMALIST'
  | 'BOHEMIAN'
  | 'CLASSIC'
  | 'SPORTY'
  | 'VINTAGE';
export type Occasion = 'CASUAL' | 'WORK' | 'FORMAL' | 'PARTY' | 'WEDDING' | 'VACATION' | 'SPORT' | 'DATE_NIGHT';
export type BudgetTier = 'BUDGET' | 'MID_RANGE' | 'PREMIUM' | 'LUXURY';
export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  discountPrice: string | null;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  gender: Gender;
  categoryId: string;
  category: Category;
  suitableBodyTypes: BodyType[];
  suitableSkinTones: SkinTone[];
  styleTags: FashionStyle[];
  occasionTags: Occasion[];
  budgetTier: BudgetTier;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProductInput = {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  gender: Gender;
  categoryId: string;
  suitableBodyTypes: BodyType[];
  suitableSkinTones: SkinTone[];
  styleTags: FashionStyle[];
  occasionTags: Occasion[];
  budgetTier: BudgetTier;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
};

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  unitPrice: string;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: string;
  shippingFee: string;
  total: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddressLine: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  user: { id: string; fullName: string; email: string; phone?: string | null };
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}
