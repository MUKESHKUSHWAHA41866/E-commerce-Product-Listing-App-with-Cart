 


"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string) => void;
  clear: () => void;
  count: () => number;        // total items (sum of qty)
  subtotal: () => number;     // sum(price * qty)
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (incoming) =>
        set((state) => {
          const idx = state.items.findIndex((i) => i.productId === incoming.productId);
          if (idx !== -1) {
            const copy = [...state.items];
            copy[idx] = {
              ...copy[idx],
              quantity: copy[idx].quantity + incoming.quantity,
            };
            return { items: copy };
          }
          return { items: [...state.items, incoming] };
        }),
      remove: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    }),
    { name: "cart-store" }
  )
);
