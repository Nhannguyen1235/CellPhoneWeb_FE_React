import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from "../ultil/axiosInstance";

const BaseUrl = 'http://localhost:8080';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
    const url = BaseUrl + `/user/getAllUser`;
    try {
        const response = await axiosInstance.get(url);
        console.log('API response:', response.data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const initialState = {
    users: [],
    status: 'idle',
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;