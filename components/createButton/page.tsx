'use client'

import { useState, useRef } from 'react'

import { Button, Modal, Form } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store'

import CreateForm from '../modal/customer/createForm'
import { setLoading } from '@/redux/features/loadingSlice'

const { confirm } = Modal

export default function CreateButton(
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
  const [form] = Form.useForm()

  const loading: boolean = useSelector((state: RootState) => state.loadingReducer.loading)

  const formRef = useRef()

  const dispatch = useDispatch<AppDispatch>()

  const [modal, setModal] = useState<boolean>(false)

  const handleCancelModal = () => {
    confirm({
      title: 'Warning',
      icon: <ExclamationCircleFilled />,
      content: 'Dữ liệu chưa được lưu, nếu rời khỏi dữ liệu sẽ biến mất. Bạn có chắc muốn rời khỏi không?',
      onOk() {
        setModal(false)

        // Reset form after close modal
        // form.resetFields()
      }
    })
  }

  const handleSubmit = () => {
    try {
      form.validateFields().then(values => {
        dispatch(setLoading(true))
      })
    } catch (err) {
      console.error("Validation failed:", err)
    }
  }

  console.log(loading)
  return (
    <>
      <Button type="primary" onClick={() => setModal(true)}>{buttonText}</Button>
      <Modal
        title={title}
        centered
        open={modal}
        onCancel={handleCancelModal}
        onOk={handleSubmit}
        okText={okText}
        cancelText={cancelText}
        confirmLoading={loading}
      >
        <CreateForm
          onSubmit={handleSubmit}
          form={form}
        />
      </Modal>
    </>
  )
}
