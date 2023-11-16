'use client'
import { useState } from 'react'
import { Button, Form, InputNumber, Typography, message } from 'antd'

import { formatDateVN, formatTimeVN } from '@/common/common'
import Configs from '@/configs/configs'

type FieldType = {
  energy: number
  targetEnergy: number
};

const { Paragraph } = Typography

export default function FormContent() {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  const [result, setResult] = useState<string>('')

  const onFinish = (values: FieldType) => {
    const ENERGY_REFUND_BY_MINUTE: number = 0.33
    // form.validateFields().then(async (values:FieldType)  => {
    console.log(values)
    const currentDate: Date = new Date()
    if (values.targetEnergy <= values.energy) {
      messageApi.error(formatDateVN(currentDate) + " - " + formatTimeVN(currentDate))
    }

    const enegeryRefund: number = values.targetEnergy - values.energy

    const minuteToRefund: number = enegeryRefund / ENERGY_REFUND_BY_MINUTE

    const timeNeedToRefund: Date = new Date(currentDate.getTime() + (minuteToRefund * 60 * 1000))
    messageApi.info(formatDateVN(timeNeedToRefund) + " - " + formatTimeVN(timeNeedToRefund))
    // })
  }

  return (
    <div className="d-flex justify-content-center vh-100 align-items-center">
      {contextHolder}
      <Form
        autoComplete="off"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item<FieldType>
          className="mb-1"
          rules={[{ required: true, message: '' }]}
          label="Target energy"
          name="targetEnergy"
          labelCol={{ span: 24 }}
        >
          <InputNumber min={0} max={1000} className="w-100" />
        </Form.Item>
        <Form.Item<FieldType>
          className="mb-1"
          rules={[{ required: true, message: '' }]}
          label="Energy"
          name="energy"
          labelCol={{ span: 24 }}
        >
          <InputNumber min={0} max={1000} className="w-100" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
        {result &&
          <div>
            <p>Will refund in: <Paragraph copyable>{result}</Paragraph></p>
            <Button danger onClick={() => { form.resetFields(); setResult('') }}>Clear</Button>
          </div>
        }
      </Form>
    </div>
  )
}