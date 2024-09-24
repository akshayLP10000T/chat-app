import React from 'react'
import SampleUser from './SampleUser'
import GetOtherUsers from '../../../hooks/GetOtherUsers'
import { useSelector } from 'react-redux';

const OtherUsers = () => {
  GetOtherUsers();

  const { otherUsers } = useSelector(store=>store.user);
  if(!otherUsers) return;

  return (
    <div>
      {
        otherUsers?.map((user)=>{
          return (
            <SampleUser key={user?._id} user={user} />
          )
        })
      }
      </div>
  )
}

export default OtherUsers