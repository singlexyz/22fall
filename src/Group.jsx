import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import MotionButton from './components/MotionButton'
import QRCode from './view/QRCode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import GroupPicker from './components/GroupPicker'
import LoadingScreen from './view/LoadingScreen'
import './Form.scss'
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

const Field = ({ children, title }) => {
  return (
    <div className="field">
      {title && <p className="field__title">{title}</p>}
      {children}
    </div>
  )
}

const Checkbox = ({ text, value, name, checked }) => {
  return (
    <label className="input__checkbox">
      <input className="input__el" defaultChecked value={value} name={name} type="checkbox" />
      <span className="input__view">{text}</span>
    </label>
  )
}


const Rule = () => {
  return (
    <div className="rule">
      <h6 className="rule__title">寄托小群规</h6>
      <p className="rule__term">1、禁止任在群内各种广告“各类无关二维码，拉群，链接，名片，小程序，助力，诱导加微信等”，违反会被T群，拉黑。</p>
      <p className="rule__term">2、进群后请按群欢迎语尽快修改群内昵称；</p>
    </div>
  )
}


function Group () {
  const [data, setData] = useState(null)
  const [formdata, setFormdata] = useState({})
  const [isPending, setIsPending] = useState(false)
  const history = useHistory()
  function onChange (groups) {
    console.log(formdata)
    setFormdata({ ...formdata, info: { groups } })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    history.push('/success')
    setIsPending(!isPending)
    setTimeout(() => {
      setIsPending(false)
    }, 1000)
    return
    axios.post('/form/submit', {
      ...formdata
    }, { headers: { authorization: '58b5cc72ae86e1b28c632fd4f9b4759f' } })
    .then(({ data: { message, code } }) => {
        if (code === 200) {
          history.replace('/group')
        } else {
          alert(message)
        }
      })
  }

  useEffect(async () => {
    const { code, data } = await fetchGroupList()
    if (code === 200) { 
      setData(data)
      setFormdata({ info: data.info, token: data.token })
    } else {
      // 未填表进入时，叫用户滚去填表
      history.replace('/');
    }
  }, [])

  return (
    data ?
    (
      <DefaultLayout>
        <pre>{JSON.stringify(formdata, null, 2)}</pre>
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
          <GroupPicker onChange={onChange} field='group' groups={data.groupList} />
        </Wrap>

        <Rule />
        <Field>
          <Checkbox name="policy" text={(
            <span className="policy">我已认真阅读并同意<i className="hl">《寄托小群规》</i></span>
          )} />
        </Field>
        <MotionButton onClick={onSubmit} pending={isPending} type="button" primary>提交</MotionButton>
        <QRCode
          image={data.wechatQrcode}
          desc1={<Desc>填表后扫码添加<span className="wechat">【葱哥的助手】</span></Desc>}
          desc2="点击葱哥发给你的“进群入口”链接，扫码进群。"
        ></QRCode>
      </DefaultLayout>
    ) : <LoadingScreen /> )
}

export default Group
