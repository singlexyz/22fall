import React from 'react'
import styled from 'styled-components'

import defaultBanner from '../images/banner.png'

const Aspect = styled.div`
  padding-top: 50.66666666666667%;
  position: relative;
  @supports (aspect-ratio: 1) {
    aspect-ratio: 750 / 380;
    padding-top: 0;
  }
`

const Image = styled.img`
  position: absolute;
  left: 0; top: 0;
  @supports (aspect-ratio: 1) {
    position: static;
  }
`

function Banner({ image = defaultBanner }) {
  return (
      <Aspect>
        <Image src={image} />
      </Aspect>
  )
}

export default Banner
