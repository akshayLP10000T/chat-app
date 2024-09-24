import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Form = () => {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://chat-app-a2qg.onrender.com/api/v1/user/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login");

        setFormData({
          fullname: '',
          username: '',
          password: '',
          confirmPassword: '',
          gender: '',
        })
      }
      
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className='flex-1 flex flex-col items-center justify-center bg-gray-50 py-8 px-4 md:px-16'>
      <h2 className='text-4xl md:text-5xl font-black mb-8'>Sign Up</h2>
      <form onSubmit={(e) => handleSubmit(e)} className='w-full max-w-lg space-y-4'>
        <input
          value={formData.fullname}
          onChange={handleChange}
          name='fullname'
          type='text'
          placeholder='Full name'
          className='w-full py-3 px-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-red-400 transition'
        />
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
        <input
          value={formData.confirmPassword}
          onChange={handleChange}
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          className='w-full py-3 px-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-red-400 transition'
        />
        <select
          value={formData.gender}
          onChange={handleChange}
          name='gender'
          className='w-full py-3 px-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-red-400 transition'
        >
          <option value='' disabled>Select Gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
        <button
          onClick={(e) => handleSubmit(e)}
          type='submit'
          className='w-full py-3 px-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition'>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Form
