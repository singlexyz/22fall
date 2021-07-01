import React, { useState } from 'react'
import { motion } from 'framer-motion'

import Select from './components/Select'
import Radio from './components/Radio'
import GroupPicker from './components/GroupPicker'
import { Flex, FlexGrow } from './view/Flex'
import axios from 'axios'
import './Form.scss'

function Header() {
  return (
    <header className="form__header">
      <h1 className="form__title">寄托天下22fall申请交流群</h1>
      <p className="form__subtitle">请认真填写，葱哥会按照你填写的信息匹配相应的群</p>
    </header>
  )
}

function Rule() {
  return (
    <div className="rule">
      <h6 className="rule__title">寄托小群规</h6>
      <p className="rule__term">1、禁止任在群内各种广告“各类无关二维码，拉群，链接，名片，小程序，助力，诱导加微信等”，违反会被T群，拉黑。</p>
      <p className="rule__term">2、进群后请按群欢迎语尽快修改群内昵称；</p>
    </div>
  )
}

function Field({ children, title }) {
  return (
    <div className="field">
      {title && <p className="field__title">{title}</p>}
      {children}
    </div>
  )
}

function Checkbox ({ text, value, name, checked }) {
  return (
    <label className="input__checkbox">
      <input className="input__el" value={value} name={name} type="checkbox" />
      <span className="input__view">{text}</span>
    </label>
  )
}

function Form({ data }) {
  const { info, fields, token } = data.data

  const [formdata, setFormdata] = useState(info)

  const onSubmit = (e) => {
    e.preventDefault()
    axios.post('/form/submit', { info: formdata, token })
  }

  const onChange = (key, value)  => setFormdata({ ...formdata, [key]: value })

  console.log(fields)

  return (
    <form className="form" onSubmit={(e) => onSubmit(e)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [.4, 0, .2, 1], duration: .4 }}
        >
      <Header />

      <pre>{JSON.stringify(formdata, null, 2)}</pre>

        {
        fields.map(({ type, field, title, displayorder, placeholder, choices }) => {
          {
            switch (type) {
            case 'text':
            return (
              <Field key={field} title={displayorder + '、' + title}>
                <input value={formdata[field]} onInput={(e) => onChange(field, e.target.value)} placeholder={placeholder} type="text" className="input__text" />
              </Field>
            )
            case 'radio':
            return (
              <Field key={field} title={displayorder + '、' + title}>
                <Radio field={field} onChange={onChange} value={formdata[field]} values={choices} />
              </Field>
            )
            case 'select':
            return (
              <Field key={field} title={displayorder + '、' + title}>
                <Flex><FlexGrow>
                  <Select onChange={onChange} field={field} value={formdata[field]} values={choices}></Select>
                </FlexGrow></Flex>
              </Field>
            )
            case 'multipleselectgroup':
            return (
              <Field key={field} field={field} title={displayorder + '、' + title}>
                <GroupPicker data={choices} onChange={onChange} />
              </Field>
            )
            default:
            return (
              <Field key={field} field={field} title={displayorder + '、' + title}>
                <h1>这种类型类型你哥我还没有做。</h1>
              </Field>
            )
            }
          }
        })
        }
      <Rule />

      <Field>
        <Checkbox name="policy" text={(
          <span className="policy">我已认真阅读并同意<i className="hl">《寄托小群规》</i></span>
        )} value={1} />
      </Field>

      <button type="submit" className="button--full button--primary">提交</button>
      </motion.div>
    </form>
  )
} 

export default Form
