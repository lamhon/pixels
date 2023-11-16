'use client'
import { useRouter } from "next/navigation"

import { Pagination } from 'antd'
import type { PaginationProps } from 'antd'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import { SearchParamsType } from '@/types/types'

export default function PaginationBar(
  {
    current,
    // total,
    searchParams
  }: {
    current: number,
    // total: number,
    searchParams: SearchParamsType
  }
) {
  const router = useRouter()
  const size = useSelector((state: RootState) => state.paginationReducer)

  const handleChange: PaginationProps['onShowSizeChange'] = (page, pageSize) => {
    if (searchParams.searchParams.q) {
      router.push('/admin/customer?q=' + searchParams.searchParams.q + '&pageSize=' + pageSize + '&pageIndex=' + page)
    } else {
      router.push('/admin/customer?pageSize=' + pageSize + '&pageIndex=' + page)
    }
  }

  return (
    <Pagination
      defaultCurrent={current}
      total={size.total}
      onChange={handleChange}
    />
  )
}
