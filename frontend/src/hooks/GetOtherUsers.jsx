import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice.js';

const GetOtherUsers = () => {
    const dispatch = useDispatch()

  useEffect(()=>{
    const fetchOtherUsers = async ()=>{
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get('http://localhost:8080/api/v1/user/');

            dispatch(setOtherUsers(res.data.otherUsers));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    fetchOtherUsers();
  }, [])
}

export default GetOtherUsers;