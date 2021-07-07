import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RadioGroup } from '@headlessui/react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'

const Container = styled(motion.div)`
  width: 100%; height: 100vh;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  color: #666;
  cursor: pointer;
  width: 100%;
  height: 44px;
  line-height: 44px;
  align-items: center;
  padding: 0 15px;
  background-color: transparent;
  &:hover {
    border-color: #4a66fa;
    color: #4a66fa;
  }
  .icon { margin-left: auto; }
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
  width: 125px;
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
  &.checked {
    cursor: pointer; opacity: 1;
    color: white; background-color: #4a66fa;
    border-color: white;
    &::after { background-color: currentColor; }
    .icon { color: #4a66fa; }
  }
  &.disabled { opacity: 0.5; cursor: not-allowed; }
  &.disabled2 { opacity: 0.5; cursor: not-allowed; }
  &.limited:not(.checked) { opacity: 0.5; cursor: not-allowed; }
`

const Limit = styled.span`
  font-size: .75rem;
  flex: 1 0 auto;
  color: #666;
`

const SelectedGroupList = styled.ul`
  list-style: none;
`

const SelectedGroupItem = styled.li`
  height: 44px; line-height: 44px; margin: 10px 0; padding: 0 15px;
  border-radius: 4px; background-color: #f7f7f7; display: flex;
  .button { color: #666; cursor: pointer; background-color: transparent; margin-left: auto; width: 44px; border: 0; }
  .icon { margin-right: 0; }
  &[disabled] {
    opacity: .6;
    .button { cursor: not-allowed; }
  }
`


function GroupPicker ({ groups, onChange }) {
  const filterGroups = groups.filter(({ children }) => children.length > 0)
  const [state, setState] = useState(updatedCount(filterGroups))
  const [cateId, setCateId] = useState(state[0].id)
  const [cate, setCate] = useState(state[0])
  const [isOpen, setIsOpen] = useState(false)

  // 分类下添加已选数量及限制
  function updatedCount (groups) {
    return groups.map(group => {
      const count = group.children.reduce((a,b) => b.checked ? ++a : a, 0)
      return { 
        ...group,
        count, 
        limit: group.restrict > 0 && count >= group.restrict
      }
    })
  }

  // 选择的群id
  const [selectedGroup, setSelectedGroup] = useState([])

  const updateSelectedGroup = () => {
    setSelectedGroup(
      state.reduce((a,b) => {
        return [ ...a, ...b.children.filter(({ checked }) => {
          if (checked) { return true }
        }).map(({ id, name, cid, disabled }) => ({ disabled, cid, name, id}))]
      }, [])
    )
  }

  useEffect(() => {
    onChange(selectedGroup.map(({id}) => id));
  }, [selectedGroup])

  useEffect(() => {
    updateSelectedGroup()
    setCate(state.find(v => v.id === cateId))
  }, [state])

  useEffect(() => {
    setCate(state.find(v => v.id === cateId))
  }, [cateId])

  const selectGroup = (cateid, groupid, disabled, checked, disabled2) => {
    if ((cate.limit && !checked) || disabled || disabled2) { 
      return;
    }
    const newState = state.map(cate => {
      if (cate.id === cateid) {
        return {
          ...cate,
          children: cate.children.map((group) => {
            return { ...group, checked: group.id === groupid ? !group.checked : group.checked }
          })
        }
      }
      return cate
    }) 
    setState(updatedCount(newState))
  }

  const removeSelectedGroup = (cid, id, disabled, checked) => {
    if (disabled) { return }
    selectGroup(cid, id, disabled, checked)
  }

  useEffect(() => {
    window.scrollTo(0,0)
    document.body.classList[isOpen ? 'add' : 'remove']('overflow-hidden')
  }, [isOpen])

  return (
    <motion.div>
      <Trigger type="button" onClick={() => setIsOpen(true)}>
        请选择
        <FontAwesomeIcon className="icon" icon={faChevronRight} />
      </Trigger>
      {
        selectedGroup.length > 0 && <SelectedGroupList>
        {
          selectedGroup.map(({ name, cid, id, disabled, checked }) => (
            <SelectedGroupItem disabled={disabled} key={id}>
              {name}
              <button className="button" onClick={() => removeSelectedGroup(cid, id, disabled, checked)}>
                <FontAwesomeIcon className="icon" icon={faTrashAlt} />
              </button>
            </SelectedGroupItem>
          ))
        }
        </SelectedGroupList>
      }
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
                  <RadioGroup value={cateId} onChange={setCateId}>
                    {
                    state.map(({ name, count, id, children }, index) => (
                      children.length > 0 && <RadioGroup.Option key={id} as={React.Fragment} value={id}>
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
                              count > 0 && <span className="count"> {count} </span>
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
                  cate.children.map(({ name, checked, id, cid, disabled, disabled2 }, index) => (
                    <GroupItem
                      key={id}
                      className={`${cate.limit ? 'limited' : ''} ${disabled || disabled2 ? 'disabled' : ''} ${checked ? 'checked' : ''}`}
                      onClick={() => selectGroup(cid, id, disabled, checked, disabled2)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * .02, ease: [.4, 0, .2, 1] }}
                    >
                      {name}
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
              <Limit>
                {
                  cate.restrict > 0 && `限进 ${cate.restrict} 个群，`
                }
                已选 <i className="highlight">{cate.count}</i> 个</Limit>
              <Button type="button" className="button" onClick={() => setIsOpen(false)}>返回</Button>
              <Button type="button" className="button" primary onClick={() => setIsOpen(false)}>确定</Button>
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
