import { useDispatch } from "react-redux"
import AdminNavItem from "./AdminNavItem"
import { useNavigate } from "react-router-dom"
import { DeleteAuth } from "../../../redux/Auth"


const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const Logout =()=>{
    console.log("aaaaaaaa")
dispatch(DeleteAuth())

  }
  return (
    <div className='h-screen bg-gray-600 w-40 sticky top-0 left-0'>
      <AdminNavItem text='Ana Sayfa' to='product'/>
      <AdminNavItem text='Ürün Yönetimi' to='product'/>
      <AdminNavItem text='Kullanıcı Yönetimi' to='user'/>    
      <AdminNavItem onClick={Logout} text='Çıkış Yap' to="login" />    
    </div>
  )
}

export default Navbar