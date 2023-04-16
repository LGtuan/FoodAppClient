import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ProductOrderItem } from './models'
import { ORDER_URL } from '../utils'
import { setFastNotifi, setWrong } from './appSlice'

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
            dispatch(setFastNotifi({
                show: true,
                btnText: 'Lịch sử',
                content: 'Thanh toán thành công',
                route: 'OrderHistory'
            }))
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
    notify: ''
}

const orderSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductOrderItem>) => {
            let productOrder =
                state.products.find(item => item.product._id == action.payload.product._id)
            if (productOrder) {
                productOrder.quantity += action.payload.quantity
            }
            else {
                state.products.unshift(action.payload)
            }
        },
        setProducts: (state, action: PayloadAction<ProductOrderItem[]>) => {
            state.products = action.payload
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
                state.notify = 'Vui lòng đợi'
            })
            .addCase(checkout.fulfilled, (state) => {
                state.loading = false
                state.notify = 'Thanh toán thành công'
            })
            .addCase(checkout.rejected, (state) => {
                state.loading = false
                state.notify = 'Thanh toán thất bại'
            })
    }
})

export { checkout }
export const { addProduct, setProducts, removeProduct, changeQuantity, clearOrder } = orderSlice.actions
export default orderSlice.reducer