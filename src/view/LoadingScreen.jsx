import React from 'react'
import styled from 'styled-components'
import Spinner from './Spinner'

const Screen = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%; height: 100%;
  background-color: white;
  color: #4a66fa;
  user-select: none;
  z-index: 10086;
`

function LoadingScreen() {
  return (
    <Screen>
      <Spinner />
      <span>加载中...</span>
    </Screen>
  )
}

export default LoadingScreen
