import React from 'react'
import { motion, MotionConfig } from 'framer-motion'
import styled from 'styled-components'

const Wrap = styled(motion.div)`
  overflow: hidden;
`

const Page = styled(Wrap)`
  min-height: 100vh;
`

function PageTransition ({ children }) {
  return (
    <MotionConfig transition={{ ease: [.4, 0, .2, 1], duration: .5 }} >
    <Page>
      <Wrap initial={{ y: '100% '}} animate={{ y: '0% '}} exit={{ y: '-100% '}}>
        <Wrap initial={{ y: '-90% '}} animate={{ y: '0% '}} exit={{ y: '90% '}}>
        {children}
        </Wrap>
      </Wrap>
    </Page>
    </MotionConfig>
  )
}

export default PageTransition
