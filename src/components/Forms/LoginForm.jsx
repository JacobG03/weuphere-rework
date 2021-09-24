import React, {} from 'react'
import styles from './LoginForm.module.css'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion';
import postData from '../../services/postData';


function LoginForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const setForm = props.setForm;
  const onSubmit = (data) => {
    postData('/api/user/login', data)
    .then(response => {
      if (response.success) {
        props.userContext.update(response.user)
      }
      // Display notification with response.msg
      console.log(response.msg)
    })
  }

  return (
    <form 
      className={styles['login-form']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className={styles['header']}>
        Login
      </span>
      <div className={styles['input-box']}>
        <span className={styles['label']}>Email:</span>
        <input
          {...register(
            'email',
            {required: true}
          )}
          placeholder='Email'
          className={styles['input']}
        />
        {errors.email && <span className={styles['error']}>This field is required</span>}
      </div>
      <div className={styles['input-box']}>
        <span className={styles['label']}>Password:</span>
        <input 
          {...register(
            'password',
            {required: true}
          )}
          type='password'
          placeholder='Password'
          className={styles['input']}
        />
        {errors.password && <span className={styles['error']}>This field is required</span>}
      </div>
      <div className={styles['remember-box']}>
        <input 
          className={styles['remember']}
          id='remember'
          type='checkbox'
          {...register('remember')}
        />
        <label htmlFor='remember'>Remember me</label>
      </div>
      <motion.input
        value='Sign in'
        className={styles['submit']}
        type='submit'
        whileTap={{
          transform: 'translateY(2px)',
          boxShadow: 'rgba(255, 255, 255, 0.1) 0px 0px 0px 0px inset'
        }}
      />
      <div className={styles['bottom']}>
        <span>New User?</span>
        <span 
          className={styles['link']}
          onClick={() => setForm(previous => !previous )}
        >
          Register here
        </span>
      </div>
    </form>
  );
}

export default LoginForm;