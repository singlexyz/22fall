import React, { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Flex, FlexItem } from '../view/Flex'
import './Radio.scss'

function Radio ({ value, values, onChange, field }) {
  return (
    <RadioGroup as={Flex} className="Radio" value={value} onChange={(value) => onChange(field, value)}>
      {
      values.map(({ value, name }) => (
        <RadioGroup.Option key={value} className="Radio__wrap" as={FlexItem} value={value}>
            {({ checked }) => (
              <span className={`Radio__option ${ checked ? 'Radio__option--checked' : '' }`}>
                {name}
              </span>
            )}
        </RadioGroup.Option>
      ))
      }
    </RadioGroup>
  )
}

export default Radio
