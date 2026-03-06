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
      const productId = action.payload; // get product id from action payload, જો product id એરે માં હોય તો તેની સ્ટેટ રોકી શકાય
      const index = state.items.indexOf(productId); // get index of product id in wishlist, જો product id એરે માં હોય તો તેની સ્ટેટ રોકી શકાય
      
      if (index > -1) {
        state.items.splice(index, 1); // remove product id from wishlist, જો product id એરે માં હોય તો તેની સ્ટેટ રોકી શકાય
      } else {
        state.items.push(productId); // add product id to wishlist, જો product id એરે માં હોય તો તેની સ્ટેટ રોકી શકાય
      }
      
      saveWishlistToStorage(state); // save wishlist to localStorage, જો product id એરે માં હોય તો તેની સ્ટેટ રોકી શકાય
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