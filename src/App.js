import React, { useState } from 'react';
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import EventsPage from './pages/EventsPage';
import PostsPage from './pages/PostsPage';
import PeoplePage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Notifications from './components/Notifications';
import { UserContextProvider } from './context/UserContext'


function App() {
  const [menu, displayMenu] = useState(false)
  const [notifications, updateNotifications] = useState([])
  

  return (
    <Router>
      <UserContextProvider>
        <Navbar
          menu={menu} 
          displayMenu={displayMenu}
        />
      </UserContextProvider>
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
            <LoginPage 
              notifications={notifications}
              updateNotifications={updateNotifications}  
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;