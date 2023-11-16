'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, Modal } from 'antd'
import Sider from 'antd/es/layout/Sider'
import {
  ContactsOutlined,
  TeamOutlined,
  LineChartOutlined,
  FileTextOutlined,
  SettingOutlined,
  TagOutlined,
  HeartOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  ExclamationCircleFilled,
  UserOutlined,
} from '@ant-design/icons'
import { getCookie, deleteCookie } from '@/common/cookie'
import { useRouter, usePathname } from 'next/navigation'

const { confirm } = Modal

import '../app/styles/menuLayout/style.css'
import { Content } from 'antd/es/layout/layout'

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const defaultSelected: [string] = ['1']
const defaultOpenKey: string[] = []

export default function MenuLayout({ children, title }: { children: React.ReactNode, title: string }) {
  // console.log(Layout.Header)
  const [userId, setUserId] = useState<string | undefined>(getCookie('userId'))
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const logout = () => {
    confirm({
      title: 'Bạn có muốn đăng xuất không?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteCookie('accessToken')
        deleteCookie('expirationDate')
        deleteCookie('userId')
        router.push('/admin/login')
      },
      onCancel() {
      },
    });
  }

  const items: MenuItem[] = [
    getItem('Tổng quát', '1', <Link href="/admin/dashboard"><LineChartOutlined /></Link>),
    getItem('Khách hàng', '2', <Link href="/admin/customer"><ContactsOutlined /></Link>),
    getItem('Quản trị', '3', <Link href="/admin/customer"><TeamOutlined /></Link>),
    getItem('Đơn hàng', '4', <Link href="/admin/customer"><FileTextOutlined /></Link>),
    getItem('Cài đặt', '5', <SettingOutlined />, [
      getItem('Loại hoa', 'sub5-1', <Link href="/admin/flowerType"><TagOutlined /></Link>),
      getItem('Dịp', 'sub5-2', <Link href="/admin/occasion"><HeartOutlined /></Link>),
      getItem('Kiểu thanh toán', 'sub5-3', <Link href="/admin/paymentType"><CreditCardOutlined /></Link>),
      getItem('Nơi đặt', 'sub5-4', <Link href="/admin/placeOrder"><EnvironmentOutlined /></Link>),
    ]),
    getItem(isClient ? userId : '', 'sub2', <TeamOutlined />, [
      getItem('Hồ sơ', 'sub2-1', <Link href="/admin/information" ><UserOutlined /></Link>),
      getItem('Đăng xuất', 'sub2-2', <Link href="" onClick={logout}><LogoutOutlined /></Link>)
    ]),
  ]

  return (
    <Layout className="layout-menu" hasSider>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo-container">
          <Link href="/" className="logo-area" title="Mémoire Flora">
            <img id="logo" className="logo" src="https://cryptologos.cc/logos/ethereum-pow-ethw-logo.svg?v=026" alt="Logo" />
          </Link>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={defaultSelected}
          defaultOpenKeys={defaultOpenKey}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content className="layout-content-page">
          <Breadcrumb items={[{ title }]} className="breadcrumb-page" />
          <div className="container-content">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
