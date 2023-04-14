import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FastNotifiModel } from './models'

const initialState = {
    wrongToken: false,
    fastNotifi: {
        show: false,
        content: '',
        route: '',
        btnText: ''
    } as FastNotifiModel,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setWrong: (state, action) => {
            state.wrongToken = action.payload
        },
        setFastNotifi: (state, action: PayloadAction<FastNotifiModel>) => {
            state.fastNotifi.show = action.payload.show
            if (action.payload.show) {
                state.fastNotifi.content = action.payload.content
                state.fastNotifi.route = action.payload.route
                state.fastNotifi.btnText = action.payload.btnText
            }
        }
    }
})

export const { setWrong, setFastNotifi } = appSlice.actions
export default appSlice.reducer