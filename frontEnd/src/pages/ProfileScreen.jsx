import React from 'react'
import { useGetUserProfileQuery } from '../Slice/userApiSlice'
const ProfileScreen = () => {
  const {data,isLoading,error,refetch}=useGetUserProfileQuery()
  console.log(data)
  return (
    <div>
      <p>Profile Screen</p>
    </div>
  )
}

export default ProfileScreen
