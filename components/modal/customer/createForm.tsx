'use client'

import { Form, FormInstance, Input } from 'antd'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { setLoading } from '@/redux/features/loadingSlice'

export default function CreateForm({
  onSubmit,
  form
}: {
  onSubmit: () => void,
  form: FormInstance
}
) {
  // const [form] = Form.useForm()

  const dispatch = useDispatch<AppDispatch>()

  const handleSubmitForm = () => {
    // dispatch(setLoading(true))
    form.validateFields().then(async(values) => {
      // onSubmit()
      dispatch(setLoading(true))
    })
  }

  return (
    <Form
      form={form}
      className="mt-2"
      autoComplete="off"
      onFinish={onSubmit}
    >
      <Form.Item
        rules={[{ required: true, message: '' }]}
        name="name"
        label="Tên khách hàng"
        labelCol={{ span: 24 }}
      >
        <Input id="name" maxLength={50} />
      </Form.Item>
    </Form>
  )
}
