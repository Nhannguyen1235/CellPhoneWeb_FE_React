import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../ultil/axiosInstance";

const BaseUrl = 'http://localhost:8080/api/v1';
// Thêm action async để lấy thông tin hình ảnh
export const fetchProductImages = createAsyncThunk(
  "cart/fetchProductImages",
  async (productId, { dispatch }) => {
    try {
      const imageNamesResponse = await axiosInstance.get(`${BaseUrl}/product/image/getAllImageProduct/${productId}`);
      const imageNames = imageNamesResponse.data.data;

      const imageUrls = await Promise.all(
        imageNames.map(async (image) => {
          const response = await axiosInstance.get(`${BaseUrl}/product/image/images/${image.imageUrl}`, {
            responseType: "blob"
          });
          return URL.createObjectURL(response.data);
        })
      );

      return { productId, imageUrls };
    } catch (error) {
      console.error("Lỗi khi tải ảnh cho sản phẩm:", productId, error);
      return { productId, imageUrls: [] };
    }
  }
);

const loadCartsFromLocalStorage = () => {
  try {
    const serializedCarts = localStorage.getItem('carts');
    if (serializedCarts === null) {
      return [];
    }
    return JSON.parse(serializedCarts);
  } catch (err) {
    console.error('Error loading carts from localStorage:', err);
    return [];
  }
};

const saveCartsToLocalStorage = (carts) => {
  try {
    const serializedCarts = JSON.stringify(carts);
    localStorage.setItem('carts', serializedCarts);
  } catch (err) {
    console.error('Error saving carts to localStorage:', err);
  }
};

const saveCartsMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type.startsWith('cart/')) {
    const state = store.getState().cart;
    saveCartsToLocalStorage(state.carts);
  }
  return result;
};

const initialState = {
  carts: loadCartsFromLocalStorage(),
  checkAll: false,
  productImages: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      const product = action.payload;
      const existingProduct = state.carts.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.carts.push({ ...product, checked: true, quantity: 1 });
        // Dispatch action fetchProductImages
        action.asyncDispatch(fetchProductImages(product.id));
      }
    },
    deleteCart(state, action) {
      const productId = action.payload;
      state.carts = state.carts.filter((item) => item.id !== productId);
      // Xóa hình ảnh của sản phẩm khỏi state
      delete state.productImages[productId];
    },
    clearCart(state) {
      state.carts = state.carts.filter((item) => !item.checked);
      // Xóa hình ảnh của các sản phẩm đã bị xóa khỏi state
      state.productImages = Object.fromEntries(
        Object.entries(state.productImages).filter(([id]) => 
          state.carts.some(item => item.id === parseInt(id))
        )
      );
    },
    toggleCheckAll(state, action) {
      const isChecked = action.payload;
      state.checkAll = isChecked;
      state.carts = state.carts.map((item) => ({
        ...item,
        checked: isChecked,
      }));
    },
    toggleCheck(state, action) {
      const productId = action.payload;
      state.carts = state.carts.map((item) =>
        item.id === productId ? { ...item, checked: !item.checked } : item
      );
    },
    overwriteCarts(state, action) {
      state.carts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductImages.fulfilled, (state, action) => {
      const { productId, imageUrls } = action.payload;
      state.productImages[productId] = imageUrls;
    });
  },
});

export const {
  addCart,
  deleteCart,
  clearCart,
  toggleCheckAll,
  toggleCheck,
  overwriteCarts,
} = cartSlice.actions;
export default cartSlice.reducer;
export { saveCartsMiddleware };