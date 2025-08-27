// import { create } from "zustand";

// type CartItem = {
//   productId: string;
//   title: string;
//   price: number;
//   imageUrl: string;
//   quantity: number;
// };

// type State = { items: CartItem[] };
// type Actions = {
//   add: (item: CartItem) => void;
//   remove: (productId: string) => void;
//   clear: () => void;
// };

// export const useCartStore = create<State & Actions>((set) => ({
//   items: [],
//   add: (item) =>
//     set((s) => {
//       const existing = s.items.find((i) => i.productId === item.productId);
//       if (existing) {
//         return {
//           items: s.items.map((i) =>
//             i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
//           ),
//         };
//       }
//       return { items: [...s.items, item] };
//     }),
//   remove: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
//   clear: () => set({ items: [] }),
// }));





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
