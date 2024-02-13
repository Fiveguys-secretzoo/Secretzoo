import react, { useEffect, useState } from 'react'
import { motion, useDragControls, AnimatePresence } from "framer-motion"
import { useSelector } from 'react-redux'

const Test = () => {
  const controls = useDragControls()
  const startDrag = (event) => {
    controls.start(event)
  }

  return (
    <>
      <div onPointerDown={startDrag}>

        <AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img src={require('../assets/img/card/00/000.png')} alt="" style={{ width: 180 }} />

          </motion.div>
        </AnimatePresence>
        <motion.div drag="x" dragControls={controls}>
        </motion.div>
      </div>
    </>
  )
}

export default Test;