import React, { 
  useState,
  useContext,
  useEffect
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { UserContext } from './context/UserContext'


function App() {
  const userContext = useContext(UserContext);
  const user = userContext.user
  
  useEffect(() => {
    console.log(user)
  }, [user])
  
  return (
    <>
      <div onClick={() => {
        userContext.update({'username': 'jacob'})
      }}>Update</div>
      <div onClick={() => {
        userContext.refresh()
      }}>Refresh</div>
      <div onClick={() => {
        userContext.signout()
      }}>Signout</div>
      <div>{JSON.stringify(user)}</div>
    </>
  );
}

export default App;