import React, {} from 'react'
import styles from './RegisterForm.module.css'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion';


function RegisterForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const setForm = props.setForm;
  const onSubmit = (data) => console.log(data)

  return (
    <form 
      className={styles['register-form']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className={styles['header']}>
        Register
      </span>
      <div className={styles['input-box']}>
        <span className={styles['label']}>Username:</span>
        <input
          {...register(
            'username',
            {required: true}
          )}
          placeholder='Username'
          className={styles['input']}
        />
        {errors.username && <span className={styles['error']}>This field is required</span>}
      </div>
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
      <div className={styles['input-box']}>
        <span className={styles['label']}>Repeat password:</span>
        <input 
          {...register(
            'password2',
            {required: true}
          )}
          type='password'
          placeholder='Repeat password'
          className={styles['input']}
        />
        {errors.password2 && <span className={styles['error']}>This field is required</span>}
      </div>
      <motion.input
        value='Sign up'
        className={styles['submit']}
        type='submit'
        whileTap={{
          transform: 'translateY(2px)',
          boxShadow: 'rgba(255, 255, 255, 0.1) 0px 0px 0px 0px inset'
        }}
      />
      <div className={styles['bottom']}>
        <span>Already a user?</span>
        <span 
          className={styles['link']}
          onClick={() => setForm(previous => !previous )}
        >
          Sign in here
        </span>
      </div>
    </form>
  );
}

export default RegisterForm;