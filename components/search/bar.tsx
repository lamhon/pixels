'use client'

import { useState } from 'react'

import { Input } from 'antd'

import { useRouter } from "next/navigation"

import { SearchParamsType } from '@/types/types'

const { Search } = Input

export default function Bar(
  {
    placeHolder,
    searchParams
  }: {
    placeHolder: string,
    searchParams: SearchParamsType
  }) {
  const router = useRouter()

  // const [value, setValue] = useState<string>(searchParams.searchParams.q ? searchParams.searchParams.q.toString() : "")

  const handleSearch = (val: string) => {
    if (val) {
      console.log('first')
      router.push('/admin/customer?q=' + val)
    // } else if (searchParams.searchParams.q) {
    //   router.push('/admin/customer?q=' + searchParams.searchParams.q)
    //   console.log('second')*/
    } else {
      router.push('/admin/customer')
      console.log('last')
    }
  }

  // const handleInput = (val: string) => {
  //   setValue(val)
  // }

  return (
    <Search
      // value={value}
      // onChange={handleInput}
      placeholder={placeHolder}
      size="middle"
      onSearch={handleSearch}
    />
  )
}
