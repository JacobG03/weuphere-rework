import React, { useEffect, useState, useContext } from 'react'
import styles from './UsersContent.module.css'
import { motion } from 'framer-motion';
import { 
  Redirect,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  Link
} from 'react-router-dom'
import postData from '../../services/postData';
import { UserContext } from '../../context/UserContext';

function UsersContent(props) {
  const input = props.input;
  const [users, setUsers] = useState(null)
  // User param: /home/users/jacob - username = jacob
  const { username } = useParams()

  useEffect(() => {
    postData('/home/users', {'query': input})
    .then(response => {
      if(response.success) {
        setUsers(response.users.map((user) => 
        username === user.username ?
        <UserMore user={user} key={user.id}/> : 
        <UserDefault user={user} key={user.id}/>
    ))
      }
    })
  }, [username, input])
  

  // if user logged out return to /home
  const userContext = useContext(UserContext);
  if (userContext.user === null) {
    return <Redirect to='/home' />
  }
  // Prevents unnecessary render
  if(users === null) {
    return null
  }
  
  return (
    <div className={styles['content']}>
      {users}
    </div>
  )
}


function UserDefault(props) {
  const user = props.user;

  return (
    <Link to={`/home/users/${user.username}`} className={styles['user']}>
      <img src={user.avatar} alt='User Avatar' className={styles['avatar']}/>
    </Link>
  )
}

function UserMore(props) {
  const user = props.user;

  return (
    <Link 
      className={`${styles['user']} ${styles['more']}`}
      to='/home/users'
    >
      <div className={styles['header']}>
        <div className={styles['header-left']}>
          <img src={user.avatar} alt='User Avatar' className={styles['avatar']}/>
          <span>{user.username}</span>
        </div>
        <span>Online</span>
      </div>
      <div className={styles['main']}>
        Main Content
      </div>
    </Link>
  )
}

export default UsersContent;