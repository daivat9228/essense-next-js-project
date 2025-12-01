import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  items: string[]; // Array of product IDs
}

const initialState: WishlistState = {
  items: [],
};

// Load wishlist from localStorage
const loadWishlistFromStorage = (): WishlistState => {
  if (typeof window !== 'undefined') {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        return JSON.parse(savedWishlist);
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    }
  }
  return initialState;
};

// Save wishlist to localStorage
const saveWishlistToStorage = (state: WishlistState) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('wishlist', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: loadWishlistFromStorage(),
  reducers: {
    toggleWishlistItem: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const index = state.items.indexOf(productId);
      
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(productId);
      }
      
      saveWishlistToStorage(state);
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(id => id !== action.payload);
      saveWishlistToStorage(state);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state);
    },
  },
});

export const { toggleWishlistItem, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;