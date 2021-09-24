import React, { 
  useContext,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { UserContext } from './context/UserContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage'
import Notifications from './components/Notifications';


function App() {
  const userContext = useContext(UserContext);
  const user = userContext.user
  
  if (user === false) {
    return null
  }

  return (
    <>
      <Router>
        <Navbar user={user} />
        <Notifications />
        <div className={'container'}>
          <Route path='/home'>
            <Followed />
            <Chat />
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
          </Route>
          <Route path='/' exact>
            <>Welcome to We Up Here</>
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