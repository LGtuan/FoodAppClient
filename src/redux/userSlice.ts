import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UserModel } from './models'
import { URL } from '../utils/service'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const login = createAsyncThunk(
    'user/login', async ({ accout, navigateToHome }: any) => {
        try {
            const res = await fetch(URL + '/api/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(accout)
            })

            if (res.status == 401) {
                return { error: 'Sai thông tin đăng nhập' }
            } else if (res.status == 400) {
                return { error: 'Tài khoản không tồn tại hoặc sai mật khẩu!' }
            } else if (res.status == 200) {
                let json = await res.json()
                let user = json.user
                await AsyncStorage.setItem('user', JSON.stringify({ _id: user._id, token: user.token }))

                navigateToHome()
                return user
            }

        } catch (error: any) {
            console.log(error)
            return Promise.reject('Đã xảy ra lỗi khi đăng nhập')
        }
    })

export const register = createAsyncThunk(
    'user/register', async ({ user }: any) => {
        try {
            const res = await fetch(URL + '/api/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            if (res.status == 401) {

            } else if (res.status == 201) {
                const json = await res.json()
                console.log(json)
            }

        } catch (error: any) {
            console.log(error)
            return Promise.reject('Đã xảy ra lỗi khi đăng kí vui lòng thử lại')
        }
    })

const initialState = {
    user: {
        _id: '',
        name: '',
        password: '',
        email: '',
        token: '',
        numsNotification: {
            profile: 0,
            favoriteFood: 0,
            favoriteOrder: 0
        },
        favoriteProductIds: []
    } as UserModel,
    loading: false,
    error: ''
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        clearNumsNotification: (state, action) => {
            let profile = action.payload.profile
            let favoriteFood = action.payload.favoriteFood
            let favoriteOrder = action.payload.favoriteOrder

            if (profile) state.user.numsNotification.profile = 0
            if (favoriteFood) state.user.numsNotification.favoriteFood = 0
            if (favoriteOrder) state.user.numsNotification.favoriteOrder = 0
        },
        favoriteProduct: (state, action) => {
            let productId = action.payload
            if (!state.user.favoriteProductIds.includes(productId)) {
                state.user.numsNotification.favoriteFood += 1
                state.user.favoriteProductIds.push(productId)
            }
        },
        unFavoriteProduct: (state, action) => {
            let productId = action.payload
            if (state.user.favoriteProductIds.includes(productId)) {
                let index = state.user.favoriteProductIds.indexOf(productId)
                state.user.favoriteProductIds.splice(index, 1)
                state.user.numsNotification.favoriteFood -= 1
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state, action) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action: any) => {
                if (action.payload.error) {
                    state.error = action.payload.error
                } else {
                    state.user = action.payload
                }
                state.loading = false
            })
            .addCase(login.rejected, (state, action: any) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(register.pending, (state, action) => {
                state.loading = true
            })
            .addCase(register.fulfilled, (state, action: any) => {
                console.log('Đăng ký thành công')
                state.loading = false
            })
            .addCase(register.rejected, (state, action: any) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export const { setError,
    setUser,
    favoriteProduct,
    unFavoriteProduct,
    clearNumsNotification } = userSlice.actions
export default userSlice.reducer