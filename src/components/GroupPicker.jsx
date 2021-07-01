import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RadioGroup, Switch } from '@headlessui/react'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import Button from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
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

const Footer = styled.div`
  flex-shrink: 0;
  padding: 0 15px;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 -5px 10px rgba(0,0,0,.05);
`

const Trigger = styled.button`

`

const Cate = styled.ul`
  background-color: #f5f5f5;
  border-right: 1px solid #e1e1e1;
  list-style: none;
`

const CateItem = styled.li`
  font-size: .875em;
  padding: 15px 20px;
  width: 120px;
  cursor: pointer;
  border: 1px solid transparent;
  border-width: 1px 0;
  position: relative;
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
  padding: 20px 16px 0 24px;
  flex-grow: 1;
  list-style: none;
  overflow-x: hidden;
  overflow-y: auto;
`

const GroupItem = styled.li`
  padding: 20px 15px;
  border-radius: 10px;
  font-size: .875em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px solid #e1e1e1;
  .icon {
    position: absolute;
    right: 0; bottom: 2px;
    z-index: 10;
    color: white;
    width: 10px;
  }
  &::after {
    content: ""; background-color: #e6e6e6;
    transform-origin: left bottom;
    transform: rotate(45deg);
    position: absolute;
    width: 28px; height: 100px; 
    right: 0; bottom: 0;
  }
  &.checked {
    color: white; background-color: #4a66fa;
    margin: 1px;
    border: 0;
    &::after { background-color: currentColor; }
    .icon { color: #4a66fa; }
  }
  & + & { margin-top: 10px; }
`

const GroupSelected = styled.i`
  color: red;
`


function GroupPicker ({ data, field, onChange }) {
  const [state, setState] = useState(data)
  const [cate, setCate] = useState(state[0].id)
  const [group, setGroup] = useState(getGroup())
  const [isOpen, setIsOpen] = useState(true)

  const onSubmit = () => {

  }

  function getGroup () {
    return state.filter(({id}) => { return (id === cate) })[0]['children']
  }

  function selectGroup (groupid) {
    state[cate].children.map((g) => {
      if (g.id === groupid) {
        return { ...g, checked: !g.checked }
      }
      return g
    })
  }

  useEffect(() => {
    setGroup(getGroup())
  }, [cate])

  return (
    <motion.div>
      <Trigger type="button" onClick={() => setIsOpen(true)}>爸爸快来点我</Trigger>
      {
        isOpen && (
        <Container>
          <Layout>
            <Selector>
              <AnimateSharedLayout>
                <Cate>
                  <RadioGroup value={cate} onChange={setCate}>
                    {
                    data.map(({ name, id }) => (
                      <RadioGroup.Option key={id} as={React.Fragment} value={id}>
                        {({ checked }) => (
                          <CateItem>
                            { checked && <CateSelected transtion={{ duration: .2 }} layoutId={`cate-selected`} /> }
                            <span style={{ position: 'relative', zIndex: 10 }}>{name}</span>
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
                  group && group.map(({ name, checked, id }) => (
                    <GroupItem className={`checked`} onClick={() => selectGroup(id)}>
                      {name} {id}
                      <FontAwesomeIcon className="icon" icon={faCheck} />
                    </GroupItem>
                  ))
                }
              </Group>
            </Selector>
            <Footer>
              <Button stroke onClick={() => setIsOpen(false)}>返回</Button>
              <Button primary onClick={onSubmit}>确定</Button>
            </Footer>
          </Layout>
        </Container>
        )
      }
    </motion.div>
  )
}

export default GroupPicker
