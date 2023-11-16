import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Configs from '@/configs/configs'
import { PaginationType } from '@/types/types'

const initialState: PaginationType = {
    pageIndex: Configs.DEFAULT_PAGE_INDEX,
    pageSize: Configs.DEFAULT_PAGE_SIZE,
    total: 1
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPagination(state, action: PayloadAction<PaginationType>) {
            state.pageIndex = action.payload.pageIndex
            state.pageSize = action.payload.pageSize
            state.total = action.payload.total
        }
    }
})

export const { setPagination } = paginationSlice.actions

export default paginationSlice.reducer
