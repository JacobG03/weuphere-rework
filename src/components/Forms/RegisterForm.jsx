// import React, {} from 'react'
// import styles from './RegisterForm.module.css'


function RegisterForm(props) {
  const setForm = props.setForm;

  return (
    <div onClick={() => setForm(previous => !previous)}>Register Form</div>
  )
}

export default RegisterForm;