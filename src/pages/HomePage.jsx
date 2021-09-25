import React, {
  useState,
  useContext
} from 'react'
import { 
  Link,
  Switch,
  Route
} from 'react-router-dom';
import styles from './HomePage.module.css'
import { UserContext } from '../context/UserContext';
import UsersContent from '../components/HomeContent/UsersContent';
import DefaultContent from '../components/HomeContent/DefaultContent';


function HomePage() {

  return (
    <div className='wrapper'>
      <div className={styles['main']}>
        <Header />
        <Content />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className={styles['header']}>
      <Link to='/home/users'>
        <div>Users</div>
      </Link>
      <Link to='/home/posts'>
        <div>Posts</div>
      </Link>
      <Link to='/home/events'>
        <div>Events</div>
      </Link>
    </div>
  )
}

function Searchbar() {
  return (
    <input placeholder='Input here'/>
  )
}

function Content() {

  return (
    <div className={styles['content']}>
      <Searchbar />
      <Switch>
        <Route path='/home/users' exact>
          <UsersContent />
        </Route>
        <Route path='/home/posts' exact>
          <div>posts</div>
        </Route>
        <Route path='/home/events' exact>
          <div>events</div>
        </Route>
      </Switch>
    </div>
  )
}

export default HomePage;
