import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import React, {
  useState,
  useEffect
} from 'react'
import styles from './Chat.module.css'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { socket } from '../../App'


function Chat(props) {
  const { register, handleSubmit} = useForm();
  const onSubmit = data => {
  };
  
  useEffect(() => {
    socket.on('send:message', data => {
      console.log(data)
    })
  }, [])

  const sendMessage = message => {
    console.log('message emited')
    socket.emit('receive:message', message)
  }
  
  return (
    <div className={styles['chat']}>
      <div className={styles['messages']}>
        <div className={styles['message']}>
          <div className={styles['avatar']}>
            <img src='https://www.olarila.com/uploads/monthly_2020_02/174235.thumb.jpg.235079d666a1cc947ff66cd293fe1ccc.jpg' alt='avatar'/>
          </div>
          <div className={styles['content']}>
            <div className={styles['top']}>
              <span className={styles['username']}>JacobG</span>
              <span className={styles['date']}>23h 27min ago</span>
            </div>
            <span 
              className={styles['msg']}
              onClick={() => sendMessage('this message')}
            >
              message 
            </span>
          </div>
        </div>
      </div>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className={styles['form']}
      >
        <input
          className={styles['msgBox']}
          {...register('msg', { required: true })} 
        />        
        <motion.input
          whileTap={{ 
            boxShadow: 'rgba(255, 255, 255, 0.1) 0px 0px 0px 0px inset',
            transform: 'translateY(2px)'
          }}
          className={styles['submit']}
          type='submit'
        />
      </form>
    </div>
  )
}


export default Chat;