import React, { useState } from 'react';
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


// Auth = 1
// unAuth = 0
// default = null

// Transition smoothly between states


function Navbar(props) {
  const [menu, displayMenu] = useState(false)

  if (props.data.state === null) {
    // Default navbar displayed while waiting for data
    return (
      <div className={styles.navbar}>
        <Loader display={true}/>
      </div>
    )
  }
  else if (props.data.state === 0) {
    // Navbar displayed when user is unAuthenticated
    return (
      <div className={styles.navbar} style={{
        'justifyContent': 'space-between'
      }}>
        <Logo />
        <SignIn />
      </div>
    )
  }
  else if (props.data.state === 1) {
    // Navbar displayed when user is Authenticated
    return (
      <div className={styles.navbar} style={{
        'justifyContent': 'space-between'
        }}
      >
        <Logo />
        <div className={styles.activities}>
          <Messages />
          <Friends />
          <Avatar 
            user={props.data.user} 
            displayMenu={displayMenu} 
            menu={menu}
          />
        </div>
        <Menu menu={menu} />
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
        isVisible={props.menu} 
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
            <div className={styles['menu-item']}>
              <FontAwesomeIcon 
                className={styles['menu-icon']} 
                icon={faSignOutAlt}>
              </FontAwesomeIcon>
              <span>Sign Out</span>
            </div>
          </Animated>
        </div>
      </Animated>
    </div>
  )
}

function Avatar(props) {
  return (
    <Animated 
      animationIn="fadeInLeft" 
      animationOut="fadeOut" 
      isVisible={true}
      >
      <div className={styles.activity} onClick={() => props.displayMenu(!props.menu)}>
        <img src={props.user.image} alt='User Avatar'></img>
      </div>
    </Animated>
  )
}

function Messages() {
  // Receive length of unread messages
  return (
    <Animated 
    animationIn="fadeInLeft" 
    animationOut="fadeOut" 
    isVisible={true}
    >
      <div className={styles.activity}>
        <FontAwesomeIcon icon={faUsers} size='2x'/>
      </div>
    </Animated>
  )
}

function Friends(props) {
  // Receive new friend requests
  return (
    <Animated animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true}>
      <div className={styles.activity}>
        <FontAwesomeIcon icon={faCommentAlt} size='2x'/>
      </div>
    </Animated>
  )
}

function SignIn() {
  return (
    <Animated 
    animationIn="fadeInLeft" 
    animationOut="fadeOutRight" 
    isVisible={true}>
      <Link to='login'>
        <div className={styles.signInButton}>
          <FontAwesomeIcon 
          icon={faSignInAlt} 
          />
          <span>Sign In</span>
        </div>  
      </Link>
    </Animated>
  )
}

function Logo() {
  return (
    <Animated
    animateOnMount={true}
    animationIn="fadeInRight" 
    animationOut="fadeOut" 
    isVisible={true}
    >
      <Link to='/'>
        <span className={styles.logo}>We Up Here</span>
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