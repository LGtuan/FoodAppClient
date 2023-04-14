import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PRODUCT_URL } from '../utils/service'
import { ProductModel } from './models'

export const fetchProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        const respone = await fetch(PRODUCT_URL, { method: 'GET' })
        const json = await respone.json()
        return json
    }
)

const initialState = {
    items: [] as ProductModel[],
    loading: false,
    error: '' as (string | undefined),
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export const { } = productsSlice.actions
export default productsSlice.reducer