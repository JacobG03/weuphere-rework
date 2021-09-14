import React, { useState } from 'react';
import styles from './notifications.module.css'
import {Animated} from "react-animated-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'


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
          <span>{props.message}</span>
          <div className={styles['loading']} />
        </div>
      </Animated>
    </div>
  )
}

export default Notification;