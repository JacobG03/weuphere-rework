import React, { useState } from 'react';
import styles from './navbar.module.css'

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
        <WaveTopBottomLoading color='#ffffff' size='small' style={loaderStyle}/>
      </div>
    )
  }
  if (props.data.state === 0) {
    return (
      <div className={styles.navbar}>
        We Up Here
      </div>
    )
  }
  if (props.data.state === 1) {
    return (
      <div className={styles.navbar}>
        We Up Here
      </div>
    )
  }
}

export default Navbar;