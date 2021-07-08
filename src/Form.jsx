import React, { useState } from 'react'
import { motion, AnimateSharedLayout } from 'framer-motion'
import AdaSelect from './components/AdaSelect'
import Select from './components/Select'
import Radio from './components/Radio'
import MotionButton from './components/MotionButton'
import './Form.scss'
import DefaultLayout from './layout/DefaultLayout'
import { useHistory } from 'react-router-dom'
import { submitFromDetails } from './api'

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
  const [isPending, setIsPending] = useState(false)
  const history = useHistory()

  const [formdata, setFormdata] = useState(info)

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsPending(true)
    try {
      const { message, code } = await submitFromDetails({ info: formdata, token })
      if (code === 200) {
        history.replace('/group')
      } else {
        alert(message)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsPending(false)
    }
  }

  const onChange = (key, value) => setFormdata({ ...formdata, [key]: value })

  return (
    <DefaultLayout>
      <motion.form className="form" onSubmit={(e) => onSubmit(e)}>
        <Header onClick={() => history.push('/feedback')} />
        <AnimateSharedLayout>
          {
            fields.map(({ type, field, title, placeholder, choices }, _index) => {
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
                        <Radio field={field} onChange={onChange} value={formdata[field]} other={field + '_other'} values={choices} />
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
        <MotionButton onClick={onSubmit} pending={isPending} type="button" primary>下一步</MotionButton>
      </motion.form>
    </DefaultLayout>
  )
}

export default Form
