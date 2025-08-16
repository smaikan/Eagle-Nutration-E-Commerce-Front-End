
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { faUser, faCartShopping, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAllProducts, useCart, useCurrentauth } from '../../../redux/Hooks';
import { DeleteAuth } from '../../../redux/Auth';
import { useDispatch } from 'react-redux';

export function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const Allitem = useAllProducts()
  const [search, setSearch] = useState(false);
  const Itemnamesid = Allitem.map(item => ({ name: item.name, id: item.productId }))
  const account = useCurrentauth()
  const cart = useCart();
  let cartsum = 0
  cart.forEach(c=> cartsum += c.quantity)
  const Changeacconut = () => {
    if (Object.keys(account).length > 0) { dispatch(DeleteAuth()) }
  }
  const Setvalue = (e) => {
    const changesearch = Itemnamesid.filter(itemname =>
      itemname.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (e.target.value === '' || changesearch.length === 0) {
      setSearch(false)
    }
    else (setSearch(changesearch))
  }
  console.log(search)
  return (
    <nav className=' box-border px-32 py-2 w-full h-min bg-gray-600 flex items-center justify-between'>
      <Link to='/' className='text-white text-3xl font-extrabold flex items-center '> EAGLE </Link>
      <div className='flex'>
        <src className='relative'>
          <src className='w-72 relative flex'>
            <FontAwesomeIcon className='text-gray-300 absolute left-3 self-center w-[30px] h-[20px]' icon={faSearchengin} />

            <input onBlur={() => setTimeout(() => setSearch(false), 250)} onChange={(e) => Setvalue(e)} className=' text-white outline-none pl-12 w-72 h-11 bg-transparent border-2 border-white rounded-full ' type="text" placeholder='Anahtar Kelime Ara' />
          </src>
          {search && <div className='absolute py-2 px-2 gap-2 z-10 rounded-xl w-full bg-white  '> {search.map((src, index) => {
            return (
              <Link key={index} className='py-2 z-50' to={`/product/${src.id}`}><div className='flex w-full flex-col px-2 text-black hover:bg-gray-200 rounded-lg transition duration-100' >  {src.name} </div></Link>
            )
          })} </div>}
        </src>



        <div className='ml-14 flex items-center gap-16'  >
         {account && Object.keys(account).length > 0 && <Link to='/userinfo' className='flex items-center gap-3'>
            <div className="relative w-fit">
              <FontAwesomeIcon className="w-7 -mb-[2px] h-7 text-white" icon={faFileLines} />
            </div>

            <span className='text-white self-center'>Hesap Bilgileri</span>
          </Link>}
          <Link onClick={() => Changeacconut()} to='/login' className='flex  items-center gap-3'>
            <FontAwesomeIcon className=' w-7 h-7 text-white ' icon={faUser} />
            <span className='text-white self-center '>{account && Object.keys(account).length > 0 ? 'Çıkış yap' : 'Giriş yap / Üye ol'}</span>
          </Link>
          <Link to='/cart' className='flex items-center gap-3'>
            <div className="relative self-center w-fit">
              <FontAwesomeIcon className="w-[1.9rem] h-[1.9rem] -mb-1 text-white" icon={faCartShopping} />
              {cart.length > 0 && Object.keys(account).length > 0 && <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full text-white flex justify-center items-center font-bold text-[9px]">{cartsum}</div>}
            </div>

            <span className='text-white self-center'>Sepete git</span>
          </Link>


        </div>

      </div>


    </nav>
  )
}
