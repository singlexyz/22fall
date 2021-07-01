import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { faWeixin } from '@fortawesome/free-brands-svg-icons'

const Code = styled.div`
  border-radius: 5px;
  box-shadow: 0px 3px 5px 0 rgba(72, 96, 254, 0.09);
  border: solid 1px rgba(72, 96, 254, .2);
  background-color: #ffffff;
  margin: ${() => 40 / 16}rem auto ${() => 1 / 16}rem;
  width: 11.375rem;
  padding: 8px;
  img {
    width: 100%; height: 100%;
    aspect-ratio: 1;
  }
`

const Wrap = styled.div`
  text-align: center;
`

const Desc = styled.div`
  margin-bottom: ${() => 20 / 16}rem;
`

const Desc1 = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-top: .75em;
  .icon { color: #26d79f; margin-right: .35em; }
`

const Desc2 = styled.p`
  font-size: ${() => 12/16}rem;
  margin-top: .25em;
  color: #999;
`


function QRCode ({ image, desc1, desc2 }) {
  return (
    <Wrap>
      <Code>
        <img src={image} />
      </Code>
      <Desc>
        <Desc1>
          <FontAwesomeIcon className="icon" icon={faWeixin}></FontAwesomeIcon>
          {desc1}
        </Desc1>
        { desc2 && <Desc2>{desc2}</Desc2> }
      </Desc>
    </Wrap>
  )
}

export default QRCode
