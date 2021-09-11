import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './notification.module.css'
import {Animated} from "react-animated-css";


function Notification(props) {
  const notification = props.notification
  const displayNotification = props.displayNotification

  return (
    <div className={styles['notification-box']}>
      <Animated 
        animateOnMount={false}
        animationIn='fadeInLeft' 
        animationOut='fadeOutRight' 
        animationInDuration={300}
        animationOutDuration={300}
        isVisible={notification}
      >
        <div className={styles.notification}>
          <span className={styles.message}>yo</span>
        </div>
      </Animated>
    </div>
  )
}

export default Notification;