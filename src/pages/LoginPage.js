import React, { useState } from 'react';
import Notification from '../components/Notification';


function LoginPage(props) {
  const dummy_data = {
    'priority': 0,
    'msg': 'Account created successfully!'
  }
  return (
    <div className='container'>
      <Notification 
        data={dummy_data}
        notification={props.notification}
        displayNotification={props.displayNotification}
      />
      <span onClick={() => props.displayNotification(!props.notification)}>This</span>
    </div>
  )
}

export default LoginPage;