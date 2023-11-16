import Layout from '@/components/layout'
import FormContent from './formContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculate - 25V',
  description: 'calculate 25v',
}

export default function Calculate() {
  return (
    <>
      <Layout>
        <FormContent />
      </Layout>
    </>
  )
}
