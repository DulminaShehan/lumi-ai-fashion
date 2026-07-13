export interface Product {
  id: string;
  name: string;
  categoryName: string;
  price: number;
  discountPrice?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}
