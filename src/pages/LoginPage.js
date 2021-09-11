import React, { useState } from 'react';
import Notification from '../components/Notification';


function LoginPage(props) {
  return (
    <div className='container'>
      <Notification 
        notification={props.notification}
        displayNotification={props.displayNotification}
      />
      <span onClick={() => props.displayNotification({'display': !props.notification.display})}>This</span>
    </div>
  )
}

export default LoginPage;