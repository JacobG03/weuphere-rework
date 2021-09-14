import React, { useState } from 'react';


function HomePage(props) {
  return (
    <div onClick={() => 
      props.updateNotifications([
        ...props.notifications,
        {
          'key': props.notifications.length,
          'message': 'Message'
        }
      ])
    }>
      Home Page
    </div>
  )
}

export default HomePage;