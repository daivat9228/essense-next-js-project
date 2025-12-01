import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Order } from '@/types';

interface UserState {
  user: User | null;
  orders: Order[];
}

const initialState: UserState = {
  user: null,
  orders: [],
};

// Load user from localStorage
const loadUserFromStorage = (): UserState => {
  if (typeof window !== 'undefined') {
    try {
      const savedUser = localStorage.getItem('user');
      const savedOrders = localStorage.getItem('orders');
      return {
        user: savedUser ? JSON.parse(savedUser) : null,
        orders: savedOrders ? JSON.parse(savedOrders) : [],
      };
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    }
  }
  return initialState;
};

// Save user to localStorage
const saveUserToStorage = (state: UserState) => {
  if (typeof window !== 'undefined') {
    try {
      if (state.user) {
        localStorage.setItem('user', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('user');
      }
      localStorage.setItem('orders', JSON.stringify(state.orders));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: loadUserFromStorage(),
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.user = {
        id: Date.now().toString(),
        email: action.payload.email,
        name: action.payload.name,
        isAuthenticated: true,
      };
      saveUserToStorage(state);
    },
    logout: (state) => {
      state.user = null;
      saveUserToStorage(state);
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      saveUserToStorage(state);
    },
  },
});

export const { login, logout, addOrder } = userSlice.actions;
export default userSlice.reducer;