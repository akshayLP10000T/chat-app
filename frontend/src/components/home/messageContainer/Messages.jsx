import React, { useEffect, useRef } from 'react'
import Message from './Message'
import { useSelector } from 'react-redux';
import GetRealTimeMessages from '../../../hooks/GetRealTimeMessages';
import GetMessages from '../../../hooks/GetMessages';

const Messages = () => {
  GetMessages();
  GetRealTimeMessages();

  const { authUser, selectedUser } = useSelector(store=>store.user);
  const { messages } = useSelector(store=>store.message);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages, selectedUser]);
  
  if (!messages) return;
  return (
    <div className='mb-3 mt-3 flex flex-col gap-2'>
      {
        messages?.map((message)=>{
          return <Message key={message?._id} message={message} where={message?.senderId === authUser?._id ? "right" : "left"} />
        })
      }
      <div ref={scrollRef}></div>
    </div>
  )
}

export default Messages