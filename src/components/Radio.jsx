import React from 'react'
import { RadioGroup } from '@headlessui/react'
import { Flex, FlexItem } from '../view/Flex'
import './Radio.scss'

function Radio ({ value: current, values, onChange, field, other }) {
  const onInputChange = (value) => {
    onChange(other, value)
  }
  return (
    <RadioGroup as="ol" className="Radio" value={current} onChange={(value) => onChange(field, value)}>
      {
      values.map(({ value, name }) => (
        <RadioGroup.Option
          key={value}
          as="li" className={`Radio__wrap ${value === '*' ? 'Radio__other' : ''}`}
          value={value}>
          {({ checked }) => (
            <>
            <span className={`Radio__option ${ checked ? 'Radio__option--checked' : '' }`}>
              {name}
            </span>
            { 
            value === '*' && current === '*' &&
              <input
                autoFocus
                onChange={(e) => onInputChange(e.target.value)}
                className={`Radio__option--other Radio__input`} type="text"/>
            }
            </>
          )}
        </RadioGroup.Option>
      ))
      }
    </RadioGroup>
  )
}

export default Radio
