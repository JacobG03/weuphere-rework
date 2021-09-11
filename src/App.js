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


function App() {
  const dummy_data = {
    'state': 1,
    'user': {
      'username': 'JacobG',
      'image': 'https://pbs.twimg.com/profile_images/723681919561437186/1Zi2ShOs.jpg',
    },
  }

  return (
    <Router>
      <Navbar data={dummy_data}/>
      <Switch>
        <Route path='/' exact>
          <HomePage />
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
    </Router>
  );
}

export default App;