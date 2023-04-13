import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CategoryModel } from './models'
import { CATEGORY_URL } from '../utils/service'

export const fetchCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        const respone = await fetch(CATEGORY_URL, { method: 'GET' })
        const json = await respone.json()
        return json
    })

const initialState = {
    items: [] as CategoryModel[],
    loading: false,
    error: '' as (undefined | string),
    cartIdSellected: ''
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.cartIdSellected = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.pending, state => {
                state.loading = true
            }).addCase(fetchCategories.fulfilled, (state, action) => {
                state.items = action.payload.data
                state.cartIdSellected = action.payload.data[0]._id
            }).addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})
export const { setCategoryId } = categoriesSlice.actions
export default categoriesSlice.reducer