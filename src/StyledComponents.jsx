import styled from 'styled-components'

export const Page = styled.div`
  background-color: #4860fe;
  min-height: 100vh;
`

export const Tile = styled.div`
  background-color: white;
  border-radius: 10px;
  & + & {
    margin-top: 10px;
  }
`
