import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const StyledIcon = styled(FontAwesomeIcon)`
  animation: spin .5s linear infinite;
  @keyframes spin {
    from { transform: rotate(0deg) }
    to { transform: rotate(-360deg) }
  }
`

function Spinner ({ size }) {
  return (
    <StyledIcon className="icon" size={size} icon={faCircleNotch} />
  )
}

export default Spinner
