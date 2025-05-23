import { useCart } from '../../redux/Hooks'

const Buy = () => {
  const Cartlist = useCart()

  const Sumprice=()=>{
    let sum = 0;
    Cartlist.map(item=>{
      const price=item.price
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
        <div className='mb-24 mt-4 cursor-pointer flex justify-center items-center rounded-full h-14 w-full text-2xl text-gray-200 font-bold bg-red-600'>
        SATIN AL
        </div>

    </div>
  )
}

export default Buy