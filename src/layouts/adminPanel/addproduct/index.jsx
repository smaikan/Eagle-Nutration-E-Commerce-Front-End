import React from 'react'

const AddProduct = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-10'>
        <div className='flex'><input placeholder="Resim URL'i girin" className="border border-gray-300 rounded px-2 py-1" /> </div>
<div className='flex'><input placeholder="Ürün adı girin" className="border border-gray-300 rounded px-2 py-1" /> </div>
<div className='flex'><input placeholder="Ürün kategorisi seç" className="border border-gray-300 rounded px-2 py-1" /> </div>
<div className='flex'><textarea placeholder="Ürün açıklaması girin" className="border w-52 h-28 border-gray-300 rounded px-2 py-1" /> </div>
<div className='flex'><input placeholder="Ürün fiyatı girin" className="border w-22 border-gray-300 rounded px-2 py-1" /></div>
<button  className="bg-blue-500 hover:bg-blue-600 w-28 h-10 text-white text-l px-2 py-1 rounded">KAYDET</button>
    </div>
  )
}

export default AddProduct