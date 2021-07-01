import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  margin: -3px;
  flex-flow: row wrap;
  justify-content: flex-start;
`

const FlexItem = styled.div`
  margin: 3px;
`

const FlexGrow = styled.div`
  margin: 3px;
  flex-grow: 1;
`

export { Flex, FlexItem, FlexGrow }
