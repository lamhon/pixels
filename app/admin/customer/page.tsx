import type { Metadata } from 'next'
import { Button } from 'antd'

import MenuLayout from '@/components/menuLayout'
import Layout from '@/components/layout'
import Bar from '@/components/search/bar'
import PaginationBar from '@/components/pagination/paginationBar'
import CardRender from '@/components/card/page'
import CreateCustomer from '@/components/modal/customer/create'
import CreateButton from '@/components/createButton/page'

import Configs from '@/configs/configs'

import { SearchParamsType } from '@/types/types'

export const metadata: Metadata = {
  title: 'Khách hàng - 25V',
  description: 'Customer - 25V',
}

export default function Customer(searchParams: SearchParamsType) {
  // const [modalCreate, setModalCreate] = useState<boolean>(false)

  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  console.log(searchParams)
  return (
    <Layout>
      <MenuLayout title="Khách hàng">
        <div className="col">
          {/* Header */}
          <div className="d-flex justify-content-between mb-3">
            <div className="col-4">
              {/* <CreateCustomer
                buttonText="Tạo"
                title="Tạo mới khách hàng"
                okText="Tạo"
                cancelText="Thoát"
              /> */}
              <CreateButton
                buttonText="Tạo"
                title="Test tạo"
                okText="Test OK"
                cancelText="Test Cancel"
              />
            </div>
            <div className="col-4">
              <Bar
                placeHolder="Nhập tên hoặc SĐT..."
                searchParams={searchParams}
              />
            </div>
          </div>
          {/* Body */}
          <div className="col-12">
            <CardRender
              pageIndex={searchParams.searchParams.pageIndex ? parseInt(searchParams.searchParams.pageIndex.toString()) : Configs.DEFAULT_PAGE_INDEX}
              pageSize={searchParams.searchParams.pageSize ? parseInt(searchParams.searchParams.pageSize.toString()) : Configs.DEFAULT_PAGE_SIZE}
              orderby={Array.isArray(searchParams.searchParams.orderBy) ? searchParams.searchParams.orderBy[0] : searchParams.searchParams.orderBy ? searchParams.searchParams.orderBy : ''}
              searchKey={Array.isArray(searchParams.searchParams.q) ? searchParams.searchParams.q[0] : searchParams.searchParams.q ? searchParams.searchParams.q : ''}
            />
          </div>
          {/* Footer */}
          <div className="col-12 text-end">
            <PaginationBar
              current={(searchParams.searchParams.pageIndex ? parseInt(searchParams.searchParams.pageIndex.toString()) : Configs.DEFAULT_PAGE_INDEX)}
              searchParams={searchParams}
            />
          </div>
        </div>
      </MenuLayout>
    </Layout>
  )
}
