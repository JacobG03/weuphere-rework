import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import React, {
<<<<<<< HEAD
  useState,
  useEffect
} from 'react'
import styles from './Chat.module.css'
import io from 'socket.io-client'

function Chat(props) {
  const [data, setData] = useState([])
  const user_input = props.input

  var socket = io('http://127.0.0.1:3000/home/chat')
  
  useEffect(() => {
    socket.on('sendMessage', data => {
      console.log(data)
    })
  })

  const sendMessage = message => {
    socket.emit('message', message)
  }

=======
  useEffect,
  useState
} from 'react'
import styles from './Chat.module.css'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'


function Chat(props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data)
  };

  
  console.log(props)
>>>>>>> 6f34ab042918a39a7d3ea64a50b7652d574c5fc2
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