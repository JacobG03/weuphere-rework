import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './notification.module.css'
import {Animated} from "react-animated-css";


function Notification(props) {
  const notification = props.notification
  const displayNotification = props.displayNotification

  if (notification) {
    setTimeout(() => {
      displayNotification({'display': !notification.display})
    }, 5500)    
  }

  return (
    <div className={styles['notification-box']}>
      <Animated 
        animateOnMount={false}
        animationIn='fadeInLeft' 
        animationOut='fadeOutRight' 
        animationInDuration={300}
        animationOutDuration={300}
        isVisible={notification.display}
      >
        <div className={styles.notification}>
          {notification.display ? 
          <div className={styles.timer}>

          </div>
          : null}
          <span className={styles.message}>yo</span>
        </div>
      </Animated>
    </div>
  )
}

export default Notification;