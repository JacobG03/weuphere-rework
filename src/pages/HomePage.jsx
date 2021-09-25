import React, {
  useState,
  useEffect,
} from 'react'
import { 
  Link,
  Switch,
  Route,
} from 'react-router-dom';
import styles from './HomePage.module.css'
import UsersContent from '../components/HomeContent/UsersContent';
import DefaultContent from '../components/HomeContent/DefaultContent';


function HomePage() {
  const [option, setOption] = useState(null)

  return (
    <div className='wrapper'>
      <div className={styles['main']}>
        <Header option={option} setOption={setOption}/>
        <Content option={option} setOption={setOption}/>
      </div>
    </div>
  )
}

function Header(props) {
  const setOption = props.setOption
  const option = props.option

  useEffect(() => {
    // Decided which button should be highlited upon render
    let option = window.location.pathname.split('/')
    option = option.filter(String)
    if (option.length === 2) {
      setOption(option[1])
    } else {
      setOption(null)
    }
  })

  return (
    <div className={styles['header']}>
      <Link 
        to='/home/users'
        className={option === 'users' ? `${styles['header-item']} ${styles['highlited']}` :styles['header-item']}
        onClick={() => setOption('users')}
      >
        <span>Users</span>
      </Link>
      <Link 
        to='/home/posts'
        className={option === 'posts' ? `${styles['header-item']} ${styles['highlited']}` :styles['header-item']}
        onClick={() => setOption('posts')}
      >
        <span>Posts</span>
      </Link>
      <Link 
        to='/home/events'
        className={option === 'events' ? `${styles['header-item']} ${styles['highlited']}` :styles['header-item']}
        onClick={() => setOption('events')}
      >
        <span>Events</span>
      </Link>
    </div>
  )
}

function Searchbar() {
  return (
    <div className={styles['searchbar']}>
      <input placeholder='Input here' />
    </div>
  )
}

function Content(props) {

  return (
    <div className={styles['content']}>
      <Switch>
        <Route path='/home' exact>
          <DefaultContent setOption={props.setOption}/>
        </Route>
        <Route path='/home/users' exact>
          <Searchbar />
          <UsersContent />
        </Route>
        <Route path='/home/posts' exact>
          <Searchbar />
          <div>posts</div>
        </Route>
        <Route path='/home/events' exact>
          <Searchbar />
          <div>events</div>
        </Route>
      </Switch>
    </div>
  )
}

export default HomePage;
