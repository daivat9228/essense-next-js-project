import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window !== 'undefined') {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }
  return initialState;
};

// Save cart to localStorage
const saveCartToStorage = (state: CartState) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cart', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      const { quantity = 1, ...item } = action.payload;
      const existingItem = state.items.find(
        (cartItem) => cartItem.productId === item.productId && cartItem.size === item.size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }

      state.total = calculateTotal(state.items);
      saveCartToStorage(state);
    },
    removeItem: (state, action: PayloadAction<{ productId: string; size: number }>) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
      state.total = calculateTotal(state.items);
      saveCartToStorage(state);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; size: number; quantity: number }>) => {
      const { productId, size, quantity } = action.payload;
      const item = state.items.find(
        (cartItem) => cartItem.productId === productId && cartItem.size === size
      );

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (cartItem) => !(cartItem.productId === productId && cartItem.size === size)
          );
        } else {
          item.quantity = quantity;
        }
      }

      state.total = calculateTotal(state.items);
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveCartToStorage(state);
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;