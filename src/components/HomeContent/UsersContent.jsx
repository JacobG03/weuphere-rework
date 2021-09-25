import React, { useEffect, useState } from 'react'
import styles from './UsersContent.module.css'
import getData from '../../services/getData';
import { motion } from 'framer-motion';


function UsersContent(props) {
  const input = props.input;
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getData('/home/users')
    .then(response => response.json())
    .then(response => setUsers(response.users.map((user) => 
      <User key={user.id} user={user} />
    )))
    console.log('input changed')
  }, [input])

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
  const user = props.user;

  return (
    <motion.div 
      className={styles['user']}
      drag
      dragConstraints={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <img src={user.avatar} alt='User Avatar' />
    </motion.div>
  )
}

export default UsersContent;