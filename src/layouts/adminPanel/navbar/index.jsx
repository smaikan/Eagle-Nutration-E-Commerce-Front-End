import { useDispatch } from "react-redux"
import AdminNavItem from "./AdminNavItem"
import { useNavigate } from "react-router-dom"
import { DeleteAuth } from "../../../redux/Auth"
import { useAuths } from "../../../redux/Hooks"
import { useState } from "react"


const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const Logout =()=>{
    console.log("aaaaaaaa")
dispatch(DeleteAuth())

  }
  return (
    <div className='h-screen flex flex-col bg-gray-600 w-60 sticky top-0 left-0'>
      <AdminNavItem text='Ana Sayfa' to='product'/>
      <AdminNavItem text='Ürün Yönetimi' to='product'/>
      <AdminNavItem text='Kullanıcı Yönetimi' to='user'/>   
      <AdminNavItem text='Sipariş Yönetimi' to='ordermanagement'/>
      <div className="mt-auto mb-10"><AdminNavItem onClick={Logout} text='Çıkış Yap' to="login" /> </div>    
     
    </div>
  )
}

export default Navbar