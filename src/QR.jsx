import React from 'react'
import styled from 'styled-components'
import Select from './components/Select'
import Button from './components/Button'
import QRCode from './view/QRCode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const Page = styled.div`
  background-color: #4860fe;
  min-height: 100vh;
  padding: 15px;
`

const Layout = styled.div`
  max-width: 480px;
  margin: 0 auto;
`

const Tile = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px 30px;
  & + & {
    margin-top: 10px;
  }
`


const Desc = styled.p`
  color: #666;
  font-size: .875rem;
  margin-bottom: .75em;
  &::before {
    content: "*";
    margin-right: 3px;
    color: #e04f33;
  }
`

const Prompt = styled.p`
  color: black;
  margin-bottom: ${() => 2 / 16}rem;
  font-size: ${() => 18 / 16}rem;
`
const Subprompt = styled.p`
  color: #666;
  margin-bottom: ${() => 14 / 16}rem;
  font-size: ${() => 14 / 16}rem;
`

function QR () {
  function onChange () {
  }
  return (
    <Page>
      <Layout>
      <Tile>
        <Prompt>你已勾选的群有：</Prompt>
        <Subprompt>你勾选的群在下方，出现二维码后立即扫码进群</Subprompt>
          <Select  onChange={onChange} values={[
            "霸道总裁爱上我",
            "郭敬明的108个秘密",
            "如何患上精神疾病"
          ]}>
          </Select>
        <QRCode image="https://picsum.photos/300" desc="扫码进群" />
      </Tile>
      <Tile>
        <Desc>若扫码无法进群，请点击下方按钮：</Desc>
        <Button invaild>无法进群</Button>
      </Tile>
      <Tile>
        <Desc>还有群想进？点这里填表</Desc>
        <Button add>
          <FontAwesomeIcon className="icon" icon={faPlusCircle}></FontAwesomeIcon>
          添加
        </Button>
      </Tile>
      </Layout>
    </Page>
  )
}

export default QR
