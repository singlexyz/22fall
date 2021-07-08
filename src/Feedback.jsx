import React, { useState, useEffect } from 'react'
import DefaultLayout from './layout/DefaultLayout'
import feedbackBanner from './images/feedback.png'
import QRCode from './view/QRCode'
import styled from 'styled-components'
import { fetchSelectedGroup } from './api'
import PageTransition from './components/PageTransition'

const Text = styled.div`
  margin: 1em;
  font-size: .875rem;
  line-height: 1.6;
`

function Feedback() {
  const [qr, setQr] = useState('')

  useEffect(async () => {
    const { data, message, code } = await fetchSelectedGroup()
    if (code === 200) {
      setQr(data.feedbackQrcode)
    } else {
      alert(message)
    }
  }, [])

  return (
    <PageTransition>
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
    </PageTransition>
  )
}

export default Feedback
