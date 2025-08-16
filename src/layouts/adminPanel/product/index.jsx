import { useEffect, useState } from 'react'

import EditProduct from '../editproduct';
import Modal from '../../modal';
import AddProduct from '../addproduct';
import { useAllProducts } from '../../../redux/Hooks';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';


const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
const reduxItems = useAllProducts() || []; 
const [searchTerm, setSearchTerm] = useState('');
const [Allitem, setAllitem] = useState([]);

useEffect(() => {
  setAllitem(reduxItems);
}, [reduxItems]);

  console.log(Allitem)

  const [selectedProductId, setSelectedProductId] = useState(null);
const filteredItems = Allitem.filter((product) =>
  product.name?.toLowerCase().includes(searchTerm.toLowerCase())
);

  const handleEdit = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:5042/api/product/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) console.log(res.status)

setAllitem(prev => prev.filter(p => p.productId !== id));

toast.success("Ürün başarıyla silindi.", {
      position: "top-right",
      autoClose: 2000,
    });
  } catch (err) {
    console.error(err);
    toast.error("Ürün silinemedi.", {
      position: "top-right",
      autoClose: 2000,
    });
  }
};

  

  

  return (
    <div className="p-4 pl-10">
      <div className='flex justify-between'><h2 className="text-xl font-bold mb-4">Ürün Listesi</h2>
      <input
      onChange={(e)=>setSearchTerm(e.target.value)}
      name='search'
    type="text"
    placeholder="Ara..."
    className="ml-28 mt-auto w-15 h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
  />
      <button onClick={()=>setIsModalAdd(true)} className="self-center bg-green-500 w-28 h-10 hover:bg-green-600 text-white  px-2 py-1 rounded font-bold text-sm">Ürün ekle</button>
      <Modal isOpen={isModalAdd} onClose={() => setIsModalAdd(false)}> <AddProduct setItems={setAllitem} isOpen={setIsModalAdd}/> </Modal>
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
        {filteredItems.map(product =>(
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
        <EditProduct Items={Allitem} setItems={setAllitem} isOpen={setIsModalOpen} id={selectedProductId}/>
      </Modal>
            <button onClick={()=>handleDelete(product.productId)} className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded">Sil</button>
            
          </td>
          
          
        </tr>
        
        ))}
        
      </tbody>
    </table>
  </div>
  <ToastContainer/>
</div>

  )
}

export default AdminProduct