import React, {} from 'react'
import styles from './LoginForm.module.css'
import { set, useForm } from 'react-hook-form'
import { motion } from 'framer-motion';


function LoginForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);
  const setForm = props.setForm;

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
          type='checkbox'
          {...register('remember')}
        />
        <span>Remember me</span>
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