import React, { useState, useEffect } from 'react'
import { motion, MotionConfig, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'

const Wrap = styled(motion.div)`
  overflow: hidden;
`

function ImagePreload ({ children, src }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let el = new Image()
    el.addEventListener('load', () => setLoaded(true))
    el.src = src
    return () => { el = null }
  }, [])

  return (
    <AnimatePresence>
      {
      loaded ? (
        <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={src} />
      ) : children
      }
    </AnimatePresence>
  )
}

export default ImagePreload
