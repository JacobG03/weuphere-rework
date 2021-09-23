import React, { 
  useEffect, 
  useRef,
} from 'react'
import { 
  Link
} from 'react-router-dom'
import styles from './Navbar.module.css'
import { motion } from 'framer-motion'


function Navbar(props) {
  const user = props.user

  return (
    <nav className={styles['navbar']}>
      <div className={styles['wrapper']}>
        <div className={styles['content']}>
          <Logo />
          {user ? <Auth user={user}/>: <UnAuth />}
        </div>
      </div>
    </nav>
  )
}


function Logo() {
  return (
    <Link to='/home'>
      <motion.div 
        className={styles['item']}
      >
        <span>We Up Here</span>
      </motion.div>
    </Link>
  )
}


function Auth(props) {
  // const user = props.user
  
  return (
    <div className={styles['item']}>Authenticated</div>
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