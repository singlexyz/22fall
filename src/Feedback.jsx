import React, { useState, useEffect } from 'react'
import DefaultLayout from './layout/DefaultLayout'
import feedbackBanner from './images/feedback.png'
import QRCode from './view/QRCode'
import styled from 'styled-components'
import { fetchSelectedGroup } from './api'

const Text = styled.div`
  margin: 1em;
  font-size: .875rem;
  line-height: 1.6;
`

function Feedback () {
  const [qr, setQr] = useState('')

  useEffect(async () => {
    const { data } = await fetchSelectedGroup()
    setQr(data.feedbackQrcode)
  }, [])

  return (
    <DefaultLayout image={feedbackBanner}>
      {
      <QRCode
        image={qr}
        desc2={
        <Text>
          <p>无法进群的同学，</p>
          <p>请扫码进入问题反馈群!</p>
        </Text>
        } />
      }
    </DefaultLayout>
  )
}

export default Feedback
