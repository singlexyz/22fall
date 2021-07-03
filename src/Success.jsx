import React from 'react'
import DefaultLayout from './layout/DefaultLayout'
import QRCode from './view/QRCode'
import styled from 'styled-components'
import successBanner from './images/success.png'

const Desc = styled.span`
  font-size: ${() => 13 / 16}rem;
  .wechat { font-size: ${() => 18 / 13}em; }
`

function Success () {
  // 终于填完了
  return (
    <DefaultLayout image={successBanner}>
      <QRCode
        image="https://picsum.photos/400"
        desc1={<Desc>微信扫码添加<span className="wechat">【葱哥的助手】</span></Desc>}
      ></QRCode>
    </DefaultLayout>
  )
}

export default Success
