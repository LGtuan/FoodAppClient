import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ProductOrderItem } from './models'
import { ORDER_URL } from '../utils'
import { setWrong } from './appSlice'

const checkout = createAsyncThunk(
    'order/postOrder', async (_, { getState, dispatch }: any) => {
        let userId = getState().userSlice.user._id
        let token = getState().userSlice.user.token

        let products = getState().orderSlice.products

        const res = await fetch(ORDER_URL + '/' + userId,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    products,
                    token
                })
            }
        )
        if (res.status == 200) {
            dispatch(clearOrder())
            return
        } else if (res.status == 401) {
            dispatch(setWrong(true))
            return Promise.reject('Đã xảy ra lỗi khi đăng kí vui lòng thử lại')
        }
    }
)

const initialState = {
    products: [] as ProductOrderItem[],
    loading: false,
    error: ''
}

const orderSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductOrderItem>) => {
            state.products.unshift(action.payload)
        },
        removeProduct: (state, action) => {
            let index = action.payload
            if (index >= 0 && index < state.products.length) {
                state.products.splice(index, 1)
            }
        },
        changeQuantity: (state, action) => {
            let index = action.payload.index
            let number = action.payload.number
            if (index >= 0 && index < state.products.length) {
                state.products[index].quantity += number
            }
        },
        clearOrder: (state) => {
            state.products = []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(checkout.pending, (state) => {
                state.loading = true
            })
            .addCase(checkout.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(checkout.rejected, (state) => {
                state.loading = false
            })
    }
})

export { checkout }
export const { addProduct, removeProduct, changeQuantity, clearOrder } = orderSlice.actions
export default orderSlice.reducer