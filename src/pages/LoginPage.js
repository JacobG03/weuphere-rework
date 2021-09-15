import React, { 
  useState, 
  useRef, 
  useEffect
} from 'react';
import styles from './loginPage.module.css'
import { Animated } from 'react-animated-css';


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
  return (
    <div className={styles['login-form']}>

    </div>
  )
}

export default LoginPage;