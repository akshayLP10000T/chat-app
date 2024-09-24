import axios from 'axios';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../../redux/messageSlice';

const MessageBox = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store=>store.user);
    const { messages } = useSelector(store=>store.message);

    const sendHandler = async (e)=>{
      e.preventDefault();

      try {
        const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`, {message}, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        dispatch(setMessages([...messages, res.data?.newMessage]));

        setMessage("");
      } catch (error) {
        toast.error(error);
      }
    }

  return (
    <form className='w-full ml-2 flex items-center'>
        <input type="text"
        value={message}
        onChange={(e)=> setMessage(e.target.value)}
        className='bg-gray-100 outline-none focus:ring-red-400 px-3 py-2 rounded-md flex-1 mr-3'
        placeholder='Message...'
        name='message'
        />

        <button onClick={(e)=>sendHandler(e)} type='submit' className='bg-red-400 px-4 py-2 rounded-lg text-white'>Send</button>
    </form>
  )
}

export default MessageBox