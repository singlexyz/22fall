import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import Select from './components/Select'
import Button from './components/Button'
import QRCode from './view/QRCode'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { fetchSelectedGroup } from './api'
import PageTransition from './components/PageTransition'

const Page = styled.div`
  background-color: #4860fe;
  min-height: 100vh;
  padding: 15px;
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
  function onChange (_field, value) {
    setData({
      ...data,
      selected: data.groupList.find(({id}) => id === value)
    })
  }
  const history = useHistory()
  const [data, setData] = useState(null)
  useEffect(async () => {
    const { code, data } = await fetchSelectedGroup()
    if (code === 200) { 
      setData({
        ...data,
        selected: data.groupList[0],
        groupList: data.groupList.map((v) => ({ ...v, value: v.id }))
      })
    } else {
      // 未填表进入时，叫用户滚去填表
      history.replace('/');
    }
  }, [])
  return (
    data && <PageTransition><Page>
      <Tile>
        <Prompt>你已勾选的群有：</Prompt>
        <Subprompt>你勾选的群在下方，出现二维码后立即扫码进群</Subprompt>
          <Select position="bottom" onChange={onChange} value={data.selected.id} values={data.groupList} />
        <QRCode image={data.selected.image} desc="扫码进群" />
      </Tile>
      <Tile>
        <Desc>若扫码无法进群，请点击下方按钮：</Desc>
        <Button onClick={() => history.push('/feedback')} invaild>无法进群</Button>
      </Tile>
      <Tile>
        <Desc>还有群想进？点这里填表</Desc>
        <Button onClick={() => history.push('/group', { qr: true })} add>
          <FontAwesomeIcon className="icon" icon={faPlusCircle}></FontAwesomeIcon>
          添加
        </Button>
      </Tile>
    </Page></PageTransition>
  )
}

export default QR
