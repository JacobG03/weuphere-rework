import React, { useState } from 'react';
import styles from './navbar.module.css'
import {Animated} from "react-animated-css";
import { Link } from "react-router-dom";

import { WaveTopBottomLoading } from 'react-loadingg';

// Auth = 1
// unAuth = 0
// default = null

// Transition smoothly between states

const loaderStyle = {
  'position': 'relative',
}

function Navbar(props) {

  if (props.data.state === null) {
    // Default navbar displayed while waiting for data
    return (
      <div className={styles.navbar}>
        <Loader display={true}/>
      </div>
    )
  }
  if (props.data.state === 0) {
    // Navbar displayed when user is unAuthenticated
    return (
      <div className={styles.navbar} style={{'justify-content': 'space-between'}}>
        <Logo />
        <SignIn />
      </div>
    )
  }
  if (props.data.state === 1) {
    // Navbar displayed when user is Authenticated
    return (
      <div className={styles.navbar}>
        We Up Here
      </div>
    )
  }
}

function SignIn() {
  return (
    <Animated animationIn="fadeInLeft" animationOut="fadeOut" isVisible={true}>
      <Link to='login'>
        <div className={styles.signInButton}>
          Sign In
        </div>  
      </Link>
    </Animated>
  )
}

function Logo() {
  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <Link to='/'>
        <span className={styles.logo}>We Up Here</span>
      </Link>
    </Animated>
  )
}

function Loader(props) {
  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={props.display}>
      <WaveTopBottomLoading color='#ffffff' size='small' style={loaderStyle}/>
    </Animated>
  )
}

export default Navbar;