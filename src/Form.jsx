import React, { useState, useContext } from 'react'
import AdaSelect from './components/AdaSelect'
import Select from './components/Select'
import Radio from './components/Radio'
import axios from 'axios'
import './Form.scss'
import { useHistory } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'

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

function Checkbox({ text, value, name, checked }) {
  return (
    <label className="input__checkbox">
      <input className="input__el" defaultChecked value={value} name={name} type="checkbox" />
      <span className="input__view">{text}</span>
    </label>
  )
}

function Form({ data }) {
  const { info, fields, token } = data
  const [formdata, setFormdata] = useState(info)
  const onSubmit = (e) => {
    e.preventDefault()
    if (formF)
    axios.post('/form/submit', {
      info: formdata, token
    }).then(res => console.log(res))
  }

  const onChange = (key, value) => setFormdata({ ...formdata, [key]: value })

  const history = useHistory()

  return (
    <DefaultLayout>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <Header onClick={() => history.push('/feedback')} />
        {
        fields.map(({ type, field, title, placeholder, choices }, index) => {
          const displayorder = index + 1
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
                {
                formdata[field] === '*'
                  && <input style={{ marginTop: '6px' }} value={formdata[field + '_other']} onInput={(e) => onChange(field + '_other', e.target.value)} placeholder={placeholder} type="text" className="input__text" />
                }
              </Field>
            )
            case 'select':
            return (
              <Field key={field} title={displayorder + '、' + title}>
                {
                field === 'highesteducation' ?
                <AdaSelect field={field} onChange={onChange} value={formdata[field]} values={choices} /> :
                <Select onChange={onChange} field={field} value={formdata[field]} values={choices}></Select>
                }
              </Field>
            )
            // case 'hidden':
            //   return (
            //     <h1>都叫 hidden 了，怎么可能让你看见。</h1>
            //   )
            }
          }
        })
        }
        <Rule />
        <Field>
          <Checkbox name="policy" text={(
            <span className="policy">我已认真阅读并同意<i className="hl">《寄托小群规》</i></span>
          )} />
        </Field>
        <button type="submit" className="button--full button--primary">提交</button>
      </form>
    </DefaultLayout>
  )
}

export default Form
