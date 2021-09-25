import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import { 
  Link,
  Switch,
  Route,
} from 'react-router-dom';
import styles from './HomePage.module.css'
import UsersContent from '../components/HomeContent/UsersContent';
import DefaultContent from '../components/HomeContent/DefaultContent';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';


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

function Searchbar(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    props.setInput(data.input)
  }

  return (
    <form 
      className={styles['searchbar']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        autoComplete='off'
        className={styles['search']}
        placeholder='Search for users here...'
        {...register(
          'input'
        )}
      />
      <motion.input
        value='Submit'
        className={styles['submit']}
        type='submit'
        whileTap={{
          transform: 'translateY(2px)',
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0px inset'
        }}
      />
    </form>
  )
}

function Content(props) {
  const [input, setInput] = useState('')

  return (
    <div className={styles['content']}>
      <Switch>
        <Route path='/home' exact>
          <DefaultContent setOption={props.setOption}/>
        </Route>
        <Route path='/home/users' exact>
          <Searchbar setInput={setInput}/>
          <UsersContent input={input}/>
        </Route>
        <Route path='/home/posts' exact>
          <Searchbar setInput={setInput}/>
          <div>posts</div>
        </Route>
        <Route path='/home/events' exact>
          <Searchbar setInput={setInput}/>
          <div>events</div>
        </Route>
      </Switch>
    </div>
  )
}

export default HomePage;
