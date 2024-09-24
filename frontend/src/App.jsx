import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
import ProtectedRoute from './components/ProtechedRoutes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute> <Home /> </ProtectedRoute>
  },
  {
    path: "/register",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <LogIn />
  }
])

const App = () => {
  const { authUser } = useSelector(store=>store.user);
  const { socket } = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      const socket = io("http://localhost:8080/", {
        query: {
          userId: authUser._id,
        }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
      });

      return ()=>socket.close();
    }
    else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  }, [authUser]);

  return (
    <div className='flex justify-center items-center app w-full h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App