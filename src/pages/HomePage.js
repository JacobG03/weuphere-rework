import React, { useState } from 'react';
import Notification from '../components/Notification';

function HomePage(props) {
  return (
    <div onClick={() => {
      props.updateNotifications([
        ...props.notifications,
        <Notification message='Yo' />
      ])
    }}
    >
      Home Page
    </div>
  )
}

export default HomePage;