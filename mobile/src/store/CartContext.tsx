import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Product } from '@/types/product';

export interface CartLine {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  subtotal: number;
  addToCart: (product: Product, size: string, color: string) => void;
  removeLine: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addToCart = (product: Product, size: string, color: string) => {
    setLines((current) => {
      const lineId = `${product.id}-${size}-${color}`;
      const existing = current.find((line) => line.id === lineId);
      if (existing) {
        return current.map((line) =>
          line.id === lineId ? { ...line, quantity: line.quantity + 1 } : line
        );
      }
      return [...current, { id: lineId, product, size, color, quantity: 1 }];
    });
  };

  const removeLine = (lineId: string) => {
    setLines((current) => current.filter((line) => line.id !== lineId));
  };

  const setQuantity = (lineId: string, quantity: number) => {
    if (quantity < 1) {
      removeLine(lineId);
      return;
    }
    setLines((current) =>
      current.map((line) => (line.id === lineId ? { ...line, quantity } : line))
    );
  };

  const subtotal = useMemo(
    () =>
      lines.reduce(
        (sum, line) => sum + (line.product.discountPrice ?? line.product.price) * line.quantity,
        0
      ),
    [lines]
  );

  const value = useMemo<CartContextValue>(
    () => ({ lines, subtotal, addToCart, removeLine, setQuantity }),
    [lines, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
