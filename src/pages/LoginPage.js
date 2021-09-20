import React, { 
  useState,
  useContext
} from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import styles from './loginPage.module.css'
import { Animated } from 'react-animated-css';
import { motion } from 'framer-motion';
import postData from '../services/PostData'
import Notification from '../components/Notification';
import { UserContext } from '../context/UserContext'


// Main login page
function LoginPage(props) {
  const [display, setDisplay] = useState(false)
  const userContext = useContext(UserContext);

  if (userContext.user.user !== null || userContext.user.username) {
    return (
      <Redirect to='/' />
    )
  }

  if (!display) {
    return (
      <Login
        display={display}
        setDisplay={setDisplay}
        notifications={props.notifications}
        updateNotifications={props.updateNotifications}
        userContext={userContext}
      />
    )
  } else {
    return (
      <Register
        display={display}
        setDisplay={setDisplay}
      />
    )
  }
}


// Login form parent component
function Login(props) {
  return (
    <Animated
      animateOnMount={true}
      animationIn='slideInLeft'
      animationOut='slideOutRight'
    >
      <div className={styles['login']}>
        <LoginForm
          notifications={props.notifications}
          updateNotifications={props.updateNotifications}
          setDisplay={props.setDisplay}
          userContext={props.userContext}
        />
      </div>
    </Animated>
  )
}


// Register form parent component
function Register(props) {
  return (
    <Animated
      animateOnMount={true}
      animationIn='slideInRight'
      animationOut='slideOutRight'
    >
      <div className={styles['register']}>
        <RegisterForm
          display={props.display}
          setDisplay={props.setDisplay}
        />
      </div>
    </Animated>
  )
}



// Register form
function RegisterForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => (
    console.log(data)
  );
  
  return (
    <form
      className={styles['login-form']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className={styles['header-reg']}>Register</span>

      <span className={styles['title-reg']}>Username:</span>
      <input {...register('username', { required: true })} />
      {errors.username &&
      <Animated animationIn='fadeIn'>
        <span className={styles['error']}>
          This field is required
        </span>
      </Animated>
      }

      <span className={styles['title-reg']}>Email:</span>
      <input {...register('email', { required: true })} />
      {errors.email &&
      <Animated animationIn='fadeIn'>
        <span className={styles['error']}>
          This field is required
        </span>
      </Animated>
      }
      
      <span className={styles['title-reg']}>Password:</span>
      <input type='password' {...register('password', { required: true })} />
      {errors.password &&
      <Animated animationIn='fadeIn'>
        <span className={styles['error']}
        >
          This field is required
        </span>
      </Animated>
      }

      <span className={styles['title-reg']}>Repeat Password:</span>
      <input type='password' {...register('password2', { required: true })} />
      {errors.password2 &&
      <Animated animationIn='fadeIn'>
        <span className={styles['error']}
        >
          This field is required
        </span>
      </Animated>
      }

      <motion.input
        className={styles['btn']}
        type="submit"
        value='Sign up'
        whileHover={{ cursor: 'pointer' }}
        whileTap={{ 
          scale: 0.9,
        }}
        />
      <span>Already a user?</span>
      <span 
        className={styles['redirect']}
        onClick={() => {
          props.setDisplay(false)
        }}
      >
        Click here to sign in
      </span>
    </form>
  )
}



// Login form
function LoginForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    postData(`${window.location.origin}/api/login`, data)
    .then(result => {
      if(result.success) {
        localStorage.setItem('user', JSON.stringify(result.user))
      } 
      props.updateNotifications([
        ...props.notifications,
        <Notification message={result.message} key={props.notifications.length}/>
      ])

      setTimeout(() => {
        props.userContext.auth()
      })
    })
  }
  
  
  return (
    <form
      className={styles['login-form']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className={styles['header']}>Login</span>

      <span className={styles['title']}>Email:</span>
      <input {...register("email", { required: true })} />
      {errors.email &&
      <Animated animationIn='fadeIn'>
        <span className={styles['error']}>
          This field is required
        </span>
      </Animated>
      }
      
      <span className={styles['title']}>Password:</span>
      <input type='password' {...register("password", { required: true })} />
      {errors.password &&
      <Animated animationIn='fadeIn'>
        <span className={styles['error']}
        >
          This field is required
        </span>
      </Animated>
      }
      <motion.input
        className={styles['btn']}
        type="submit"
        value='Sign in'
        whileHover={{ cursor: 'pointer' }}
        whileTap={{ 
          scale: 0.9,
        }}
      />
      <span>New user?</span>
      <span 
        className={styles['redirect']}
        onClick={() => {
          props.setDisplay(true)
        }}
      >
        Click here to register
      </span>
    </form>
  )
}

export default LoginPage;