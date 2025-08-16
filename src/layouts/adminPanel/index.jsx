
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import { ToastContainer } from 'react-toastify';

  const AdminPanel = () => {
  return (
    <div className='flex min-h-screen'>
        <Navbar/>
        <Outlet/>
           <ToastContainer/>
    </div>
  )
}

export default AdminPanel;
