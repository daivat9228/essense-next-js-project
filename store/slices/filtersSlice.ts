import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '@/types';

const initialState: FilterState = {
  categories: [],
  families: [],
  concentrations: [],
  sizes: [],
  brands: [],
  priceRange: [0, 500],
  searchQuery: '',
  sortBy: 'featured',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setFamilies: (state, action: PayloadAction<string[]>) => {
      state.families = action.payload;
    },
    setConcentrations: (state, action: PayloadAction<string[]>) => {
      state.concentrations = action.payload;
    },
    setSizes: (state, action: PayloadAction<number[]>) => {
      state.sizes = action.payload;
    },
    setBrands: (state, action: PayloadAction<string[]>) => {
      state.brands = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FilterState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.categories = [];
      state.families = [];
      state.concentrations = [];
      state.sizes = [];
      state.brands = [];
      state.priceRange = [0, 500];
      state.searchQuery = '';
      state.sortBy = 'featured';
    },
  },
});

export const {
  setCategories,
  setFamilies,
  setConcentrations,
  setSizes,
  setBrands,
  setPriceRange,
  setSearchQuery,
  setSortBy,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;