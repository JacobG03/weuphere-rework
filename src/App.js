import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import EventsPage from './pages/EventsPage';
import PostsPage from './pages/PostsPage';
import PeoplePage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Notifications from './components/Notifications';


function App() {
  const [menu, displayMenu] = useState(false)
  const [notifications, updateNotifications] = useState([])

  const dummy_data = {
    'state': 1,
    'user': {
      'username': 'JacobG',
      'image': 'https://pbs.twimg.com/profile_images/723681919561437186/1Zi2ShOs.jpg',
    },
  }

  return (
    <Router>
      <Navbar 
        data={dummy_data} 
        menu={menu} 
        displayMenu={displayMenu}
      />
      <Notifications
        notifications={notifications}
        updateNotifications={updateNotifications}
      />
      <div className='container'>
        <Switch>
          <Route path='/' exact>
            <HomePage 
              notifications={notifications}
              updateNotifications={updateNotifications}
            />
          </Route>
          <Route path='/people' exact>
            <PeoplePage />
          </Route>
          <Route path='/posts' exact>
            <PostsPage />
          </Route>
          <Route path='/events' exact>
            <EventsPage />
          </Route>
          <Route path='/login' exact>
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;