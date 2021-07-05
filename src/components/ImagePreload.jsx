import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function ImagePreload ({ children, src }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let el = new Image()
    el.addEventListener('load', () => setLoaded(true))
    el.src = src
    return () => { el = null }
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      {
      loaded ? <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: [0.4, 0, .2, 1], duration: .4 }}
        src={src} /> : children
      }
    </AnimatePresence>
  )
}

export default ImagePreload
