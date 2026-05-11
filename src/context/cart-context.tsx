"use client";

import { Product } from "@/types/product";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedFinish: string;
  selectedUnits: number;
  unitPrice: number;
};

type AddToCartPayload = {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedFinish: string;
  selectedUnits: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (payload: AddToCartPayload) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "fast-prints-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      return JSON.parse(raw) as CartItem[];
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = ({
    product,
    quantity,
    selectedSize,
    selectedFinish,
    selectedUnits,
  }: AddToCartPayload) => {
    const unitPrice = product.basePrice * (selectedUnits / product.options.quantities[0]);

    setCartItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        product,
        quantity,
        selectedSize,
        selectedFinish,
        selectedUnits,
        unitPrice,
      },
    ]);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cartItems],
  );
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, subtotal, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
