import React, { 
  useState,
} from 'react'
import { 
  Link,
} from 'react-router-dom'
import styles from './Navbar.module.css'
import { motion } from 'framer-motion'


function Navbar(props) {
  const user = props.user
  
  return (
    <nav className={styles['navbar']}>
      <div className='wrapper'>
        <div className={styles['content']}>
          <Logo />
          {user ? <Auth user={user} logout={props.logout}/>: <UnAuth />}
        </div>
      </div>
    </nav>
  )
}


function Logo() {
  return (
    <Link to='/home'>
      <motion.div className={styles['item']}>
        <span>We Up Here</span>
      </motion.div>
    </Link>
  )
}


function Auth(props) {
  const [menu, setMenu] = useState(false)
  const user = props.user
  
  return (
    <div className={styles['items']}>
      <div 
        className={styles['item']}
        onClick={() => setMenu(!menu)}
      >
        <img 
          src={user.avatar}
          className={styles['avatar']}
          alt="User's Avatar"
          />
      </div>
      {menu ? <Menu logout={props.logout}/>: null}
    </div>
  )
}

function Menu(props) {

  return (
    <div className={styles['menu']}>
      <div 
        className={styles['item']}
        onClick={() => props.logout()}
      >
        <span>Logout</span>
      </div>
    </div>
  )
}


function UnAuth() {

  return (
    <Link to='/login'>
      <div className={styles['item']}>
        <motion.button 
          className={styles['button-login']}
          whileTap={{ 
            boxShadow: 'rgba(255, 255, 255, 0.1) 0px 0px 0px 0px inset',
            transform: 'translateY(2px)'
          }}
        >
          Sign In
        </motion.button>
      </div>
    </Link>
  )
}

export default Navbar;