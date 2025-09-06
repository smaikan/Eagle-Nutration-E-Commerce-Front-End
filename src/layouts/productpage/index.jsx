import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Aroma from './aroma'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { Addcart } from '../../redux/Cart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAllProducts, useCart, useCurrentauth } from '../../redux/Hooks';




const Productpage = () => {
    const {id} = useParams()
    const Allitem = useAllProducts()
    const product = Allitem.find(item=>item.productId == id)
    const cart = useCart()
    const item = cart.find((c)=>c.productId===id && c.aroma === product.productAroma)
    const user = useCurrentauth()
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    console.log(product)
    const [Select,setSelect] = useState("")

    const dispatch=useDispatch()

     if(Allitem.length == 0){
      return null
     }

    const addCart = async () => {
  if (user && Object.keys(user).length > 0) {
    try {
      const response = await fetch(`http://localhost:5042/api/cart/add?productId=${product.productId}&userId=${user.id}&aroma=${Select}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });



      if (!response.ok) {
        throw new Error('Sepete ekleme başarısız.');
      }
const existingQuantity = item ? item.quantity + 1 : 1;
const totalPrice = product.price * existingQuantity;

      dispatch(Addcart({ 
  productId: product.productId,
  quantity: 1,
  unitPrice: product.price,
  productName: product.name,
  productImage: product.productImage,
  aroma: Select,
  totalPrice: totalPrice
}));

      toast.success("Sepete eklendi", {
        position: "bottom-right",
        autoClose: 3000,
      });

     

    } catch (error) {
      
      toast.error("Sunucu hatası: " + error.message, {
        position: "bottom-right",
        autoClose: 6000,
      });
    }

  } else {
    toast.error("Önce hesaba giriş yapın!", {
      position: "bottom-right",
      autoClose: 6000,
    });
  }
};
  return (
    <div>
        <div className='flex gap-72 pl-36 py-20'>
             <div className='w-[500px] h-[500px]'><img className='object-cover  w-full h-full' src={product.productImage} alt="" /></div>
            <div className='flex flex-col box-border w-[450px]'>
                <div className='text-4xl font-bold'>{product.name}</div>
                <div className='flex mt-2'><span className='flex gap-0.5'><FontAwesomeIcon  icon={faStar} className="block w-5 h-5 text-yellow-400 "/><FontAwesomeIcon  icon={faStar} className="block w-5 h-5 text-yellow-400 "/><FontAwesomeIcon  icon={faStar} className="block w-5 h-5 text-yellow-400 "/><FontAwesomeIcon  icon={faStar} className="block w-5 h-5 text-yellow-400 "/><FontAwesomeIcon  icon={faStar} className="block w-5 h-5 text-yellow-400 "/></span> <span className='mt-[-4px] ml-1 text-lg'>(258)</span></div>
               {product.productAroma.length > 0 && <Aroma Select={Select} setSelect={setSelect} product={product.productAroma} />}
                <div className='text-gray-600 font-bold mt-6 text-lg underline'>Ürün detayı</div>
                <div className='mt-3 text-gray-500 text-lg '>{product.description}</div>
                
                <div className='mt-7 text-3xl font-bold text-red-600'>{product.price} TL</div>
                <div onClick={()=>{addCart()}} className='text-gray-200 select-none font-bold text-lg cursor-pointer flex items-center justify-center mt-7 w-72 h-12 bg-blue-800'>Sepete Ekle</div>

            </div> 
        </div>
       <ToastContainer/>
    </div>
  )
}

export default Productpage