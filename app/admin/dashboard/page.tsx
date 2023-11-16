import MenuLayout from '@/components/menuLayout'
import Layout from '@/components/layout'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trang chủ - 25V',
  description: 'Dashboard - 25V',
}

export default function Dashboard() {
  // console.log(getCookie('userId'))
  return (
    <Layout>
      <MenuLayout title="Trang chủ">
        {/* <div>Dashboard</div> */}
      </MenuLayout>
    </Layout>
  )
}
