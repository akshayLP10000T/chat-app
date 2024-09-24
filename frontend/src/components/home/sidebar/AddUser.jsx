import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUsers } from '../../../redux/userSlice';

const AddUser = () => {
    const dispatch = useDispatch();
    const { otherUsers } = useSelector(store=>store.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const conversationUser = otherUsers?.find((user)=> user.fullname.toLowerCase().trim().includes(username.toLowerCase().trim()));

            if(conversationUser){
                dispatch(setOtherUsers([conversationUser]));
            }
            else{
                dispatch(setOtherUsers([conversationUser]));
            }

        } catch (error) {
            toast.error(error.reponse.data.message);
        }
    }

    const [username, setUsername] = useState("");

    return (
        <form onSubmit={(e) => handleSubmit(e)} className='flex gap-2 items-center justify-center border-b-2 border-red-400 pb-3'>
            <input
                type="text"
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full py-3 px-4 bg-gray-100 rounded-xl outline-none focus:ring-2 shadow-md focus:ring-red-400 transition'
            />
            <button type="submit" className='rounded-full search bg-gray-200 p-4 hover:bg-red-400 transition-all duration-300' onClick={(e)=>handleSubmit(e)}><FaSearch size={15} /></button>
        </form>
    )
}

export default AddUser