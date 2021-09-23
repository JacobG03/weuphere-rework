import React, {useState} from 'react'
import styles from './LoginPage.module.css'
import LoginForm from '../components/Forms/LoginForm';
import RegisterForm from '../components/Forms/RegisterForm';


function LoginPage() {
  // Decided whether to display login or register form 
  const [form, setForm] = useState(true)
  
  return (
    <div className={styles['login-container']}>
      {form ? <LoginForm setForm={setForm}/> : <RegisterForm setForm={setForm}/>}
    </div>
  )
}


export default LoginPage;