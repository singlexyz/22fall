import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { RadioGroup, Switch } from '@headlessui/react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons'

const Container = styled(motion.div)`
  min-height: 100vh;
  width: 100%; height: 100%;
  left: 0; top: 0;
  background-color: white;
  position: fixed; width: 100%;
  z-index: 10086;
`

const Layout = styled.div`
  max-width: 480px;
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  height: 100%;
`
const Selector = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-flow: row nowrap;
  height: calc(100% - 60px);
`

const Footer = styled(motion.div)`
  flex-shrink: 0;
  padding: 0 15px;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 -5px 10px rgba(0,0,0,.05);
  .highlight { color: #4860fe; font-weight: bold; font-style: normal; }
  .button {
    width: 80px;
    & + .button { margin-left: 10px; }
  }
`

const Trigger = styled.button`

`

const Cate = styled.ul`
  background-color: #f5f5f5;
  border-right: 1px solid #e1e1e1;
  list-style: none;
  margin-top: -2px;
`

const CateItem = styled(motion.li)`
  font-size: .875em;
  padding: 15px 20px;
  width: 180px;
  cursor: pointer;
  border: 1px solid transparent;
  border-width: 1px 0;
  position: relative;
  user-select: none;
  .count {
    color: white; background-color: #4b63fa;
    width: 1.2em; height: 1.2em;
    line-height: 1.2em;
    right: .5em;
    top: 50%;
    transform: translatey(-50%);
    position: absolute;
    border-radius: 50%;
    text-align: center;

  }
  &:focus { outline: none; }
`

const CateSelected = styled(motion.i)`
  position: absolute;
  background-color: white;
  left: 0; top: 0; right: 0; bottom: 0;
  margin-right: -1px;
  border: 1px solid #e1e1e1;
  border-width: 1px 0;
`

const Group = styled.ul`
  padding: 20px 16px 20px 24px;
  flex-grow: 1;
  list-style: none;
  overflow-x: hidden;
  overflow-y: auto;
`

const GroupItem = styled.li`
  user-select: none;
  border-radius: 10px;
  border: 1px solid #e1e1e1;
  position: relative;
  padding: 20px 15px;
  font-size: .875em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &::after {
    content: ""; background-color: #e6e6e6;
    transform-origin: left bottom;
    transform: rotate(45deg);
    position: absolute;
    width: 28px; height: 100px; 
    right: 0; bottom: 0;
  }
  .icon {
    position: absolute;
    right: 0; bottom: 2px;
    z-index: 10;
    color: white;
    width: 10px;
  }
  & + & { margin-top: 10px; }
  &.disabled { opacity: 0.5; cursor: not-allowed; }
  &.checked {
    cursor: pointer; opacity: 1;
    color: white; background-color: #4a66fa;
    border-color: white;
    &::after { background-color: currentColor; }
    .icon { color: #4a66fa; }
  }
`

const Limit = styled.span`
  font-size: .75rem;
  flex: 1 0 auto;
  color: #666;
`

function GroupPicker ({ data, field, onChange }) {
  const [state, setState] = useState(data)
  const [currentCate, setCurrentCate] = useState(state[0].id)
  const [isOpen, setIsOpen] = useState(false)

  // 选择群数量总计
  const [totalSelectedCount, setTotalSelectedCount] = useState(0)

  // 分类下选择群总计
  const [eachSelectedCount, setEachSelectedCount] = useState(state.map(() => ([])))

  // 选择的群id
  const [selectedGroup, setSelectedGroup] = useState([])

  // 到达上限
  const selectedMax = 3;
  const updateTotalSelectedCount = () => {
    setTotalSelectedCount(
      eachSelectedCount.reduce((a,b) => {
        return a + b
      }, 0)
    )
  }

  const updateEachSelectedCount = () => {
    setEachSelectedCount(
      state.map(v => {
        const count = v.children.reduce((a, b) => {
          if (b.checked) { return ++a }
          return a
        }, 0)
        return count
      })
    )
  }

  const updateSelectedGroup = () => {
    setSelectedGroup(
      state.reduce((a,b) => {
        return [ ...a, ...b.children.filter(({ checked, id }) => {
          if (checked) { return id }
        }).map(({ id }) => id)]
      }, [])
    )
  }

  const selectedLimit = totalSelectedCount >= selectedMax;

  useEffect(() => {
    updateTotalSelectedCount()
  }, [eachSelectedCount])

  useEffect(() => {
    updateSelectedGroup()
  }, [state])

  useEffect(() => {
    updateEachSelectedCount()
  }, [state])

  const onSubmit = () => {
    onChange(field, selectedGroup)
    setIsOpen(false)
  }

  function selectGroup (cateid, groupid, checked) {
    if (selectedLimit && !checked) { 
      return;
    }
    const newState = state.map(cate => {
        if (cate.id === cateid) {
          return {
             ...cate,
             children: cate.children.map((group) => {
               if (group.id === groupid) {
                 return { ...group, checked: !group.checked }
               }
               return group
             })
          }
        }
        return cate
      })
    setState(newState)
  }

  return (
    <motion.div>
      <Trigger type="button" onClick={() => setIsOpen(true)}>爸爸快来点我</Trigger>
      <AnimatePresence>
      {
        isOpen && (
        <Container
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Layout>
            <Selector>
              <AnimateSharedLayout>
                <Cate>
                  <RadioGroup value={currentCate} onChange={setCurrentCate}>
                    {
                    state.map(({ name, id }, index) => (
                      <RadioGroup.Option key={id} as={React.Fragment} value={id}>
                        {({ checked }) => (
                          <CateItem
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.02, ease: [.4, 0, .2, 1] }}
                          >
                            { checked && <CateSelected transtion={{ duration: .2 }} layoutId={`cate-selected`} /> }
                            <span style={{ position: 'relative', zIndex: 10 }}>{name}</span>
                            { 
                              eachSelectedCount[index] > 0 && <span className="count">
                                {eachSelectedCount[index]}
                              </span>
                            }
                          </CateItem>
                        )}
                      </RadioGroup.Option>
                    ))
                    }
                  </RadioGroup>
                </Cate>
              </AnimateSharedLayout>
              <Group>
                { 
                  state.filter(({id}) => id === currentCate)[0].children.map(({ name, checked, id, cid }, index) => (
                    <GroupItem
                      key={id}
                      className={`${selectedLimit ? 'disabled' : ''} ${checked ? 'checked' : ''}`}
                      onClick={() => selectGroup(cid, id, checked)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * .02, ease: [.4, 0, .2, 1] }}
                    >
                      {name} {id}
                      <FontAwesomeIcon className="icon" icon={faCheck} />
                    </GroupItem>
                  ))
                }
              </Group>
            </Selector>
            <Footer
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '100%' }}
                transition={{ ease: [.4, 0, .2, 1 ]}}
            >
              <Limit>限进 3 个群，已选 <i className="highlight">{totalSelectedCount}</i> 个</Limit>
              <Button className="button" onClick={() => setIsOpen(false)}>返回</Button>
              <Button className="button" primary onClick={onSubmit}>确定</Button>
            </Footer>
          </Layout>
        </Container>
        )
      }
      </AnimatePresence>
    </motion.div>
  )
}

export default GroupPicker