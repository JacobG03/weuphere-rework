import React, { useEffect, useState, useContext } from 'react'
import styles from './UsersContent.module.css'
import { 
  Redirect,
  useParams,
  Link
} from 'react-router-dom'
import postData from '../../services/postData';
import { UserContext } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCircle as farCircle,
  faStar as farStar,
} from '@fortawesome/free-regular-svg-icons'
import { faCircle, 
  faMapMarker, 
  faTimes,
  faStar,
  faComment,
  faStickyNote
} from '@fortawesome/free-solid-svg-icons'
import {
  faDiscord,
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
  faSteamSquare
} from '@fortawesome/free-brands-svg-icons'
import { motion } from 'framer-motion';


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
  const [followed, setFollow] = useState(user.followed)
  console.log(user)
  console.log(followed)

  // Static example
  return (
    <div 
      className={`${styles['user']} ${styles['more']}`}
    >
      <div className={styles['header']}>
        <div className={styles['header_user']}>
          <img src={user.avatar} alt='User Avatar' className={styles['avatar']}/>
          <span className={styles['username']}>{user.username}</span>
          <div className={styles['location']}>
            <FontAwesomeIcon icon={faMapMarker}/>
            <span>{user.location}</span>
          </div>
        </div>
      </div>
      <div className={styles['main']}>
        <div className={styles['social']}>
          <FontAwesomeIcon icon={faDiscord} />
          <FontAwesomeIcon icon={faFacebookSquare} />
          <FontAwesomeIcon icon={faTwitterSquare} />
          <FontAwesomeIcon icon={faInstagramSquare} />
          <FontAwesomeIcon icon={faSteamSquare} />
          <FontAwesomeIcon icon={faSteamSquare} />
          <FontAwesomeIcon icon={faSteamSquare} />
        </div>
      </div>
      <Link to='/home/users' className={styles['close']}>
        <motion.div 
          whileTap={{ 
            scale: 0.9,
            color: 'var(--accent-color)'
          }}
          whileHover={{
            color: 'var(--accent-color)'
          }}
        >
          <FontAwesomeIcon icon={faTimes}/>
        </motion.div>
      </Link>
      <div className={styles['actions']}>
        <FontAwesomeIcon 
          icon={followed ? faStar: farStar}
          onClick={() => {
            postData('/follow')
            setFollow(!followed)
        }}/>
        <FontAwesomeIcon icon={faComment} />
      </div>
    </div>
  )
}

export default UsersContent;