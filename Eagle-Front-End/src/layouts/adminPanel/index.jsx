
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

  const AdminPanel = () => {
  return (
    <div className='flex min-h-screen'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default AdminPanel;
