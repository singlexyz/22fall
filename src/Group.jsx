import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import MotionButton from './components/MotionButton'
import QRCode from './view/QRCode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import GroupPicker from './components/GroupPicker'
import LoadingScreen from './view/LoadingScreen'
import PageTransition from './components/PageTransition'
import './Form.scss'
import { fetchGroupList, submitFromDetails } from './api'

const Hr = styled.hr`
  margin: 1rem 0;
  border: 0;
  border-top: 1px solid #e1e1e1;
`

const Wrap = styled.div`
  margin: 10px 0 20px;
`

const Field = ({ children, title }) => {
  return (
    <div className="field">
      {title && <p className="field__title">{title}</p>}
      {children}
    </div>
  )
}

const ShakeX = styled.span`
  @keyframes shakeX {
    from, to { transform: translatex(0); }
    10%, 30%, 50%, 70%, 90% { transform: translatex(-3px); }
    20%, 40%, 60%, 80% { transform: translatex(3px); }
  }
  ${(props) => props.animate && `animation: .5s shakeX;`}
}
`

const Checkbox = ({ text, animate, ...rest }) => {
  return (
    <label className="input__checkbox">
      <input className="input__el" {...rest} type="checkbox" />
      <ShakeX animate={animate} className="input__view">{text}</ShakeX>
    </label>
  )
}

const Rule = styled.section`
  border-radius: ${() => 20 / 16}rem;
  background-color: #F6F7FF;
  padding: 1.25rem 2.25rem 1.25rem 1.875rem;
  text-align: left;
`

const RuleTitle = styled.h6`
  text-align: center;
  margin-bottom: .625rem;
`

const RuleTerm = styled.p`
  color: #666;
  font-size: .75rem;
  line-height: 1.4;
  & + & { margin-top: .625rem; }
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

function Group() {
  const [data, setData] = useState(null)
  const [formdata, setFormdata] = useState({})
  const [isPending, setIsPending] = useState(false)
  const [jump2qr, setJump2qr] = useState(false)
  const [policyChecked, setPolicyChecked] = useState(false)
  const [policyAnimate, setPolicyAnimate] = useState(false)
  const history = useHistory()

  function onChange(group) {
    setFormdata({ ...formdata, info: { group } })
  }

  useEffect(() => {
    if (policyAnimate) {
      setTimeout(() => {
        setPolicyAnimate(false)
      }, 500)
    }
  }, [policyAnimate])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!policyChecked) {
      setPolicyAnimate(true)
      return
    }
    setIsPending(true)
    try {
      const { code, message } = await submitFromDetails({ ...formdata, token: data.token })
      if (code === 200) {
        history.push(jump2qr ? '/qr' : '/success', { fuck: true })
      } else {
        alert(message)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsPending(false)
    }
  }

  useEffect(async () => {
    const { message, code, data } = await fetchGroupList()
    if (code === 200) {
      if (data.info.group.length > 0) {
        setJump2qr(true)
        setPolicyChecked(true)
      }
      setData(data)
      setFormdata({ info: data.info })
    } else {
      history.replace('/');
    }
  }, [])

  return (
    data ?
      (
        <PageTransition>
          <DefaultLayout>
            <h6>
              <FontAwesomeIcon className="icon" icon={faAddressCard}></FontAwesomeIcon>
          微信号：{data.info.wechat}
            </h6>
            <Hr />
            <h6>
              <FontAwesomeIcon className="icon" icon={faPlusSquare}></FontAwesomeIcon>
          选择你要进入的群（进群数有限制，请按需勾选）
        </h6>
            <Wrap>
              <GroupPicker onChange={onChange} groups={data.groupList} />
            </Wrap>

            <Rule>
              <RuleTitle>寄托小群规</RuleTitle>
              <RuleTerm>禁止任在群内各种广告“各类无关二维码，拉群，链接，名片，小程序，助力，诱导加微信等”，违反会被T群，拉黑。</RuleTerm>
              <RuleTerm>进群后请按群欢迎语尽快修改群内昵称；</RuleTerm>
            </Rule>

            <Field>
              <Checkbox
                checked={policyChecked}
                animate={policyAnimate}
                onChange={(e) => setPolicyChecked(e.target.checked)}
                text={(<span className="policy">我已认真阅读并同意<i className="hl">《寄托小群规》</i></span>)} />
            </Field>

            <MotionButton disabled={!policyChecked} onClick={onSubmit} pending={isPending} type="button" primary>提交</MotionButton>

          </DefaultLayout>
        </PageTransition>
      ) : <LoadingScreen />)
}

export default Group
