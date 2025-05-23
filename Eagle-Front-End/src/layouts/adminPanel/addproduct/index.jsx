import { number } from 'prop-types';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const AddProduct = ({isOpen,setItems}) => {
  const [form, setForm] = useState({
    productImage: '',
      name:'',
      price:0,
      stock: 0,
      description: '',
      productAroma: [],
      productCategoryId: 0,
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState(0)
  const [categories, setCategories] = useState([]);

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
 

  
  const onSubmit = async () => {
  if (
    form.productImage === '' ||
    form.name === '' ||
    form.price === 0 ||
    form.stock === 0 ||
    form.description === '' ||
    form.productCategoryId === 0
  ) {
    toast.error("Tüm ürün bilgilerini girin.");
    console.log("boşş");
  } else {
    try {
      const response = await fetch('http://localhost:5042/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }

      toast.success("Ürün Eklendi.", {
        position: "top-right",
        autoClose: 2000,
      });
      let fakeid = Date.now()
setItems(prev => [
  ...prev,
  {
    ...form,
    productId: fakeid,
    category: {
      categoryId: form.productCategoryId,
      name: categoryName(form.productCategoryId)
    }
  }
]);


      isOpen(false); 
      

    } catch (error) {
      console.error("Hata:", error.message);
      toast.error("Ürün Eklenemedi.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }
}; 

 
  

    useEffect(() => {
      fetch("http://localhost:5042/api/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error("Kategori çekme hatası:", err));
    }, []);
  
      const handleChange = (e, field) => {
        let value = e.target.value 
        if( field === "stock" || field === "price" ){value = Number(e.target.value)} 
        if (field === "productAroma"){
      value = e.target.value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);};

    setForm((prev) => ({ ...prev, [field]: value, productCategoryId: selectedCategoryId }));
  }
  
console.log(form)
  return (
    <div className='flex flex-col items-center justify-center gap-10'>
        <div className='flex'><input onChange={(e)=>handleChange(e,"productImage")} placeholder="Resim URL'i girin" className="border border-gray-300 rounded px-2 py-1" /> </div>
<div className='flex'><input onChange={(e)=>handleChange(e,"name")} placeholder="Ürün adı girin" className="border border-gray-300 rounded px-2 py-1" /> </div>
<div className='flex'><select
      value={selectedCategoryId}
      onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
      className="border rounded p-2"
    >
      <option value=''>Kategori Seçin</option>
      {categories.map((cat) => (
        <option key={cat.categoryId} value={cat.categoryId}>
          {cat.name}
        </option>
      ))}
    </select> </div>
<div className='flex'><textarea onChange={(e)=>handleChange(e,"description")} placeholder="Ürün açıklaması girin" className="border w-52 h-28 border-gray-300 rounded px-2 py-1" /> </div>
<div className='flex'><input onChange={(e)=>handleChange(e,"price")} placeholder="Ürün fiyatı girin" className="border w-22 border-gray-300 rounded px-2 py-1" /></div>
<div className='flex'><input onChange={(e)=>handleChange(e,"stock")} placeholder="Stok bilgisi girin" className="border w-22 border-gray-300 rounded px-2 py-1" /></div>
<div className='flex'><input onChange={(e)=>handleChange(e,"productAroma")} placeholder="Aroma ekleyin (Virgülle ayırarak)" className="border w-22 border-gray-300 rounded px-2 py-1" /></div>
<button onClick={()=>onSubmit()} className="bg-blue-500 hover:bg-blue-600 w-28 h-10 text-white text-l px-2 py-1 rounded">KAYDET</button>
    </div>
  )
}

export default AddProduct