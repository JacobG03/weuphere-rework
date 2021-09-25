import React, {
  useState,
  useContext
} from 'react'
import styles from './LoginPage.module.css'
import LoginForm from '../components/Forms/LoginForm';
import RegisterForm from '../components/Forms/RegisterForm';
import { UserContext } from '../context/UserContext';
import { Redirect } from 'react-router-dom';


function LoginPage() {
  // Decided whether to display login or register form 
  const [form, setForm] = useState(true)
  const userContext = useContext(UserContext);

  if (userContext.user !== null) {
    return (
      <Redirect to='home' />
    )
  }

  return (
    <div className={styles['login-container']}>
      {form ? <LoginForm 
        setForm={setForm}
        userContext={userContext}
      /> : 
      <RegisterForm 
        setForm={setForm}
        userContext={userContext}
      />}
    </div>
  )
}


export default LoginPage;