import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Configs from '@/configs/configs'

const initialState = {
    status: false
}

export const recallApiSlice = createSlice({
    name: 'recallApi',
    initialState,
    reducers: {
        updateStatus(state) {
            state.status = !state.status
        }
    }
})

export const { updateStatus } = recallApiSlice.actions

export default recallApiSlice.reducer
