'use client'

import { useState } from 'react'

import { useRouter } from "next/navigation"

import { Button, Modal, Form, Input, Space, Select } from 'antd'
import { ExclamationCircleFilled, ManOutlined, WomanOutlined } from '@ant-design/icons'

import MessageText from '@/configs/messageText'
import Configs from '@/configs/configs'

import { postApi } from '@/app/api/callApis'

import { showToast } from '@/common/common'
import { getCookie } from '@/common/cookie'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { updateStatus } from '@/redux/features/recallApiSlice'

const { confirm } = Modal
const { Option } = Select
const { TextArea } = Input

interface InputData {
  name: string
  address?: string
  phone: {
    phoneRegion: string
    phoneNumber: string
  },
  sex: Number,
  note?: string,
}

const sexOption = [
  {
    key: 1,
    value: 1,
    label: 'Nam',
    icon: <ManOutlined />
  },
  {
    key: 2,
    value: 0,
    label: 'Nữ',
    icon: <WomanOutlined />
  }
]

export default function CreateCustomer(
  {
    buttonText,
    title,
    okText,
    cancelText,
  }:
    {
      buttonText: string,
      title: string,
      okText: string,
      cancelText: string
    }
) {
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()

  const [form] = Form.useForm()

  const [modal, setModal] = useState<boolean>(false)
  const [spin, setSpin] = useState<boolean>(false)

  const handleCancelModal = () => {
    confirm({
      title: 'Warning',
      icon: <ExclamationCircleFilled />,
      content: 'Dữ liệu chưa được lưu, nếu rời khỏi dữ liệu sẽ biến mất. Bạn có chắc muốn rời khỏi không?',
      onOk() {
        setModal(false)

        // Reset form after close modal
        form.resetFields()
      }
    })
  }

  const handleSubmit = () => {
    form.validateFields().then(async (values: InputData) => {
      setSpin(true)
      // #region check name
      if (values.name.length > 50) {
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
          MessageText['W-0012'].replace('{0}', 'name').replace('{1}', '50'),
          Configs.TOAST_TYPE_WARNING
        )
        setSpin(false)
        return
      }
      // #endregion

      // #region check address
      if (values.address) {
        if (values.address.length > 120) {
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
            MessageText['W-0012'].replace('{0}', 'address').replace('{1}', '120'),
            Configs.TOAST_TYPE_WARNING
          )
          setSpin(false)
          return
        }
      } else {
        values.address = ''
      }
      // #endregion

      // #region check phoneNumber
      if (!values.phone.phoneRegion) {
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
          MessageText['W-0011'].replace('{0}', 'phone region'),
          Configs.TOAST_TYPE_WARNING
        )
        setSpin(false)
        return
      }

      const checkPhoneNumberFormat = new RegExp(Configs.FORMAT_PHONE_NUMBER).test(values.phone.phoneNumber)
      if (!checkPhoneNumberFormat) {
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
          MessageText['W-0007'].replace('{0}', 'phone number'),
          Configs.TOAST_TYPE_WARNING
        )
        setSpin(false)
        return
      }
      // #endregion

      // #region check sex
      if (values.sex !== 1 && values.sex !== 0) {
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
          MessageText['W-0003'].replace('{0}', 'sex'),
          Configs.TOAST_TYPE_WARNING
        )
        setSpin(false)
        return
      }
      // #endregion

      // #region check note
      if (values.note) {
        if (values.note.length > 1000) {
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
            MessageText['W-0012'].replace('{0}', 'note').replace('{1}', '1000'),
            Configs.TOAST_TYPE_WARNING
          )
          setSpin(false)
          return
        }
      } else {
        values.note = ''
      }
      // #endregion

      const newCustomer = {
        name: values.name,
        address: values.address,
        phoneNumber: values.phone.phoneRegion + values.phone.phoneNumber,
        sex: values.sex,
        note: values.note
      }

      const callCreate = await postApi('customer/create', newCustomer, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('accessToken') ?? ''}`
      })

      if (callCreate.status !== MessageText['R-0001']) {
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
          callCreate.message,
          Configs.TOAST_TYPE_ERROR
        )
        setSpin(false)
        return
      }

      setModal(false)
      setSpin(false)
      dispatch(updateStatus())
      form.resetFields();
    })
  }

  return (
    <>
      <Button type="primary" onClick={() => setModal(true)}>{buttonText}</Button>
      {/* {modal && */}
      <Modal
        title={title}
        centered
        open={modal}
        onCancel={handleCancelModal}
        onOk={form.submit}
        okText={okText}
        cancelText={cancelText}
        confirmLoading={spin}
      >
        <Form
          form={form}
          className="mt-2"
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Form.Item
            rules={[{ required: true, message: '' }]}
            name="name"
            label="Tên khách hàng"
            labelCol={{ span: 24 }}
          >
            <Input id="name" maxLength={50} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            labelCol={{ span: 24 }}
          >
            <Input id="address" maxLength={120} />
          </Form.Item>
          <Form.Item
            label="SĐT"
            className="mb-1"
            labelCol={{ span: 24 }}
          >
            <Space direction="vertical" size="middle" className="w-100">
              <Space.Compact className="w-100">
                <Form.Item
                  name={['phone', 'phoneRegion']}
                  rules={[{ required: true, message: '' }]}
                  style={{ width: '30%' }}
                >
                  <Select options={Configs.PHONE_REGION} />
                </Form.Item>
                <Form.Item
                  name={['phone', 'phoneNumber']}
                  rules={[{ required: true, message: '' }]}
                  style={{ width: '70%' }}
                >
                  <Input id="phoneNumber" maxLength={15} />
                </Form.Item>
              </Space.Compact>
            </Space>
          </Form.Item>
          <Form.Item
            label="Giới tính"
            rules={[{ required: true, message: '' }]}
            labelCol={{ span: 24 }}
            name="sex"
          >
            <Select id="sex">
              {sexOption.map(item => (
                <Option key={item.key} value={item.value}>
                  <div className="d-flex">
                    <div>{item.icon}</div>
                    <div>{item.label}</div>
                  </div>
                </Option>
              ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            className="mb-1"
            name="note"
            label="Ghi chú"
            labelCol={{ span: 24 }}
          >
            <TextArea id="note" maxLength={1000} />
          </Form.Item>
        </Form>
      </Modal>
      {/* } */}
    </>
  )
}
