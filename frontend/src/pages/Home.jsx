import React from 'react'
import Sidebar from '../components/home/Sidebar'
import MessageContainer from '../components/home/MessageContainer'
import { resolveValue, toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';

const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async (e)=>{
    e.preventDefault();

    try {
      const res = await axios.get('https://chat-app-a2qg.onrender.com/api/v1/user/logout')

      if(res.data.success){
        dispatch(setSelectedUser(null));
        dispatch(setAuthUser(null));
        dispatch(setOtherUsers(null));
        dispatch(setMessages(null));
        toast.success(res.data.message);
        navigate("/login", {replace: true})
      }
    } catch (error) {
      toast.error(error)
    }
  }

  return (
      <div className='flex overflow-hidden bg-gray-400 relative w-full h-screen items-center justify-center'>
        <img src="./background.jpg" alt="img" className='w-full h-screen overflow-hidden object-cover' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[85%] px-5 py-3 rounded-lg flex bg-clip-padding backdrop-filter backdrop-blur-md border-2 border-red-400'>
        <div className='border-r-2 border-red-400 pr-3 overflow-y-auto'>
          <Sidebar />
        </div>
        <div className='relative flex-1 w-full flex flex-col md:min-w-[70vw] min-w-[60vw]'>
          <MessageContainer />
        </div>
        </div>
        <button onClick={(e)=>logoutHandler(e)} className='absolute top-0 right-0 bg-red-600 px-6 py-2 rounded-md mt-3 mr-3 text-white'>Logout</button>
      </div>
  )
}

export default Home