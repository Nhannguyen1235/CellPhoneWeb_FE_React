import { configureStore } from '@reduxjs/toolkit';
import sliderReducer from './sliderSlice';
import productReducer from './productSlice';
import scrollUpReducer from './scrollUpSlice';
import cartReducer, { saveCartsMiddleware } from './cartSlice';
import categoryReducer from './categorySlice';
import voucherReducer from './voucherSlice';
import userReducer from './userSlice';
export const store = configureStore({
  reducer: {
    slider: sliderReducer,
    products: productReducer,
    scrollUp: scrollUpReducer,
    cart: cartReducer,
    users: userReducer,
    category: categoryReducer,
    voucher: voucherReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartsMiddleware),
});

export default store;
