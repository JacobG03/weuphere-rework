import React, { useEffect, useState } from 'react'
import styles from './UsersContent.module.css'
import getData from '../../services/getData';
import { motion } from 'framer-motion';


function UsersContent(props) {
  const input = props.input;
  const [users, setUsers] = useState(null)
  const [displayMore, setMore] = useState(null)

  useEffect(() => {
    getData('/home/users')
    .then(response => response.json())
    .then(response => setUsers(response.users.map((user) => 
      <User 
        key={user.id}
        user={user}
        displayMore ={displayMore}
        setMore={setMore} 
      />
    )))
    console.log('input changed')
  }, [input, displayMore])

  if(users === null) {
    return null
  }

  return (
    <div className={styles['content']}>
      {users}
    </div>
  )
}


function User(props) {
  // if true display a bigger user window
  const setMore = props.setMore
  const user = props.user;
  const displayMore = props.displayMore

  if(user.id !== displayMore) {
    return (
      <div
        className={styles['user']}
        onClick={() => setMore(user.id)}
      >
        <img src={user.avatar} alt='User Avatar' className={styles['avatar']}/>
      </div>
    )
  }
  return (
    <div
      className={`${styles['user']} ${styles['more']}`}
      onClick={() => setMore(null)}
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
    </div>
  )
}

export default UsersContent;