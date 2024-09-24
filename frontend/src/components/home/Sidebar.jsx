import React from 'react'
import AddUser from './sidebar/AddUser'
import OtherUsers from './sidebar/OtherUsers'

const Sidebar = () => {
  return (
    <div>
      <div className='text-white text-3xl font-bold border-b-2 border-red-400 mb-3'>
        Chats
      </div>
      <OtherUsers />
    </div>
  )
}

export default Sidebar