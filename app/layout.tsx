import { Suspense } from 'react'
import { Spin } from 'antd'

import ReduxProvider from '@/redux/provider'
import { store } from '@/redux/store'

import type { Metadata } from 'next'
import './globals.css'
import './styles/bootstrap-v5.2.3/css/bootstrap.min.css'

import StyledComponentsRegistry from '@/lib/AntdRegistry'

export const metadata: Metadata = {
  title: '25V',
  description: '25V solution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Suspense fallback={<Loading />}>
            <StyledComponentsRegistry>
              {children}
            </StyledComponentsRegistry>
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  )
}

const Loading = () => {
  return (
    <div className="load-wait">
      <Spin />
    </div>
  )
}
