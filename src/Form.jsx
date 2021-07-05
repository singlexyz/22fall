import React, { useState, useContext } from 'react'
import { motion, AnimatePresence,AnimateSharedLayout } from 'framer-motion'
import AdaSelect from './components/AdaSelect'
import Select from './components/Select'
import Radio from './components/Radio'
import Button from './components/Button'
import axios from 'axios'
import './Form.scss'
import DefaultLayout from './layout/DefaultLayout'
import { useHistory } from 'react-router-dom'

const Header = () => {
  return (
    <header className="form__header">
      <h1 className="form__title">寄托天下22fall申请交流群</h1>
      <p className="form__subtitle">请认真填写，葱哥会按照你填写的信息匹配相应的群</p>
    </header>
  )
}

const Field = ({ children, title }) => {
  return (
    <div className="field">
      {title && <p className="field__title">{title}</p>}
       {children}
    </div>
  )
}

function Form({ data }) {
  const { info, fields, token } = data
  const history = useHistory()

  const [formdata, setFormdata] = useState(info)

  const onSubmit = (e) => {
    e.preventDefault()
    axios.post('/form/submit', {
      info: formdata, token
    }, {
      headers: { authorization: '58b5cc72ae86e1b28c632fd4f9b4759f' } 
    }).then(({ data: { message, code } }) => {
      if (code === 200) {
        history.replace('/group')
      } else {
        alert(message)
      }
    })
  }

  const onChange = (key, value) => setFormdata({ ...formdata, [key]: value })

  return (
    <DefaultLayout>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <Header onClick={() => history.push('/feedback')} />
        <pre>{JSON.stringify(formdata, null, 2)}</pre>
        <AnimateSharedLayout>
          {
          fields.map(({ type, field, title, placeholder, choices }, index) => {
            {
              switch (type) {
              case 'text':
              return (
                <Field key={field} title={title}>
                  <input
                    value={formdata[field]}
                    onInput={(e) => onChange(field, e.target.value)}
                    placeholder={placeholder} type="text" className="input__text" />
                </Field>
              )
              case 'radio':
              return (
                <Field key={field} title={title}>
                  <Radio field={field} onChange={onChange} value={formdata[field]} values={choices} />
                  <AnimatePresence exitBeforeEnter>
                    {
                    formdata[field] === '*'
                      && <motion.input
                        layout
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        style={{ marginTop: '6px' }}
                        value={formdata[field + '_other'] || ''}
                        onInput={(e) => onChange(field + '_other', e.target.value)}
                        placeholder={placeholder} type="text" className="input__text" />
                    }
                  </AnimatePresence>
                </Field>
              )
              case 'select':
              return (
                <Field key={field} title={title}>
                  {
                  field === 'highesteducation' ?
                  <AdaSelect onChange={onChange} field={field} value={formdata[field]} values={choices} />
                  :
                  <Select onChange={onChange} field={field} value={formdata[field]} values={choices} />
                  }
                </Field>
              )
              }
            }
          })
          }
        </AnimateSharedLayout>
        <Button type="submit" primary>提交</Button>
      </form>
    </DefaultLayout>
  )
}

export default Form
