import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from "../ultil/axiosInstance";
import axios from 'axios';

const BaseUrl = 'http://localhost:8080';

// Lấy danh sách sản phẩm từ API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (thunkAPI) => {
    // const response = await axios.get(`${BaseUrl}/user/getAllUser`);
    // return response.data.data;

    const url = BaseUrl + `/user/getAllUser`;

    try{
        const response = await axiosInstance.get(url);
        console.log(response.data)
        return response.data.data;
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.respone.data)
    }
});

// export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
//     const response = await axiosInstance.get(`${BaseUrl}/admin/categories`);
//     return response.data;
// });

// export const addImagesProduct = createAsyncThunk('products/addImagesProduct', async (images, productId) => {
//     const response = await axiosInstance.post(`${BaseUrl}/product/uploads/${productId}`, images);
//     return response.data.data;
// });

// export const deleteImagesProduct = createAsyncThunk('products/deleteImagesProduct', async (images, productId) => {
//     const response = await axiosInstance.post(`${BaseUrl}/product/admin/deleteImages/${productId}`, images);
//     return response.data.data;
// });

// export const addProduct = createAsyncThunk('products/addProduct', async (product, images) => {
//     const response = await axiosInstance.post(`${BaseUrl}/product/admin/add`, product);
//     const productId = response.data.data.id;
//     await addImagesProduct(images, productId);

//     return response.data.data;
// });

// Khởi tạo trạng thái ban đầu
const initialState = {
    users:null,        // Danh sách tất cả các user
    status: '',          // Trạng thái của yêu cầu (idle, loading, succeeded, failed)
    message: "",
    error: '',               // Lỗi nếu có khi lấy sản phẩm từ API
};

// Tạo slice Redux
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // Khi yêu cầu lấy sản phẩm từ API đang chờ phản hồi
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            // Khi lấy sản phẩm từ API thành công
            .addCase(fetchUsers.fulfilled, (state, action) =>{
                // state.status = action.payload
                // state.message = action.payload
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) =>{
                // state.status = action.payload.data.data.status
                // state.message = action.payload.data.data.message
                console.log("loi")
            })
    },
});

// export const { setCategory, setPrice, setSearchTerm, setCategories } = productSlice.actions;

export default userSlice.reducer;
