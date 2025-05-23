
import Header from '../components/header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/footer'
import { useEffect, useState } from 'react';

const MainLayout = () => {
    const location = useLocation();
      const [isAdmin, setAdmin] = useState(false);
    
      useEffect(() => {
        setAdmin(location.pathname.startsWith('/admin'));
      }, [location.pathname]);
    
  return (
    <div>
        {!isAdmin && <Header />}
    <Outlet />
    {!isAdmin && <Footer />}    
    </div>
  )
}

export default MainLayout