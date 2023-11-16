import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LoadingType {
    loading: boolean
}

const initialState: LoadingType = {
    loading: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    }
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer
