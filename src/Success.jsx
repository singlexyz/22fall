import React, { useEffect, useState } from 'react'
import DefaultLayout from './layout/DefaultLayout'
import QRCode from './view/QRCode'
import styled from 'styled-components'
import successBanner from './images/success.png'
import successIcon from './images/success-icon.png'
import { fetchGroupList } from './api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCut } from '@fortawesome/free-solid-svg-icons'

const Desc = styled.span`
  font-size: ${() => 13 / 16}rem;
  .wechat { font-size: ${() => 18 / 13}em; }
`

const Tip = styled.div`
  margin: -1.875rem auto 0;
  font-size: 1rem;
  text-align: center;
`

const TipInner = styled.p`
  background-image: linear-gradient(to right, rgba(73, 95, 244, .1), rgba(95, 225, 186, .1));
  color: #4860fe;
  border-radius: 0 0 1.5em 1.5em;
  padding: .875em;
  text-align: center;
  font-weight: bold;
  display: inline-block;
  margin: 0 auto;
  .flip-y { transform: rotatey(180deg); }
`

const TipText = styled.span`
  margin: 0 1.375em;
`

const Readme = styled.dl`
  font-size: 1rem;
`

const ReadmeTitle = styled.dt`
  border-bottom: 1px dashed #d6d7dc;
  color: #666;
  font-size: 0.9375em;
  text-align: center;
  padding: 0.9375em 1em;
  position: relative;
  margin: 0 -25px 1.4em;
  &::after {
  left: 0; right: 0; margin: 0 auto;
  background-color: #4860fe; height: 3px; width: 2.666666667em; content: ""; position: absolute; bottom: -2px; }
`

const ReadmeTerm = styled.dd`
  font-size: .75em;
  color: #666;
  margin: .5em 0;
  ${(props) => props.highlight && 'font-weight: bold;'}
  &::before {
    content: "";
    background-color: #26d79f;
    vertical-align: 1px;
    display: inline-block;
    border-radius: 50%;
    width: .3125rem;
    height: .3125rem;
    margin-right: .5rem;
  }
`

const Text = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  margin-top: -1rem;
  justify-content: center;
  align-items: center;
  .image { width: 13.33333333%; max-width: 100px; }
  .message { color: white; font-size: 1.25rem; margin-bottom: .1em; }
  .wechat { font-size: .75rem; color: rgba(255, 255, 255, .6); }
`

function Success() {
  const [qr, setQr] = useState('')
  const [wechat, setWechat] = useState('')
  useEffect(() => {
    const title = document.title
    document.title = '提交成功'
    return () => {
      document.title = title
    }
  }, [])
  useEffect(async () => {
    const { code, data, message } = await fetchGroupList()
    if (code === 200) {
      setQr(data.wechatQrcode)
      setWechat(data.info.wechat)
    } else {
      alert(message)
    }
  }, [])
  return (
    <DefaultLayout text={
      <Text>
        <img className="image" src={successIcon} />
        <p className="message">提交成功</p>
        <p className="wechat">微信号：{wechat}</p>
      </Text>
    } image={successBanner}>
      <Tip>
        <TipInner>
          <FontAwesomeIcon icon={faCut} />
          <TipText>请立即截图保存本屏</TipText>
          <FontAwesomeIcon className="flip-y" icon={faCut} />
        </TipInner>
      </Tip>
      <QRCode
        image={qr}
        desc1={<Desc>微信扫码添加<span className="wechat">【葱哥的助手】</span></Desc>}
      ></QRCode>

      <Readme>
        <ReadmeTitle>扫码前请认真阅读</ReadmeTitle>
        <ReadmeTerm highlight>请扫码添加【寄托葱哥】，根据葱哥的应答，自主进群。</ReadmeTerm>
        <ReadmeTerm>如果添加好友后，【寄托葱哥】未应答，请将截图发给他，并耐心等待。</ReadmeTerm>
        <ReadmeTerm>如需要增加进群，请再次填此申请表。</ReadmeTerm>
        <ReadmeTerm>如有进群疑问、建议、申请新群建议，可以私聊【寄托葱哥】。</ReadmeTerm>
      </Readme>
    </DefaultLayout>
  )
}

export default Success



