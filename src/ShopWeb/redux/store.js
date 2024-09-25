import { configureStore } from '@reduxjs/toolkit';
import sliderReducer from './sliderSlice';
import productReducer from './productSlice';
import scrollUpReducer from './scrollUpSlice';
import cartReducer from './cartSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    slider: sliderReducer,
    products: productReducer,
    scrollUp: scrollUpReducer,
    carts: cartReducer,
    category: categoryReducer
  },
});

export default store;
