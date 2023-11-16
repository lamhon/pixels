'use client'

import { useEffect, useState } from 'react'

import { Typography, Card, Button } from 'antd'
import {
  ManOutlined,
  WomanOutlined
} from '@ant-design/icons'

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store'

import { getApi } from '@/app/api/callApis'

import { getCookie } from '@/common/cookie'
import { showToast } from '@/common/common'

import MessageText from '@/configs/messageText'
import Configs from '@/configs/configs'

import { CustomerDataType, PaginationType } from '@/types/types'
import { setPagination } from '@/redux/features/paginationSlice';

const { Meta } = Card
const { Paragraph } = Typography

export default function CardRender(
  {
    pageIndex,
    pageSize,
    orderby,
    searchKey
  }: {
    pageIndex: number,
    pageSize: number,
    orderby: string,
    searchKey: string
  }
) {

  const [loading, setLoading] = useState<boolean>(true)
  const [list, setList] = useState([])

  const dispatch = useDispatch<AppDispatch>()
  const recall = useSelector((state: RootState) => state.recallApiReducer)
  console.log(recall)

  console.log(searchKey)

  useEffect(() => {
    console.log({ pageIndex, pageSize, orderby, searchKey })
    const getData = async () => {
      setLoading(true)
      const getList = await getApi('customer/getList', {
        pageIndex,
        pageSize,
        orderby,
        searchKey
      }, {
        'Content-Type': Configs.DEFAULT_CONTENT_TYPE,
        'Authorization': `Bearer ${getCookie('accessToken') ?? ''}`
      })

      if (getList.status !== MessageText['R-0001']) {
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
          getList.message,
          Configs.TOAST_TYPE_ERROR
        )
        setLoading(false)
        return
      }

      const paginationData: PaginationType = {
        pageIndex: getList.data.pageIndex,
        pageSize: getList.data.pageSize,
        total: getList.data.totalSize
      }

      dispatch(setPagination(paginationData))

      setList(getList.data.data)
      setLoading(false)
    }

    getData()
  }, [pageIndex, pageSize, orderby, searchKey, recall])

  const handleOpenModal = (id: string) => {
    console.log('open moda id: ', id)
  }

  return (
    <>
      {loading &&
        (
          <>
            <div className="row">
              <Card title loading={loading} className='col-4 mb-3'>
              </Card >
              <Card title loading={loading} className='col-4 mb-3'>
              </Card >
              <Card title loading={loading} className='col-4 mb-3'>
              </Card >
            </div>
            <div className="row">
              <Card title loading={loading} className='col-4 mb-3'>
              </Card >
              <Card title loading={loading} className='col-4 mb-3'>
              </Card >
              <Card title loading={loading} className='col-4 mb-3'>
              </Card >
            </div>
          </>
        )
      }
      <div className="row">
        {!loading && list.map((item: CustomerDataType, index: number) => {
          const calRedundantIndex: number = list.length - list.length % 3

          const itemJSX: JSX.Element = (
            <Card className="mb-3" >
              <Meta
                title={<Button type="link" onClick={() => { handleOpenModal(item._id) }}><b>{item['sex'] ? <ManOutlined style={{ color: '#0174BE' }} /> : <WomanOutlined style={{ color: '#F875AA' }} />}&nbsp;&nbsp;{item['name']}</b></Button>}
              />
              <div className="row pt-2 ps-4">
                <label className="col-2">SĐT</label>
                <span className="col">
                  <Paragraph copyable>{item.phoneNumber}</Paragraph>
                </span>
              </div>
              <div className="row pt-2 ps-4">
                <label className="col-2">Đ/c</label>
                <span className="col-10">{item.address}</span>
              </div>
            </Card>
          )

          if (index < calRedundantIndex) {
            return (
              <div key={index} className="col-4">
                {itemJSX}
              </div>
            )
          } else {
            return (
              <div key={index} className="d-flex justify-content-center">
                <div key={index} className="col-4">
                  {itemJSX}
                </div>
              </div>
            )
          }
        })
        }
      </div>
    </>
  )
}
