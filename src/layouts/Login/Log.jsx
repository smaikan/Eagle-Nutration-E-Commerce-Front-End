import React, { useState } from 'react'
import { useAuths, useCurrentauth } from '../../redux/Hooks'
import { UpdateAuth } from '../../redux/Auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Log = ({setlogin,isAdmin}) => {

  const [formData, setFormdata] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const accountsarray = useAuths();
  const accounts = accountsarray[0]
  const current = useCurrentauth();
  const navigate = useNavigate();

console.log(accounts)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value 
    });
  };
  
  const Submit = () => {
    const account = accounts.find(account => account?.email === formData.email && account?.userPassword === formData.password);
    console.log(account)
    if (account && formData.email!='' && formData.password!='') {
      
      dispatch(UpdateAuth({
        id: account.id,
        name: account.userName,
        email: account.email,
        password: account.userPassword,
        address: account.userAddress,
        phone: account.userPhone,
        role: account.role
      }));
      
      navigate('/');
    } else {
      toast.error("Giriş yapılamadı!", {
        position: "bottom-right",
        autoClose: 6000,
      });
    };

    
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        Submit();
      }
    };

console.log("giriş bilgileri  " , current)
  return (
    <div  onKeyDown={(e)=>handleKeyDown(e)} className="transition-all  w-[550px] border-0 border-gray-600 h-max rounded-lg flex justify-center ">
    <div className="w-[450px]  flex flex-col ">
      <div className=" mt-10 mb-14 text-gray-600 text-5xl font-extrabold text-center">
        Giriş yap
      </div>
      <div className=" flex flex-col">
        <div className="text-gray-600 text-xl font-bold mb-2">E-mail</div>
        <input
        onChange={(e)=>handleChange(e)}
        name='email'
          className="border-2 border-gray-600 bg-transparent outline-none rounded-xl px-6 mb-6 h-12"
          type="text"
          placeholder="E-mail"
          value={formData.email}
        />
        <div className="text-gray-600 text-xl font-bold mb-2">Şifre</div>
        <input
        onChange={(e)=>handleChange(e)}
        name='password'
          className="border-2 border-gray-600 bg-transparent outline-none rounded-xl px-6 mb-8 h-12"
          type="password"
          placeholder="Şifre"
          value={formData.password}
        />
      </div>
      <buttons className='flex justify-between'>
    
     <div onClick={()=>Submit()} className="cursor-pointer mb-10 mt-1 font-extrabold text-2xl rounded-full flex justify-center items-center text-white  w-48 h-14 bg-gray-600">
        Giriş
      </div>
    
      <div onClick={()=>setlogin(false)} className=" cursor-pointer mb-10 mt-1 font-extrabold text-2xl rounded-full flex justify-center items-center text-white  w-60 h-14 bg-gray-600">
        Üye ol
      </div>
      </buttons>
      
    </div>
      <ToastContainer />
  </div>
  )
}

export default Log