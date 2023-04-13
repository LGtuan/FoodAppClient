import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    wrongToken: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setWrong: (state, action) => {
            state.wrongToken = action.payload
        }
    }
})

export const { setWrong } = appSlice.actions
export default appSlice.reducer