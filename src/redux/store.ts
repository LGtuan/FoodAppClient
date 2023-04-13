import { configureStore } from '@reduxjs/toolkit'
import productsSlide from './productsSlide'
import categoriesSlice from './categoriesSlice'
import userSlice from './userSlice'
import orderSlice from './orderSlice'
import appSlice from './appSlice'

const store = configureStore({
    reducer: {
        userSlice,
        categoriesSlice,
        productsSlide,
        orderSlice,
        appSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }