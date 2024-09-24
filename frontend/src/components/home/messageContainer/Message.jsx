import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const Message = ({ where, message }) => {
  const { selectedUser } = useSelector(store=>store.user)

  return (
    <div className='ml-3'>
      <div className={`relative w-full flex gap-2 items-center  ${where === "right"? "justify-end" : "justify-start"}`}>
        <div>
          <img
            src="./avatar.png"
            alt="userProfileImage"
            className={`h-8 rounded-full w-8 ${where === "right" && "hidden"}`}
          />
        </div>
        <div className={`${where === "right" ? "bg-red-400 rounded-l-lg" : "bg-transparent border-2 border-red-400  rounded-r-lg"} px-4 py-2 rounded-b-lg text-white`}>
          {message?.message}
        </div>
      </div>
    </div>
  )
}

export default Message