import React from 'react'
import Banner from '../components/Banner'
import styled from 'styled-components'

const Content = styled.div`
  position: relative;
  background-color: white;
  z-index: 10;
  border-radius: 1.875rem 1.875rem 0 0;
  margin-top: -1.875rem;
  padding: 1.875rem 1.5625rem 1.875rem;
`

const Page = styled.div`
  max-width: 480px; 
  min-height: 100vh; background-color: white;
  margin: 0 auto;
  font-size: ${() => 14 / 16}rem;
`

function DefaultLayout ({ children }) {
  return (
    <Page>
      <Banner />
      <Content>
        {children}
      </Content>
    </Page>
  )
}

export default DefaultLayout

