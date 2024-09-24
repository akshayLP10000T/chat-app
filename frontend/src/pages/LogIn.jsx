import React, { useEffect } from 'react'
import Welcome from '../components/logIn/Welcome'
import Form from '../components/logIn/Form'
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const { authUser } = useSelector(store=>store.user);
  const navigate = useNavigate();

  useEffect(()=>{
    gsap.fromTo("div", {
      opacity: 0,
      duration: 1,
    }, {
      opacity: 1
    })
  })

  useEffect(()=>{
    if(authUser){
      navigate("/")
    }
  })

  return (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <Form />
      <Welcome />
    </div>
  )
}

export default LogIn