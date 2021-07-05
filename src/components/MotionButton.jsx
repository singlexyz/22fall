import React, { useState } from 'react'
import Button from './Button'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import styled from 'styled-components'
import Spinner from '../view/Spinner'

const MotionIcon = styled(motion.span)`
  display: inline-block; margin-left: .35em;
`

const StyledButton = styled(Button)`
  &[disabled] { opacity: 0.5; }
`

function MotionButton ({ children, pending, ...rest }) {
  return (
    <StyledButton disabled={pending} {...rest}>
      <AnimateSharedLayout>
      <motion.span style={{ display: 'inline-block' }} layout>{children}</motion.span>
      <AnimatePresence>
        { pending && (
          <MotionIcon 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            ><Spinner /></MotionIcon>
        )}
      </AnimatePresence>
      </AnimateSharedLayout>
    </StyledButton>
  )
}

export default MotionButton
