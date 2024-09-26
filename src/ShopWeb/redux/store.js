import { configureStore } from '@reduxjs/toolkit';
import sliderReducer from './sliderSlice';
import productReducer from './productSlice';
import scrollUpReducer from './scrollUpSlice';
import cartReducer from './cartSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    slider: sliderReducer,
    products: productReducer,
    scrollUp: scrollUpReducer,
    carts: cartReducer,
    users: userSlice,
  },
});

export default store;
