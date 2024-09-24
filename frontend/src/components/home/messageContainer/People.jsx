import React from 'react'
import { useSelector } from 'react-redux'

const People = () => {
  const { selectedUser, onlineUsers } = useSelector(store=>store.user);
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <div className='flex items-center gap-5 text-white bg-red-400 w-full rounded-md ml-2 px-3 py-2'>
        <div className='relative'>
        <img src="./avatar.png" alt="avatar" className='w-16 h-16 rounded-full' />
        {
          isOnline && <div className='w-3 h-3 bg-green-700 absolute top-0 right-0 rounded-full'></div>
        }
        </div>
        <p>{selectedUser?.fullname}</p>
    </div>
  )
}

export default People