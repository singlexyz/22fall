import React, { useEffect, useState } from 'react'
import DefaultLayout from './layout/DefaultLayout'
import QRCode from './view/QRCode'
import styled from 'styled-components'
import successBanner from './images/success.png'
import { fetchSelectedGroup } from './api'

const Desc = styled.span`
  font-size: ${() => 13 / 16}rem;
  .wechat { font-size: ${() => 18 / 13}em; }
`

const Tip = styled.p`
  background-image: linear-gradient(to right, rgba(73, 95, 244, .1), rgba(95, 225, 186, .1));
  color: #4860fe;
`

function Success () {
  const [qr, setQr] = useState('')

  useEffect(async () => {
    const { data } = await fetchSelectedGroup()
    setQr(data.wechatQrcode)
  }, [])
  return (
    <DefaultLayout image={successBanner}>
      <Tip>请立即截图保存本屏</Tip>
      <QRCode
        image={qr}
        desc1={<Desc>微信扫码添加<span className="wechat">【葱哥的助手】</span></Desc>}
      ></QRCode>
    </DefaultLayout>
  )
}

export default Success
