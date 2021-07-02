import React, { useState, useEffect } from 'react'
import { Listbox } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Flex, FlexGrow } from '../view/Flex'
import './AdaSelect.scss'

function Select({ container, value, values, onChange, field }) {
  // 首层学历，第二层选项随首层值改变
  const [first, setFirst] = useState(values.filter(({ value }) => (!value.includes('.'))))
  const [second, setSecont] = useState([])

  const [firstValue, setFirstValue] = useState('')
  const [secondValue, setSecondValue] = useState('')

  useEffect(() => {
    console.log(firstValue)
  }, [firstValue])

  console.log(firstValue)
  return (
    <Flex>
      <FlexGrow>
        <Listbox as="div" className={`AdaSelect`} value={firstValue} onChange={(value) => setFirstValue(value)}>
          <Listbox.Button className="AdaSelect__trigger">
            {firstValue ? firstValue : '请选择'}
            <FontAwesomeIcon className="Select__trigger-icon" icon={faChevronDown}></FontAwesomeIcon>
          </Listbox.Button>
          <Listbox.Options as="ul" className="AdaSelect__options">
            {first.map(({ value, name }) => (
              <Listbox.Option as={React.Fragment} key={value} value={value}>
                {({ selected }) => ( 
                  <li className="AdaSelect__option">
                    {selected && <FontAwesomeIcon className="icon" icon={faCheck} />}
                    {name}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox> 
      </FlexGrow>
      {
      // <FlexGrow>
      // <Listbox as="div" className={`AdaSelect`} value={secondValue} onChange={(value) => setSecondValue(value)}>
      // <Listbox.Button className="AdaSelect__trigger">
      // {secondValue ? second.filter((v) => v.value === value)[0]['name'] : '请选择'}
      // <FontAwesomeIcon className="Select__trigger-icon" icon={faChevronDown}></FontAwesomeIcon>
      // </Listbox.Button>
      // <Listbox.Options as="ul" className="AdaSelect__options">
      // {first.map(({ value, name }) => (
      // <Listbox.Option as={React.Fragment} key={value} value={value}>
      // {({ selected }) => ( 
      // <li className="AdaSelect__option">
      // {selected && <FontAwesomeIcon className="icon" icon={faCheck} />}
      // {name}
      // </li>
      // )}
      // </Listbox.Option>
      // ))}
      // </Listbox.Options>
      // </Listbox>
      // </FlexGrow>
      }
    </Flex>
  )
}

export default Select
