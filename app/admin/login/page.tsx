import type { Metadata } from 'next'

import Layout from '@/components/layout'
import FormLogin from '@/app/admin/login/formLogin'

export const metadata: Metadata = {
  title: 'Đăng nhập - 25V',
  description: 'đăng nhập 25v',
}

export default function Login() {
  return (
    <>
      <Layout>
        <div className="d-flex justify-content-center vh-100 align-items-center">
          <FormLogin />
        </div>
      </Layout>
    </>
  )
}
