import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './layouts/productpage/list/Home';
import Proteins from './layouts/productpage/list/Proteins';
import Header from './components/header';
import Login from './layouts/Login';
import Productpage from './layouts/productpage';
import Cart from './layouts/cart';
import Footer from './components/footer';
import Performance from './layouts/productpage/list/Performance';
import Hacim from './layouts/productpage/list/Hacim';
import Zayiflama from './layouts/productpage/list/Zayiflama';
import Giyim from './layouts/productpage/list/Giyim';
import Aksesuar from './layouts/productpage/list/Aksesuar';

import AdminPanel from './layouts/adminPanel';


import MainLayout from './layouts/MainLayout';
import AdminProduct from './layouts/adminPanel/product';
import EditProduct from './layouts/adminPanel/editproduct';
import { useDispatch } from 'react-redux';
import { setProducts } from './redux/Products';
import { ToastContainer } from 'react-toastify';
import { Addauth } from './redux/Auth';
import { useCurrentauth } from './redux/Hooks';
import UserList from './layouts/adminPanel/user';
import { Getcart } from './redux/Cart';
import UserInfo from './layouts/usersettings/userinfo';
import UserSettings from './layouts/usersettings';
import OrderHistory from './layouts/usersettings/orderhistory';


function App() {

  const dispatch = useDispatch();
  const current = useCurrentauth();
  const [isAdmin,setAdmin] = useState(false);

 useEffect(() => {
        if(current?.role==="Admin")
        {setAdmin(true);} else{setAdmin(false)}
      }, [current]);

      useEffect(() => {
  console.log("Admin güncellendi:", isAdmin);
}, [isAdmin]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const [resAll, resProtein, resHacim, resZayiflama, resPerformans, resGiyim, resAksesuar] = await Promise.all([
        fetch("http://localhost:5042/api/product"),
        fetch("http://localhost:5042/api/product/category/1"),
        fetch("http://localhost:5042/api/product/category/2"),
        fetch("http://localhost:5042/api/product/category/3"),
        fetch("http://localhost:5042/api/product/category/4"),
        fetch("http://localhost:5042/api/product/category/5"),
        fetch("http://localhost:5042/api/product/category/6"),
      ]);

      const [
        allData,
        proteinData,
        hacimData,
        zayiflamaData,
        performansData,
        giyimData,
        aksesuarData
      ] = await Promise.all([
        resAll.json(),
        resProtein.json(),
        resHacim.json(),
        resZayiflama.json(),
        resPerformans.json(),
        resGiyim.json(),
        resAksesuar.json()
      ]);

      dispatch(setProducts({
        all: allData,
        protein: proteinData,
        hacim: hacimData,
        zayiflama: zayiflamaData,
        performans: performansData,
        giyim: giyimData,
        aksesuar: aksesuarData,
      }));
    } catch (err) {
      console.error("Ürünleri çekerken hata:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5042/api/users");
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }
      const allUsers = await res.json();
      dispatch(Addauth(allUsers));
    } catch (err) {
      console.error("Kullanıcıları çekerken hata:", err);
    }
  };
  console.log(current)
  const fetchCart = async () => {
    if (!current) return;
    try {
      const res = await fetch(`http://localhost:5042/api/cart/${current.id}`);
      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
      }
      const cart = await res.json();
            console.log(cart)

      dispatch(Getcart(cart));
    } catch (err) {
      console.error("Kullanıcıları çekerken hata:", err);
    }
  };
  fetchCart();
  fetchUsers();
  fetchProducts();
}, [dispatch,current]);

  
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      
      
      <Routes>
     { isAdmin ?
       <Route path="/" element={<AdminPanel />}>
          <Route path="product" element={<AdminProduct />} />
           <Route path="user" element={<UserList />} />
        </Route>  : 
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login isAdmin={setAdmin} />} />
          <Route path="protein" element={<Proteins />} />
          <Route path="cart" element={<Cart />} />
          <Route path="performance" element={<Performance />} />
          <Route path="hacim" element={<Hacim />} />
          <Route path="zayiflama" element={<Zayiflama />} />
          <Route path="giyim" element={<Giyim />} />
          <Route path="aksesuar" element={<Aksesuar />} />
           <Route path="user" element={<UserSettings />}>
           <Route index element={<UserInfo />} />
            <Route path="order" element={<OrderHistory/>}/>
          </Route>
          <Route path="product/:id" element={<Productpage />} />
        </Route>
         
}
      </Routes>
        

        
       

      
    </div>
  );
}

export default App;
