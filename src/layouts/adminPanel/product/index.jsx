import { useEffect, useState } from 'react'

import EditProduct from '../editproduct';
import Modal from '../../modal';
import AddProduct from '../addproduct';
import { useAllProducts } from '../../../redux/Hooks';

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  
  const Allitem = useAllProducts()

  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleEdit = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  

  return (
    <div className="p-4 pl-10">
      <div className='flex justify-between'><h2 className="text-xl font-bold mb-4">Ürün Listesi</h2>
      <button onClick={()=>setIsModalAdd(true)} className="self-center bg-green-500 w-28 h-10 hover:bg-green-600 text-white  px-2 py-1 rounded font-bold text-sm">Ürün ekle</button>
      <Modal isOpen={isModalAdd} onClose={() => setIsModalAdd(false)}> <AddProduct/> </Modal>
      </div>
  
  <div className="overflow-x-auto">
    <table className="min-w-full border text-sm text-left text-gray-700 bg-white shadow">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border">Ürün Adı</th>
          <th className="px-4 py-2 border">Ürün Kategorisi</th>
          <th className="px-4 py-2 border">Ürün Fiyatı</th>
          <th className="px-4 py-2 border">KDV</th>
          <th className="px-4 py-2 border">Stok</th>
          <th className="px-4 py-2 border">Öne Çıkar</th>
          <th className="px-4 py-2 border">Durum</th>
          <th className="px-4 py-2 border">İşlem</th>
         
        </tr>
      </thead>
      <tbody>
        {Allitem.map(product =>(
<tr key={product.productId} className="hover:bg-gray-50">
          <td className="px-4 py-2 border">{product.name}</td>
          <td className="px-4 py-2 border text-pink-500 font-semibold">{product.category.name}</td>
          <td className="px-4 py-2 border">{product.price} TL</td>
          <td className="px-4 py-2 border">%8</td>
          <td className="px-4 py-2 border">{product.stock}</td>
          <td className="px-4 py-2 border">
            <span className="px-2 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded">EVET</span>
          </td>
          <td className="px-4 py-2 border">
            <span className="px-2 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded">AKTİF</span>
          </td>
          <td className="px-4 py-2 border space-x-1">
            <button onClick={()=>handleEdit(product.productId)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded">Düzenle</button>
            <Modal  isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EditProduct isOpen={setIsModalOpen} id={selectedProductId}/>
      </Modal>
            <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded">Sil</button>
            
          </td>
          
          
        </tr>
        
        ))}
        
      </tbody>
    </table>
  </div>
</div>

  )
}

export default AdminProduct