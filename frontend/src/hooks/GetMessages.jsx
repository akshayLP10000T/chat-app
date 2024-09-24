import axios from 'axios';
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const GetMessages = async () => {
  const { selectedUser } = useSelector(store => store.user)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser?._id}`)
        dispatch(setMessages(res.data));

      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchMessages();
  }, [selectedUser])  
}

export default GetMessages