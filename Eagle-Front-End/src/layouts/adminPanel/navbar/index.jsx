import AdminNavItem from "./AdminNavItem"


const Navbar = () => {
  return (
    <div className='h-screen bg-gray-600 w-40 sticky top-0 left-0'>
      <AdminNavItem text='Ana Sayfa' to='product'/>
      <AdminNavItem text='Ürün Yönetimi' to='product'/>
      <AdminNavItem text='Kullanıcı Yönetimi' to='product'/>    
      
    </div>
  )
}

export default Navbar