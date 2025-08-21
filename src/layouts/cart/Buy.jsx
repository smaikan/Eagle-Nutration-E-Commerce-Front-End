import { useState } from 'react'
import { useCart, useCurrentauth } from '../../redux/Hooks'
import Modal from '../modal'
import UserInfo from '../usersettings/userinfo'
import OrderSuccess from './OrderSuccess'
import { useDispatch } from 'react-redux'
import { EmptyCart } from '../../redux/Cart'

const Buy = () => {
  const Cartlist = useCart()
  const user = useCurrentauth()
  const [order, setOrder] = useState({})
const [isModalOpen, setIsModalOpen] = useState(false);
const dispatch = useDispatch();


console.log(Cartlist)

  const emptyCart = async () => {
  try {
    const response = await fetch(`http://localhost:5042/api/Cart/empty?userId=${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Sepeti boşaltma başarısız!");
    }

    const result = await response.text();
    console.log("Sepet boşaltıldı:", result);

   
     dispatch(EmptyCart())
  } catch (err) {
    console.error("Hata:", err.message);
  }
};

  const Buy = async ()=>{
if(Cartlist.length !== 0)
    {try{
      const response = await fetch(`http://localhost:5042/api/Order`,{
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
       
        userId: 3,
        shippingAddress: user.address,
        orderDetails:
          Cartlist.map(item => ({
      productId: item.productId,
      productName:item.productName,
      productImage:item.productImage,
      quantity: item.quantity,
      aroma: item.aroma || "Aromasız",
      unitPrice: item.unitPrice
          }))
      }),
      }
      );
      if (!response.ok) {
        throw new Error('Başarısız.');
      }
        const Order = await response.json()
        setOrder(Order)
        emptyCart();
      console.log("sipariş oluşturuldu: " , order)
      setIsModalOpen(true)
    }
    catch(error){
      setIsModalOpen(true)
      console.log(error)
    }
}else{
  console.log("Sepet boş")
}
  }

  const Sumprice= ()=>{
    let sum = 0;
    Cartlist.map(item=>{
      const price=item.totalPrice
      sum+=price
    })
    return sum
  }

  return (
    <div className=' border-l-[1px] border-gray-300 w-[450px] flex flex-col pl-7'>
        <div className='text-2xl text-gray-500 mb-4'>Toplam fiyat:<span className='text-3xl text-red-700'> {Sumprice()} TL</span></div>
        <div className='flex justify-between'>
            <input className='h-14 w-72 outline-none border-[1px] bg-transparent px-5  border-gray-400 rounded-lg' type="text" placeholder='İndirim kodu' />
            <div className='ml-2 flex justify-center items-center  text-gray-200 font-bold cursor-pointer rounded-lg h-14 w-32 bg-blue-800'>GÖNDER</div>
        </div>
        <div onClick={()=>Buy()} className='mb-24 mt-4 cursor-pointer flex justify-center items-center rounded-full h-14 w-full text-2xl text-gray-200 font-bold bg-red-600'>
        SATIN AL
        </div>
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

  
    <div className="flex items-center justify-between px-4 py-3 border-b sticky top-0 bg-white z-10">
      <h3 className="text-lg font-semibold">{!user?.address || !user?.phone ? "Eksik Veriler" : "Sipariş Tamamlandı"}</h3>
      <button
        onClick={() => setIsModalOpen(false)}
        className="rounded-md px-3 py-1.5 border"
      >
        Kapat
      </button>
    </div>

  
      <main className="flex-1  h-[80vh] overflow-y-auto">
 
          {(!user?.address || !user?.phone)
            ? <UserInfo isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            : <OrderSuccess order={order} setIsOpen={setIsModalOpen} />
          }
      </main>
</Modal>

    </div>
  )
}

export default Buy