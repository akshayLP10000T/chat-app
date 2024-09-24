import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../redux/userSlice';

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/", {replace: true})

        dispatch(setAuthUser(res.data.userData));

        setFormData({
          username: '',
          password: '',
        })
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className='flex-1 flex flex-col items-center justify-center bg-gray-50 py-8 px-4 md:px-16'>
        <h2 className='text-4xl md:text-5xl font-black mb-8'>Log In</h2>
        <form onSubmit={handleSubmit} className='w-full max-w-lg space-y-4'>
          <input
            value={formData.username}
            onChange={handleChange}
            name='username'
            type='text'
            placeholder='Username'
            className='w-full py-3 px-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-red-400 transition'
          />
          <input
            value={formData.password}
            onChange={handleChange}
            name='password'
            type='password'
            placeholder='Password'
            className='w-full py-3 px-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-red-400 transition'
          />
          <button
            onClick={handleSubmit}
            className='w-full py-3 px-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition'>
            Log In
          </button>
        </form>
      </div>
  )
}

export default Form