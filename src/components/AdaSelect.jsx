import React, { useState, useEffect, useMemo } from 'react'
import { Listbox } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Flex, FlexGrow } from '../view/Flex'
import { motion, AnimatePresence } from 'framer-motion'
import './AdaSelect.scss'

function AdaSelect({ value, values, onChange, field }) {
  const [firstValue, setFirstValue] = useState()
  const [secondValue, setSecondValue] = useState()
  const [first, setFirst] = useState()
  const [second, setSecond] = useState()

  function updateValues () {
    const fv = values.find(item => { if (item.value === value.substr(0, 1)) { return item } }) || {}
    setFirstValue(fv)
    setSecondValue( value.includes('.') ? values.find(item => item.value === value) : {} )
    setFirst( values.filter(({ value }) => (!value.includes('.'))) )
    setSecond(
      fv.value ?
      values.filter(v => v.value.search(fv.value) === 0 && v.value !== fv.value)
      : []
    )
  }

  useMemo(() => {
    updateValues()
  }, [value])

  const Selector = ({ prefix, value, options }) => {
    const wrap = { }
    const modal = { 
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          ease: 'linear',
          duration: 0.1
        }
      },
      exit: {
        opacity: 0,
        transition: {
          ease: 'linear',
          duration: 0.1
        }
      }
    }
    const ul = { 
      initial: { y: '100%' },
      animate: {
        y: '0%',
        transition: { delay: 0.05, ease: [.4, 0, .2, 1], staggerChildren: .05 }
      },
      exit: {
        y: '100%',
        transition: { ease: [.4, 0, .2, 1], staggerChildren: .05, staggerDirection: -1 }
      }
    }
    const div = {
      initial: { opacity: 0, y: '100%' },
      animate: {
        opacity: 1, y: '0%',
        transition: { ease: [.4, 0, .2, 1] }
      },
      exit: { opacity: 0, y: '100%' }
    }
    const isDisabled = options.length === 0
    return <Listbox as="div" disabled={isDisabled} className={`AdaSelect ${isDisabled ? 'AdaSelect--disabled' : ''}`} value={value} onChange={({ value }) => onChange(field, value)}>
      {({ open }) => (
        <>
          <Listbox.Button className={ `AdaSelect__trigger ${open ? 'AdaSelect__trigger--open' : ''}` }>
            {value.name ? value.name : '请选择'}
            <FontAwesomeIcon className="Select__trigger-icon" icon={open ? faChevronUp : faChevronDown}></FontAwesomeIcon>
          </Listbox.Button>
          <AnimatePresence exitBeforeEnter>
          {
            open && <Listbox.Options 
              static
              variants={wrap} 
              initial="initial" animate="animate" exit="exit"
              key={prefix + '-wrap'} as={motion.div} className="AdaSelect__wrap">
              <Listbox.Button
                as={motion.div}
                variants={modal}
                key={prefix + '-modal'}
                className="AdaSelect__modal" />
              <motion.ul
                variants={ul}
                key={prefix + '-options'}
                transition={{ ease: [ 0.8, 0, 0, 1 ], duration: .3, delay: 0.03 }}
                className="AdaSelect__options">
                { options && options.map((item) => (
                  <Listbox.Option as={React.Fragment} key={item.value} value={item}>
                    {({ active, selected }) => ( 
                      <li
                        className={ `AdaSelect__option ${active ? 'AdaSelect__option--active' : ''} ${selected ? 'AdaSelect__option--selected' : ''}` }>
                        <motion.div
                          variants={div}>
                          {selected && <FontAwesomeIcon className="icon" icon={faCheck} />}
                          {item.name}
                        </motion.div>
                      </li>
                    )}
                  </Listbox.Option>
                ))}
                <Listbox.Button className="AdaSelect__option AdaSelect__option--close" as="li">取消</Listbox.Button>
              </motion.ul>
            </Listbox.Options>
          }
          </AnimatePresence>
        </>
      )}
    </Listbox>
  }

  return (
    <Flex>
      <FlexGrow style={{ padding: 3, width: '50%', margin: 0 } }>
        <Selector prefix="first" options={first} value={firstValue} />
      </FlexGrow>
      <FlexGrow style={{ padding: 3, width: '50%', margin: 0 } }>
        <Selector prefix="second" options={second} value={secondValue} />
      </FlexGrow>
    </Flex>
  )
}

export default AdaSelect
