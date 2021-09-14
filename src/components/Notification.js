import React, { useState } from 'react';
import styles from './notifications.module.css'
import {Animated} from "react-animated-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';

function Notification(props) {
  const [display, setDisplay] = useState(true)

  if (display === true) {
    setTimeout(() => {
      setDisplay(false)
      setTimeout(() => {
        setDisplay(null)
      }, 1000)
    }, 5000)
  }

  if (display === null) {
    return (
      null
    )
  }
  return (
    <div className={styles['notfication-box']}>
      <Animated 
        animateOnMount={display}
        animationIn='fadeInLeft'
        animationOut='fadeOutRight'
        isVisible={display}
      >
        <div className={styles['notification']}>
          <span className={styles.message}>{props.message}</span>
          <motion.div
            className={styles.close}
            whileHover={{ 
              scale: 1.1,
              cursor: 'pointer'
            }}
            whileTap={{ scale: 0.8 }}
            onClick={() => {
              setDisplay(false)
              setTimeout(() => {
                setDisplay(null)
              }, 1000)
            }}
          >
            <FontAwesomeIcon 
              icon={faTimes}
              size={'lg'}
            >
            </FontAwesomeIcon>
          </motion.div>
          <div className={styles['loading']} />
        </div>
      </Animated>
    </div>
  )
}

export default Notification;