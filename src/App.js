import React, { 
  useState,
  useContext,
  useEffect
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { UserContext } from './context/UserContext'


function App() {
  const userContext = useContext(UserContext);
  const user = userContext.user
  

  useEffect(() => {
    console.log('App re-rendered due to user update.')
  }, [user])

  return (
    <>
      <Router>
        <Navbar user={user} />
        <Notifications />
        <div className={'container'}>
          <Route path='/home'>
            <div>
              <Link to='/home/people'>
                <div>People</div>
              </Link>
              <Link to='/home/posts'>
                <div>Posts</div>
              </Link>
              <Link to='/home/events'>
                <div>Events</div>
              </Link>
              <Switch>
                <Route path='/home/people' exact>
                  <div>people</div>
                </Route>
                <Route path='/home/posts' exact>
                  <div>posts</div>
                </Route>
                <Route path='/home/events' exact>
                  <div>events</div>
                </Route>
              </Switch>
            </div>
            <Followed />
            <Chat />
          </Route>
          <Route path='/' exact>
            <>Welcome to We Up Here</>
          </Route>
        </div>
      </Router>
    </>
  );
}

function Navbar() {
  return (
    <>Navbar</>
  )
}

function Notifications() {
  return (
    <>notifications</>
  )
}

function Followed() {
  return (
    <>followed</>
  )
}

function Chat() {
  return (
    <>chat</>
  )
}
export default App;