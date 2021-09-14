import React, { useState } from 'react';
import Notification from '../components/Notification';

function HomePage(props) {
  return (
    <div onClick={() => {
      props.updateNotifications([
        ...props.notifications,
        <Notification
          message='A little longer message to see how it works'
          key={props.notifications.length}
        />
      ])
    }}
    >
      Home Page
    </div>
  )
}

export default HomePage;