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
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Chat from '../components/HomeContent/Chat'


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


function Content(props) {
  const [input, setInput] = useState('')

  useEffect(() => {

  }, [input])

  return (
    <div className={styles['content']}>
      <Switch>
        <Route path='/home' exact>
          <DefaultContent setOption={props.setOption}/>
        </Route>
        <Route path='/home/users/:username'>
          <Searchbar setInput={setInput}/>
          <UsersContent input={input}/>
        </Route>
        <Route path='/home/users' exact>
          <Searchbar setInput={setInput}/>
          <UsersContent input={input}/>
        </Route>
        <Route path='/home/posts' exact>
          <Searchbar setInput={setInput}/>
        </Route>
        <Route path='/home/chat' exact>
          <Searchbar setInput={setInput}/>
          <Chat input={input} />
        </Route>
      </Switch>
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
    if (option.length > 1) {
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
        to='/home/chat'
        className={option === 'chat' ? `${styles['header-item']} ${styles['highlited']}` :styles['header-item']}
        onClick={() => setOption('chat')}
      >
        <span>Chat</span>
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
        placeholder='Search for users, posts or chat rooms..'
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


export default HomePage;
