import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Başlangıç durumu
const initialState = {
    products: []
};

// API URL'si
const baseUrl = "http://localhost:5020/api/Products";

// Ürünleri almak için thunk fonksiyonu
export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
});

// Redux slice oluşturma
export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    }
});

// Reducer'ı dışa aktarma
export default productSlice.reducer;
