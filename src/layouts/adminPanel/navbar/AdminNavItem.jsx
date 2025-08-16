import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminNavItem = ({text,to,onClick}) => {
  const navigate = useNavigate()
   const handleClick = () => {
    
    if (onClick) onClick();     
  
    if (to) navigate(`/${to}`);
  
  };
  return (
    <Link onClick={(e) => {e.preventDefault(); handleClick()}}  className='flex items-center p-4 w-full h-16 text-white text-xl hover:bg-gray-500 transition-colors duration-300 font-sans '>{text}</Link>
  )
}

export default AdminNavItem