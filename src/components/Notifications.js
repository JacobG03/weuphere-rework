import React, { useState } from 'react';
import styles from './notifications.module.css'
import {Animated} from "react-animated-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'


function Notifications(props) {
  return (
    <div className={styles['notifications-box']}>
      <div className={styles['notification']}>
        Notification
      </div>
      <div className={styles['notification']}>
        Notification 2
      </div>
    </div>
  )
}

export default Notifications;