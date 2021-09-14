import React, { useState } from 'react';
import styles from './notifications.module.css'
import {Animated} from "react-animated-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'


function Notifications(props) {
  const notifications = props.notifications
  const updateNotifications = props.updateNotifications

  console.log(notifications)

  return (
    <div className={styles['notifications-box']}>
      {notifications.map(notification => (
        <Notification 
          notification={notification}
          notifications={notifications}
          updateNotifications={updateNotifications}
          key={notification.key}
        />
      ))}
    </div>
  )
}

function Notification(props) {
  const notification = props.notification
  const updateNotifications = props.updateNotifications
  var notifications = props.notifications
  
  setTimeout(() => {
    const newNotifications = notifications.filter((item) => item.key !== notification.key);
    updateNotifications(newNotifications)
  }, 3000)

  return (
    <div className={styles['notification']}>
      <span>{notification.message}</span>
    </div>
  )
}

export default Notifications;