import React, { useState , useContext} from 'react';
import { Redirect } from 'react-router';
import { UserContext } from '../context/UserContext'


function HomePage(props) {
  const userContext = useContext(UserContext);

  if (userContext.user.user === null) {
    return (
      <Redirect to='/login' />
    )
  }
  return (
    <div>
      Home Page
    </div>
  )
}

export default HomePage;