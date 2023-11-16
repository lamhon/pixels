import { configureStore } from '@reduxjs/toolkit'
import paginationReducer from './features/paginationSlice'
import recallApiReducer from './features/recallApiSlice'
import loadingReducer from './features/loadingSlice'

export const store = configureStore({
    reducer: {
        paginationReducer,
        recallApiReducer,
        loadingReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
