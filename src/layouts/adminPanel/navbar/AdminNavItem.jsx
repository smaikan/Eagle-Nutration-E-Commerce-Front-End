import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavItem = ({text,to}) => {
  return (
    <Link to={to} className='flex items-center p-4 w-full h-16 text-white text-xl hover:bg-gray-500 transition-colors duration-300 font-sans '>{text}</Link>
  )
}

export default AdminNavItem