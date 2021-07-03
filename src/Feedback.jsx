import React from 'react'
import DefaultLayout from './layout/DefaultLayout'
import feedbackBanner from './images/feedback.png'
import QRCode from './view/QRCode'
import styled from 'styled-components'

const Text = styled.div`
  margin: 1em;
  font-size: .875rem;
  line-height: 1.6;
`

import AdaSelect from './components/AdaSelect'

function Feedback () {
  function onChange () {
  }
  const field = 'abc'

  return (
    <DefaultLayout image={feedbackBanner}>
      <AdaSelect container={ref} onChange={onChange} field={field} value={'大一'} values={['大一', '大二', '大三', '大四']} />
      <QRCode desc2={(
        <Text>
          <p>无法进群的同学，</p>
          <p>请扫码进入问题反馈群!</p>

        </Text>
      )} />
    </DefaultLayout>
  )
}

export default Feedback
