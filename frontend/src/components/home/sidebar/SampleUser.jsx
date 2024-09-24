import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../../../redux/userSlice';

const SampleUser = ({user}) => {

  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector(store=>store.user);

  const selectedUserHandler = (user)=>{
    dispatch(setSelectedUser(user));
  }

  const isOnline = onlineUsers?.includes(user?._id);

  return (
    <div onClick={()=>selectedUserHandler(user)} className={`border-b-2 items-center border-red-400 flex gap-3 py-2 cursor-pointer hover:bg-red-400 transition-all duration-300 rounded-lg text-white hover:text-black flex-col md:flex-row ${selectedUser?._id === user?._id && "bg-red-400 text-white"}`}>
        <div className='relative'>
            {isOnline && <div className='w-2 h-2 absolute top-0 right-0 bg-green-700 rounded-full'></div>}
            <img src="./avatar.png" alt="avatar" className='rounded-full h-12 w-12' />
        </div>
        <div className='flex items-center justify-center'>
            <p className='text-center'>{user?.fullname}</p>
        </div>
    </div>
  )
}

export default SampleUser