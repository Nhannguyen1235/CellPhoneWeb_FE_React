import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../ultil/axiosInstance";

const BASE_URL = "http://localhost:8080/api/v1";


export const getAllVouchers = createAsyncThunk("voucher/getAll", async ( thunkAPI) => {
  const url = `${BASE_URL}/admin/vouchers`;
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getVoucherById = createAsyncThunk("voucher/getById", async (voucherId, thunkAPI) => {
  const url = `${BASE_URL}/admin/vouchers/${voucherId}`;
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createVoucher = createAsyncThunk("voucher/create", async (voucherDTO, thunkAPI) => {
  const url = `${BASE_URL}/admin/vouchers/create`;
  try {
    const response = await axiosInstance.post(url, voucherDTO);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateVoucher = createAsyncThunk("voucher/update", async ({ voucherId, voucherDTO }, thunkAPI) => {
  const url = `${BASE_URL}/admin/vouchers/update/${voucherId}`;
  try {
    const response = await axiosInstance.put(url, voucherDTO);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteVoucher = createAsyncThunk("voucher/delete", async (voucherId, thunkAPI) => {
  const url = `${BASE_URL}/admin/vouchers/delete/${voucherId}`;
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getVoucherByCode = createAsyncThunk("voucher/getByCode", async (code, thunkAPI) => {
    const url = `${BASE_URL}/admin/vouchers/code/${code}`;
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });

const voucherSlice = createSlice({
  name: "voucher",
  initialState: {
    vouchers: null,
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
    resetVoucher: (state) => {
      state.vouchers = [];
      state.status = '';
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all vouchers
      .addCase(getAllVouchers.fulfilled, (state, action) => {
        state.vouchers = action.payload.data;
        state.status = action.payload.status;
        // state.message = action.payload.message;
      })
      .addCase(getAllVouchers.rejected, (state, action) => {
        state.message = action.payload.data;
        state.error = action.payload;
      })
      // Get voucher by ID
      .addCase(getVoucherById.fulfilled, (state, action) => {
        state.voucher = action.payload.data;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getVoucherById.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.error = action.payload;
      })
      // Create voucher
      .addCase(createVoucher.fulfilled, (state, action) => {
        state.vouchers = [...state.vouchers, action.payload.data];
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(createVoucher.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.error = action.payload;
      })
      // Update voucher
      .addCase(updateVoucher.fulfilled, (state, action) => {
        state.vouchers = state.vouchers.map((voucher) => voucher.id === action.payload.data.id ? action.payload.data : voucher);
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(updateVoucher.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.error = action.payload;
      })
      // Delete voucher
      .addCase(deleteVoucher.fulfilled, (state, action) => {
        state.vouchers = state.vouchers.filter((voucher) => voucher.id !== action.payload.id);
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deleteVoucher.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.data;
        state.error = action.payload;
      })
      // Get voucher by code
      .addCase(getVoucherByCode.fulfilled, (state, action) => {
        state.vouchers = action.payload.data;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getVoucherByCode.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.data;
        state.error = action.payload;
      });
  },
});

export const { resetStatusAndMessage, resetVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
