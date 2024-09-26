import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../ultil/axiosInstance";


const BASE_URL = "http://localhost:8080/api/v1";
// const BASE_URL = process.env.REACT_APP_API_URL;

export const getAllCategories = createAsyncThunk("category/getAll", async (thunkAPI) => {
    const url = `${BASE_URL}/admin/categories`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCategoryById = createAsyncThunk("category/getById", async(id, thunkAPI) => {
    const url = `${BASE_URL}/admin/categories/${id}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCategoriesByName = createAsyncThunk("category/getByName", async(name, thunkAPI) => {
    const url = `${BASE_URL}/admin/categories/name/${name}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk("category/createCategory", async(name, thunkAPI) => {
    try {
      const url = `${BASE_URL}/admin/categories/create`;
      const response = await axiosInstance.post(url, name);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateCategory = createAsyncThunk("category/updateCategory", async({categoryId, name}, thunkAPI) => {
    try {
        const url = `${BASE_URL}/admin/categories/update/${categoryId}`;
        console.log(name);
        console.log(categoryId);
        console.log(url);
      const response = await axiosInstance.put(url, name);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (categoryId, thunkAPI) => {
    try {
        const url = `${BASE_URL}/admin/categories/delete/${categoryId}`;
        console.log(url);
        console.log(categoryId);
        const response = await axiosInstance.delete(url);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: null,
    status: "",
    message: "",
    error: null,
  },
  reducers: {
    resetStatusAndMessage: (state) => {
      state.status = null;
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
        state.status = action.payload.status;
        // state.message = action.payload.message;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.error = action.payload;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.category = action.payload.data;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.error = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories = [...state.categories, action.payload.data];
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.data;
        state.error = action.payload;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) => category.id === action.payload.data.id ? action.payload.data : category);
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.error = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload.id
        );
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.error = action.payload;
      });
  },
});

export const { resetStatusAndMessage } = categorySlice.actions;
export default categorySlice.reducer;
