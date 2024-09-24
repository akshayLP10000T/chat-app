import React, { useEffect } from 'react'
import People from './messageContainer/People'
import MessageBox from './messageContainer/MessageBox'
import Messages from './messageContainer/Messages'
import {  useSelector } from 'react-redux'

const MessageContainer = () => {
  const { selectedUser } = useSelector(store => store.user);

  return (
    <>
      {
        selectedUser ? (
          <>
            <div className='flex-1'>

              <People />
            </div>
            <div className='overflow-y-auto'>

              <Messages />
            </div>
            <div>

              <MessageBox />
            </div>
            </>
        ) : (
          <h1 className='h-screen flex items-center justify-center text-white text-2xl flex-[3.5]'>Start a conversation</h1>
        )
      }

    </>
  )
}

export default MessageContainer