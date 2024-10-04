import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface CartStore {
  items: Product[];
  totalPrice: number;
  addItem: (data: Product) => void;
  removeItem: (id: any) => void;
  removeAll: () => void;
  increaseQuantity: (id: any) => void;
  decreaseQuantity: (id: any) => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
  items: [],
  totalPrice: 0,
  addItem: (data: Product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === data.id);
    
    if (existingItem) {
      return toast('Produit déjà dans le panier.');
    }

    set({ items: [...get().items, { ...data, quantity: 1 }], totalPrice: get().totalPrice + data.price });
    toast.success('Article ajouter dans le panier.');
  },
  removeItem: (id: any) => {
    const removedItem = get().items.find((item) => item.id === id);
    set({ items: [...get().items.filter((item) => item.id !== id)], totalPrice: get().totalPrice - (removedItem?.price || 0) });
    toast.success('Article retirer du panier.');
  },
  removeAll: () => set({ items: [] }),
  increaseQuantity: (id: any) => {
    set((state) => ({ 
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      ),
      totalPrice: state.totalPrice + (state.items.find((item) => item.id === id)?.price || 0),
    }));
    toast.success('Quantité augmentée.');
  },
  decreaseQuantity: (id: any) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 0) }
          : item
      ).filter((item) => item.quantity > 0),
      totalPrice: state.totalPrice - (state.items.find((item) => item.id === id)?.price || 0),
    }));
    toast.success('Quantité diminuée.');
  },
}), {
  name: 'cart-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useCart;


// import { create } from 'zustand';
// import { toast } from 'react-hot-toast';
// import { persist, createJSONStorage } from "zustand/middleware"; 

// import { Product } from '@/types';
// import { AlertTriangle } from 'lucide-react';

// interface CartStore {
//   items: Product[];
//   addItem: (data: Product) => void;
//   removeItem: (id: string) => void;
//   removeAll: () => void;
//   increaseQuantity: (id: string) => void;
//   decreaseQuantity: (id: string) => void;
// }

// const useCart = create(
//   persist<CartStore>((set, get) => ({
//   items: [],
//   addItem: (data: Product) => {
//     const currentItems = get().items;
//     const existingItem = currentItems.find((item) => item.id === data.id);
    
//     if (existingItem) {
//       return toast('Item already in cart.');
//     }

//     set({ items: [...get().items, { ...data, quantity: 1 }] });
//     toast.success('Item added to cart.');
//   },
//   removeItem: (id: string) => {
//     set({ items: [...get().items.filter((item) => item.id !== id)] });
//     toast.success('Item removed from cart.');
//   },
//   removeAll: () => set({ items: [] }),
//   increaseQuantity: (id: string) => {
//     set((state) => ({
//       items: state.items.map((item) =>
//         item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
//       ),
//     }));
//     toast.success('Quantity increased.');
//   },
//   decreaseQuantity: (id: string) => {
//     set((state) => ({
//       items: state.items.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 0) }
//           : item
//       ).filter((item) => item.quantity > 0),
//     }));
//     toast.success('Quantity decreased.');
//   },
// }), {
//   name: 'cart-storage',
//   storage: createJSONStorage(() => localStorage)
// }));

// export default useCart;