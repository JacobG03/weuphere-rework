import React, { useEffect } from 'react'
// import styles from './DefaultContent.module.css'


function DefaultContent(props) {
  // if user logged in return some stats and cool data
  // if user logged out display login options
  useEffect(() => {
    props.setOption(null)
  })

  return (
    <span style={{ color: 'black'}}>Cool stats here</span>
  )
}

export default DefaultContent;