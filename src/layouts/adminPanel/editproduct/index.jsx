import React, { useEffect, useState } from 'react'
import { useAllProducts } from '../../../redux/Hooks';
import { toast } from 'react-toastify';


const EditProduct = ({id,isOpen,Items,setItems}) => {
 let item =Items.find(product => product.productId === id);
  
 
  const categoryName = (id) =>
    {const categoryNames = {

       1: "Protein",
       2: "Hacim",
       3: "Zayıflama",
       4: "Performans",
       5: "Giyim",
       6: "Aksesuar"
     };
 
     let Name = categoryNames[id] || "";
    return Name
    }
 
 
   
  
  
const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(item.productCategoryId);
console.log(selectedCategoryId)
  useEffect(() => {
      fetch("http://localhost:5042/api/categories")
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.error("Kategori çekme hatası:", err));
    }, []);





  const [isEditing, setIsEditing] = useState({
    name: false,
    category: false,
    description: false,
    img: false,
    price: false,
    stock: false
  });

const handleSubmit = () => {
    fetch(`http://localhost:5042/api/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error('Bir hata oluştu');
        return res.text;
      })
      .then(updatedProduct => {
        setIsEditing({
          name: false,
          category: false,
          description: false,
          img: false,
          price: false,
          stock: false
        });
      //  const deneme = {...form, category:{categoryId:form.productCategoryId, name:categoryName(form.productCategoryId)}}
 
setItems(prev =>
  prev.map(p =>
    p.productId === id
      ? {
          ...p, 
          name: form.productName,
          price: form.productPrice,
          description: form.productDescription,
          productImage: form.productImage,
          productAroma: form.productAroma,
          stock: form.stock,
          category: {
            categoryId: form.productCategoryId,
            name: categoryName(form.productCategoryId),
          },
          productCategoryId: form.productCategoryId,
        }
      : p
  )

 
);

      console.log('Kategori adı:', categoryName(form.productCategoryId));
 console.log("form:" , form)
        isOpen(false)
      })
      .catch(err => {
        console.error(err);
        toast.error("Ürün güncellenemedi.", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

      
 


const [form, setForm] = useState();
useEffect(() => {
  if (item) {
    setForm({
    productImage: item.productImage || '',
    productName: item.name || '',
    productPrice: item.price || 0,
    stock: item.stock || 0,
    productDescription: item.description || '',
    productAroma: item.productAroma || [],
    productCategoryId: item.productCategoryId || 0,
    });
  }
}, [item]);
  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e, field) => {
    let value = e.target.value;
    if (field === "stock" || field === "price") value = Number(e.target.value);
    if (field === "productAroma") {
      value = e.target.value.split(',').map(item => item.trim()).filter(item => item.length > 0);
    }
    setForm(prev => ({
      ...prev,
      [field]: value,
      productCategoryId: selectedCategoryId
    }));
  };
 
  if (!Items || Items.length === 0) {
    return <p>Ürünler yükleniyor...</p>;
  }

  return (
    <div className='h-auto w-auto flex flex-col gap-10 items-center  justify-center'>
        <div className=' flex flex-col gap-6 items-center  justify-center' >
{isEditing.img ? (<div className='flex'><input
              value={form.productImage}
              onChange={(e) => handleChange(e, 'productImage')}
              className="border border-gray-300 rounded px-2 py-1"
            />
             </div>
            
          ) : ( <div className='flex flex-col justify-center items-center'><div  className='h-36 w-36 '><img className='object-cover' src={item.productImage} alt="" /> </div>
            <button onClick={()=>handleEditToggle("img")} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
  Düzenle
</button></div>
            
         )}

       <div>{isEditing.name ? (<div className='flex'><input
              value={form.productName}
              onChange={(e) => handleChange(e, 'productName')}
              className="border border-gray-300 rounded px-2 "
            />
             </div>
            
          ) : ( <div className='flex flex-col items-center justify-center'><div><span className='font-bold'>Ürün adı:</span> {item.name} </div>
            <button onClick={()=>handleEditToggle("name")} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
  Düzenle
</button></div>
            
         )}  </div>

       <div>{isEditing.category ? (<div className='flex'><select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(Number(e.target.value))} className="border rounded p-2">
                <option value=''>Kategori Seçin</option>
                {categories.map(cat => (
                  <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
                ))}
              </select>
             </div>
            
          ) : ( <div className='flex flex-col items-center justify-center'><div><span className='font-bold'>Kategori:</span> {item.category.name} </div>
            <button onClick={()=>handleEditToggle("category")} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
  Düzenle
</button></div>
            
         )} </div>
       <div>
        {isEditing.description ? (<div className='flex flex-col items-center justify-center'><textarea
              value={form.productDescription}
              onChange={(e) => handleChange(e, 'productDescription')}
              className="border border-gray-300 w-60 h-28 whitespace-normal rounded px-2"
            />
             </div>
            
          ) : ( <div className='flex flex-col items-center justify-center'><div>{item.description} </div>
          <button onClick={()=>handleEditToggle("description")} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
  Düzenle
</button>
            </div>
            
         )} 
</div> <div>{isEditing.price ? (<div className='flex'><input
              value={form.productPrice}
              onChange={(e) => handleChange(e, 'productPrice')}
              className="border border-gray-300 rounded px-2 "
            />
            </div>
            
          ) : ( <div className='flex flex-col items-center justify-center'><div> <span className='text-red-500'>Fiyat: </span>{item.price} TL</div>
            <button onClick={()=>handleEditToggle("price")} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
  Düzenle
</button></div>
            
         )}</div><div>
          {isEditing.stock ? (<div className='flex'><input
              value={form.stock}
              onChange={(e) => handleChange(e, 'stock')}
              className="border border-gray-300 rounded px-2 "
            />
            </div>
            
          ) : ( <div className='flex flex-col items-center justify-center'><div> <span className='text-blue-500'>Stok: </span>{item.stock}</div>
            <button onClick={()=>handleEditToggle("stock")} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
  Düzenle
</button></div>
            
         )}
         </div>
         
         <div>
          {isEditing.aroma ? (
            <div className='flex'>
              <input onChange={(e) => handleChange(e, "productAroma")} placeholder="Aromaları girin (Virgülle ayırarak)" className="border border-gray-300 rounded px-2 py-1" />
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <div><span className='text-green-500'>Aromalar: </span>{item.productAroma.join(', ')}</div>
              <button onClick={() => handleEditToggle("aroma")} className="rounded-md bg-slate-800 py-2 px-4 text-sm text-white">Düzenle</button>
            </div>
          )}
        </div>

          </div>
        <button onClick={()=> handleSubmit()} className="rounded-md bg-blue-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  hover:bg-slate-700  " type="button"> KAYDET </button>
    </div>
  )
}

export default EditProduct