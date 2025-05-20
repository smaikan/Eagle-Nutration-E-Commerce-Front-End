import { useState } from 'react'
import { useAuths} from '../../redux/Hooks';
import { useDispatch } from 'react-redux';
import { Addauth,UpdateAuth } from '../../redux/Auth.js';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = ({setlogin}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    againpsw: ''
  });
  const dispatch = useDispatch();
  const accounts = useAuths();
  const navigate = useNavigate();
  
  



  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value 
    });
  };

  const Submit=()=>{
    const id=accounts.length+1
    if(formData.password === formData.againpsw && formData.password!='' && formData.againpsw && formData.email && formData.name){
      navigate('/');
      dispatch(Addauth(
      {
        id,
        name:formData.name.toLowerCase(),
        email:formData.email.toLowerCase(),
        password:formData.password.toLowerCase()

      }
    ))

    dispatch(UpdateAuth({
      id,
      name:formData.name.toLowerCase(),
      email:formData.email.toLowerCase(),
      password:formData.password.toLowerCase()

    }))
    
    }else {
          toast.error("Hatalı işlem!", {
            position: "bottom-right",
            autoClose: 6000, 
          });
        };
   


  }

  console.log(accounts)
  return (
    
    <div className="w-[550px] transition-all border-0 border-gray-600 rounded-lg flex justify-center ">
      <div className="px-5 w-[500px] flex flex-col ">
        <div className=" mb-10 text-gray-600 text-5xl font-extrabold text-center">
          Üyelik oluştur
        </div>
        <div className=" flex flex-col">
        <div className="text-gray-600 text-xl font-bold mb-2">Ad Soyad</div>
          <input
          onChange={(e)=>handleChange(e)}
            name='name'
            className="border-2 border-gray-600 bg-transparent outline-none rounded-xl px-6 mb-6 h-12"
            type="text"
            placeholder="Ad Soyad"
            value={formData.name}
          />
          <div className="text-gray-600 text-xl font-bold mb-2">E-mail </div>
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
          <div className="text-gray-600 text-xl font-bold mb-2">Şifre tekrarı</div>
          <input
           onChange={(e)=>handleChange(e)}
          name='againpsw'
            className="border-2 border-gray-600 bg-transparent outline-none rounded-xl px-6 mb-8 h-12"
            type="password"
            placeholder="Şifre"
            value={formData.againpsw}
          />
        </div>
        <buttons className='flex justify-between'>
          
          <div onClick={()=>Submit()} className="cursor-pointer mb-10 mt-1 font-extrabold text-2xl rounded-full flex justify-center items-center text-white  w-48 h-14 bg-gray-600">
          Üye ol
        </div>
           
        <div onClick={()=>setlogin(true)} className="cursor-pointer mb-10 mt-1 font-extrabold text-2xl rounded-full flex justify-center items-center text-white  w-60 h-14 bg-gray-600">
          Giriş yap
        </div>
        </buttons>
        
      </div>
      <ToastContainer />
    </div>
  
  )
}

export default Signup;