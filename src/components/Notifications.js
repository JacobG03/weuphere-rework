import React, { useState } from 'react';
import styles from './notifications.module.css'
import {Animated} from "react-animated-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'


function Notifications(props) {
  return (
    <div className={styles['notifications']}>
      {props.notifications}
    </div>
  )
}

export default Notifications;