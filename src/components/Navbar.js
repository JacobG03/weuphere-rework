import React, { 
  useContext, 
  useState,
  useEffect
} from 'react';
import { Link } from "react-router-dom";

import styles from './navbar.module.css'
import {Animated} from "react-animated-css";
import { WaveTopBottomLoading } from 'react-loadingg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faSignInAlt, 
  faCommentAlt, 
  faUsers,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';
import { UserContext } from '../context/UserContext'
import { postData } from '../services/PostData';


// Auth = 1
// unAuth = 0
// default = null

// Transition smoothly between states


function Navbar(props) {
  const displayMenu = props.displayMenu 
  const menu = props.menu

  const user_data = useContext(UserContext);
  console.log(user_data)
  
  if (user_data.user.state === null) {
    return (
      <div className={styles.navbar}>
        <Loader display={true}/>
      </div>
    )
  }
  else if (user_data.user.state === 0) {
    // Navbar displayed when user is unAuthenticated
    return (
      <div className={styles.navbar} style={{
        'justifyContent': 'space-between'
        }}
      >
        <Logo />
        <SignIn />
      </div>
    )
  }
  else if (user_data.user.state === 1) {
    // Navbar displayed when user is Authenticated
    return (
      <div className={styles.navbar} style={{
        'justifyContent': 'space-between'
        }}
      >
        <Logo />
        <Animated 
          animateOnMount={true}
          animationIn='slideInRight' 
          animationOut='slideOutRight' 
          animationInDuration={600}
          animationOutDuration={600}
        >
          <div className={styles.activities}>
            <Messages />
            <Friends />
            <Avatar 
              image={user_data.user.user.image} 
              displayMenu={displayMenu} 
              menu={menu}
            />
          </div>
        </Animated>
        <Menu display={menu} signout={user_data.signout}/>
      </div>
    )
  }
}

function Menu(props) {
  return (
    <div className={styles.menu_box}>
      <Animated
        animateOnMount={false}
        animationIn='slideInRight' 
        animationOut='slideOutRight' 
        animationInDuration={300}
        animationOutDuration={300}
        isVisible={props.display} 
      >
        <div className={styles.menu}>
          <Animated
            animationIn='fadeInLeft' 
            animationOut='fadeOutRight' 
            animationInDuration={400}
            isVisible={props.menu}
          >
            <div className={styles['menu-item']}>
              <FontAwesomeIcon
                className={styles['menu-icon']}
                icon={faCog}
              >
              </FontAwesomeIcon>
              <span>Settings</span>
            </div>
            <motion.div 
              className={styles['menu-item']}
              whileHover={{ cursor: 'pointer' }}
              onClick={() => {
                props.signout()
              }}
            >
              <FontAwesomeIcon 
                className={styles['menu-icon']}
                icon={faSignOutAlt}>
              </FontAwesomeIcon>
              <span>Sign Out</span>
            </motion.div>
          </Animated>
        </div>
      </Animated>
    </div>
  )
}

function Avatar(props) {
  return (
    <motion.div 
      className={styles.activity}
      whileTap={{ scale: 0.8}}
      onClick={() => props.displayMenu(!props.menu)}
      whileHover={{ cursor: 'pointer'}}
    >
      <img 
        src={props.image}
        alt='User Avatar'
      />
    </motion.div>
  )
}

function Messages() {
  // Receive length of unread messages
  return (
    <motion.div 
      className={styles.activity}
      whileTap={{ scale: 0.8 }}
      whileHover={{ cursor: 'pointer'}}
    >
      <FontAwesomeIcon icon={faUsers} size='2x'/>
    </motion.div>
  )
}

function Friends(props) {
  // Receive new friend requests
  return (
    <motion.div 
      className={styles.activity}
      whileHover={{ cursor: 'pointer'}}
      whileTap={{ scale: 0.8 }}
    >
      <FontAwesomeIcon icon={faCommentAlt} size='2x'/>
    </motion.div>
  )
}

function SignIn() {
  return (
    <Animated
    animateOnMount={true}
    animationIn='slideInRight' 
    animationOut='slideOutRight'
    animationInDuration={600}
    animationOutDuration={600}
    isVisible={true}
    >
      <Link to='login'>
        <motion.div 
          className={styles.signInButton}
          whileHover={{ cursor: 'pointer' }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faSignInAlt} />
          <span>Sign In</span>
        </motion.div>  
      </Link>
    </Animated>
  )
}

function Logo() {
  return (
    <Animated
    animateOnMount={true}
    animationIn="slideInLeft" 
    animationOut="slideOutLeft"
    animationInDuration={600}
    animationOutDuration={600}
    isVisible={true}
    >
      <Link to='/'>
        <motion.span 
          className={styles.logo}
          whileHover={{ cursor: 'pointer'}}
        >
          We Up Here
        </motion.span>
      </Link>
    </Animated>
  )
}

function Loader(props) {
  return (
    <Animated 
    animationIn="fadeIn" 
    animationOut="fadeOut" 
    isVisible={props.display}
    >
      <WaveTopBottomLoading color='#ffffff' size='small' style={{'position': 'relative'}}/>
    </Animated>
  )
}

export default Navbar;