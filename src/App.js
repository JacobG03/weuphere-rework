import React, { 
  useContext,
} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { UserContext } from './context/UserContext';
import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage';
import io from 'socket.io-client'


export const socket = io('localhost:5000/');

function App() {
  const userContext = useContext(UserContext);
  const user = userContext.user
  
  if (user === false) {
    return null
  }
  
  return (
    <>
      <Router>
        <Navbar user={user} logout={userContext.logout} />
        <Notifications />
        <div className={'container'}>
          <Followed />
          <Chat />
          <Route path='/' exact>
            <>Welcome to We Up Here</>
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route path='/login' exact>
            <LoginPage />
          </Route>
        </div>
      </Router>
    </>
  );
}


function Followed() {
  return null
}

function Chat() {
  return null
}

export default App;