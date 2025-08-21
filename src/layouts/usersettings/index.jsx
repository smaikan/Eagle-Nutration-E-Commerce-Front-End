import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const UserSettings = () => {
    
  return (
    <div className='flex min-h-screen'>
        <div className='h-screen  w-60 fixed top-[60px] left-0'>
          <Link to={"/user"}  className='flex mt-20 bg-gray-300 items-center p-4 w-full h-16 text-gray-600 text-xl hover:bg-gray-500 transition-colors duration-300 font-sans '>Kullanıcı Ayarları</Link>
          <Link to={"order"}  className='flex mt-3 bg-gray-300 items-center p-4 w-full h-16 text-gray-600 text-xl hover:bg-gray-500 transition-colors duration-300 font-sans '>Sipariş Geçmişi</Link>

        </div>

            <div className='w-full justify-self-center'> <Outlet /></div>
    </div>

  )
}

export default UserSettings