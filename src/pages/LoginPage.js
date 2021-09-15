import React, { 
  useState, 
  useRef, 
  useEffect
} from 'react';
import { useForm } from 'react-hook-form'
import styles from './loginPage.module.css'
import { Animated } from 'react-animated-css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';


function LoginPage(props) {
  const [displayRegister, setDisplayRegister] = useState(false)
  const registerPage = useRef(null)
  const loginPage = useRef(null)

  useEffect(() => {
    if (displayRegister) {
      registerPage.current.style.display = 'block'
      registerPage.current.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      setTimeout(() => {
        registerPage.current.style.display = 'none'
      }, 1000)
      loginPage.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [displayRegister])

  return (
    <>
      <div
        className={styles['login']}
        ref={loginPage}
      >
        <LoginForm 
          setDisplayRegister={setDisplayRegister}
        />
      </div>
      <div 
        className={styles['register']}
        ref={registerPage}
      >
        Register Here
      </div>
    </>
  )
}

function LoginForm(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
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
          props.setDisplayRegister(true)
        }}
      >
        Click here to register
      </span>
    </form>
  )
}

export default LoginPage;