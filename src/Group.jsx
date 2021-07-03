import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import DefaultLayout from './layout/DefaultLayout'
import Button from './components/Button'
import QRCode from './view/QRCode'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import GroupPicker from './components/GroupPicker'

import { fetchGroupList } from './api'

const Desc = styled.span`
  font-size: ${() => 13 / 16}rem;
  .wechat { font-size: ${() => 18 / 13}em; }
`

const Hr = styled.hr`
  margin: 1.25rem 0;
  border: 0;
  border-top: 1px solid #e1e1e1;
`

const Wrap = styled.div`
  margin: 6px 0 30px;
`

function Group () {
  const [data, setData] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState([])

  function onChange (value) {
    console.log(value)
    setSelectedGroup(value)
  }

  function onSubmit () {
    if (selectedGroup.length) {
    } 
  }

  useEffect(async () => {
    const { data } = await fetchGroupList()
    setData(data)
  }, [])

  return (
    data && <DefaultLayout>
      <pre>{JSON.stringify(selectedGroup, null, 2)}</pre>
      <h6>
        <FontAwesomeIcon className="icon" icon={faAddressCard}></FontAwesomeIcon>
        微信号：JaneDeng
      </h6>
      <Hr />
      <h6>
        <FontAwesomeIcon className="icon" icon={faPlusSquare}></FontAwesomeIcon>
        选择你要进入的群（进群数有限制，请按需勾选）
      </h6>
      <Wrap>
        <GroupPicker onChange={onChange} field='test' groups={data.groupList} />
      </Wrap>
      <Button onClick={onSubmit} type="button" primary>提交</Button>
      <QRCode
        image={data.wechatQrcode}
        desc1={<Desc>填表后扫码添加<span className="wechat">【葱哥的助手】</span></Desc>}
        desc2="点击葱哥发给你的“进群入口”链接，扫码进群。"
      ></QRCode>
    </DefaultLayout>
  )
}

export default Group
