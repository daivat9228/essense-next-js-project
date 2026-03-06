import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    const response = await fetch('/api/products', { signal: thunkAPI.signal });

    if (!response.ok) {
      // Throwing moves control to rejected case
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data as Product[]; // ensure TS knows the shape
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;

/*
  THEORETICAL EXPLANATION:
  આ productsSlice ફાઈલ પરફ્યુમ ડેટાને API માંથી ફેચ કરવા અને તેને ગ્લોબલ સ્ટેટમાં મેનેજ કરવાનું કામ કરે છે. 
  અહીં Redux Thunk (createAsyncThunk) નો ઉપયોગ કરીને એસીન્ક્રોનસ (asynchronous) એપીઆઈ કોલ કરવામાં આવ્યો છે, 
  જે નેટવર્ક રિક્વેસ્ટની ત્રણ મુખ્ય અવસ્થાઓ—Pending (ડેટા લોડિંગ પ્રોસેસ), Fulfilled (ડેટા સફળતાપૂર્વક મળી ગયો), 
  અને Rejected (કોઈ નેટવર્ક એરર આવી)—ને extraReducers બ્લોકમાં હેન્ડલ કરે છે. ડેટા ફેચ કરતી વખતે 'signal' 
  નો ઉપયોગ રિક્વેસ્ટ કેન્સલેશન માટે કર્યો છે જેથી મેમરી બચે. TypeScript ના 'PayloadAction<Product[]>' 
  દ્વારા આપણે એ સુનિશ્ચિત કરીએ છીએ કે API માંથી આવતો ડેટા હંમેશા નક્કી કરેલા Product એરે જેવો જ હોય. 
  આ આખું લોજિક એપના ડેટા ફ્લોને સુરક્ષિત (Type-safe) અને યુઝર એક્સપિરિયન્સને સ્મૂધ (Loading/Error handling) બનાવે છે.
*/