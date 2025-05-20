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

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5042/api/product");
      const allData = await res.json();
      const prores = await fetch("http://localhost:5042/api/product/category/1");
      const proteinData = await prores.json();
      const hacres = await fetch("http://localhost:5042/api/product/category/2");
      const hacimData = await hacres.json();
      const zayifres = await fetch("http://localhost:5042/api/product/category/3");
      const zayiflamaData = await zayifres.json();
      const perres = await fetch("http://localhost:5042/api/product/category/4");
      const performansData = await perres.json();
      const giyres = await fetch("http://localhost:5042/api/product/category/5");
      const giyimData = await giyres.json();
      const aksres = await fetch("http://localhost:5042/api/product/category/6");
      const aksesuarData = await aksres.json();
      dispatch(setProducts({
        all: allData,
  protein: proteinData,
  hacim: hacimData,
  performans: performansData,
  zayiflama: zayiflamaData,
  giyim: giyimData,
  aksesuar: aksesuarData,
    }));
    };
    fetchProducts();
  }, [dispatch]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      
      
      <Routes>
      
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="protein" element={<Proteins />} />
          <Route path="cart" element={<Cart />} />
          <Route path="performance" element={<Performance />} />
          <Route path="hacim" element={<Hacim />} />
          <Route path="zayiflama" element={<Zayiflama />} />
          <Route path="giyim" element={<Giyim />} />
          <Route path="aksesuar" element={<Aksesuar />} />
          <Route path="product/:id" element={<Productpage />} />
        </Route>

        
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="product" element={<AdminProduct />} />
         
        </Route>
        <Route path='/edit' element={<EditProduct/>}/>
      </Routes>

      <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
  );
}

export default App;
