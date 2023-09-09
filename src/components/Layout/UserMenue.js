import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenue = () => {
  return (
    <>
    <div className="text-center flex flex-col gap-2">
    <h4 className='font-bold text-[23px]'>DashBoard</h4>
   <div className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
     <NavLink to="/dashboard/user/profile" aria-current="true" className="block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer dark:bg-gray-800 dark:border-gray-600">
           Profile
     </NavLink>
     <NavLink to="/dashboard/user/orders" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
       Order
     </NavLink>
   
   </div>
    </div>
   
   
       </>
  )
}

export default UserMenue