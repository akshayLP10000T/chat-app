import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice.js';
import GetMessages from './GetMessages.jsx';

const GetRealTimeMessages = () => {
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (newMessage) => {
        dispatch(setMessages([...messages, newMessage]));
      });

      return () => {
        socket.off('newMessage');
      };
    }
  }, [socket, setMessages, messages]);
}

export default GetRealTimeMessages;