import React, { 
  useState, 
} from 'react';
import { useForm } from 'react-hook-form'
import styles from './loginPage.module.css'
import { Animated } from 'react-animated-css';
import { motion } from 'framer-motion';


function LoginPage(props) {
  const [display, setDisplay] = useState(false)

  if (!display) {
    return (
      <Login
        display={display}
        setDisplay={setDisplay}
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


function Login(props) {
  return (
    <Animated
      animateOnMount={true}
      animationIn='slideInLeft'
      animationOut='slideOutRight'
    >
      <div className={styles['login']}>
        <LoginForm 
          setDisplay={props.setDisplay}
        />
      </div>
    </Animated>
  )
}


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

function RegisterForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  
  return (
    <form
      className={styles['login-form']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className={styles['header']}>Register</span>

      <span className={styles['title']}>Username:</span>
      <input {...register('username', { required: true })} />
      {errors.username &&
      <Animated animationIn='fadeIn'>
        <span className={styles['error']}>
          This field is required
        </span>
      </Animated>
      }

      <span className={styles['title']}>Email:</span>
      <input {...register('email', { required: true })} />
      {errors.email &&
      <Animated animationIn='fadeIn'>
        <span className={styles['error']}>
          This field is required
        </span>
      </Animated>
      }
      
      <span className={styles['title']}>Password:</span>
      <input type='password' {...register('password', { required: true })} />
      {errors.password &&
      <Animated animationIn='fadeIn'>
        <span className={styles['error']}
        >
          This field is required
        </span>
      </Animated>
      }

      <span className={styles['title']}>Repeat Password:</span>
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

function LoginForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  
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