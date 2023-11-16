'use client'

import { useState, useEffect } from 'react'

import { Button, Form, Input, Spin, Skeleton } from 'antd'

import { useRouter } from 'next/navigation'

import { postApi } from '@/app/api/callApis'
import MessageText from '@/configs/messageText'
import Configs from '@/configs/configs'
import { showToast, compareDate } from '@/common/common'
import { setCookie, getCookie, deleteCookie } from '@/common/cookie'

import '../../styles/login/login.css'

type FieldType = {
  userId?: string
  password?: string
}

export default function FormLogin() {
  const router = useRouter()

  useEffect(() => {
      const expirationDateString = getCookie('expirationDate')
      if (expirationDateString && getCookie('accessToken')) {
        const expirationDate = parseInt(expirationDateString)

        if (compareDate(new Date(expirationDate * 1000), new Date()) === 1) {
          router.push('/admin/dashboard')
        } else {
          getCookie('expirationDate') && deleteCookie('expirationDate')
          getCookie('accessToken') && deleteCookie('accessToken')
          getCookie('userId') && deleteCookie('userId')
        }
      }
  }, [router])

  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = async (values: FieldType) => {
    setLoading(true)
    const callApi = await postApi('auth/login', values)

    if (callApi.status !== MessageText['R-0001']) {
      showToast(
        Configs.TOAST_POSITION_TOP_RIGHT,
        Configs.TOAST_THEME_LIGHT,
        Configs.TOAST_AUTO_CLOSE_DEFAULT,
        Configs.TOAST_NOT_HIDE_PROGRESS_BAR,
        Configs.TOAST_LIMIT_DEFAULT,
        Configs.TOAST_CLOSE_ON_CLICK_DEFAULT,
        Configs.TOAST_PAUSE_ON_FOCUS_LOSS_DEFAULT,
        Configs.TOAST_DRAGGABLE_DEFAULT,
        Configs.TOAST_NEWEST_ON_TOP_DEFAULT,
        Configs.TOAST_PAUSE_ON_HOVER_DEFAULT,
        Configs.TOAST_RTL_DEFAULT,
        callApi.message,
        Configs.TOAST_TYPE_ERROR
      )
      setLoading(false)
      return
    }

    showToast(
      Configs.TOAST_POSITION_TOP_RIGHT,
      Configs.TOAST_THEME_LIGHT,
      Configs.TOAST_AUTO_CLOSE_DEFAULT,
      Configs.TOAST_NOT_HIDE_PROGRESS_BAR,
      Configs.TOAST_LIMIT_DEFAULT,
      Configs.TOAST_CLOSE_ON_CLICK_DEFAULT,
      Configs.TOAST_PAUSE_ON_FOCUS_LOSS_DEFAULT,
      Configs.TOAST_DRAGGABLE_DEFAULT,
      Configs.TOAST_NEWEST_ON_TOP_DEFAULT,
      Configs.TOAST_PAUSE_ON_HOVER_DEFAULT,
      Configs.TOAST_RTL_DEFAULT,
      `Hi ${callApi.data.name}!`,
      Configs.TOAST_TYPE_SUCCESS
    )

    setCookie('accessToken', callApi.data.accessToken)
    setCookie('expirationDate', callApi.data.expirationDate)
    setCookie('userId', callApi.data.userId)


    // localStorage.clear()
    // localStorage.setItem('name', callApi.data.name)
    // localStorage.setItem('sex', callApi.data.sex)
    // localStorage.setItem('userId', callApi.data.userId)
    router.push('/admin/dashboard')
    setLoading(false)
  }

  return (
    <Spin spinning={loading}>
      <Form
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className="text-center">
          <b className="font-memoire h4">25v management</b>
        </div>
        <Form.Item<FieldType>
          className="mb-1"
          rules={[{ required: true, message: '' }]}
          label="ID"
          name="userId"
          labelCol={{ span: 24 }}
        >
          <Input id="userId" maxLength={40} minLength={4} />
        </Form.Item>
        <Form.Item<FieldType>
          className="mb-1"
          rules={[{ required: true, message: '' }]}
          name="password"
          label="Mật khẩu"
          labelCol={{ span: 24 }}
        >
          <Input.Password id="password" maxLength={120} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}
