import React, { useEffect, useState } from 'react'
import { useAuths } from '../../../redux/Hooks'
import { toast, ToastContainer } from 'react-toastify'
import Modal from '../../modal'
import OrderHistory from '../../usersettings/orderhistory'

const UserList = () => {
  const accountsarray = useAuths()
 const accounts = accountsarray[0] || []
const [isOpen, setIsOpen] = useState(false)
 const [allUser, setAllUser] = useState([]);
 
 useEffect(() => {
   setAllUser(accounts);
 }, [accounts]);
 
 console.log("liste:", accounts)

const handleDelete = async (uid) => {
  try {
    const res = await fetch(`http://localhost:5042/api/users/${uid}`, {
      method: 'DELETE',
    });

    if (!res.ok) console.log(res.status)

setAllUser(prev => prev.filter(p => p.id !== uid));
console.log("ikinci" , allUser)
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
      <div className='flex justify-between'><h2 className="text-xl font-bold mb-4">Kullanıcı Listesi</h2>


  <input
    type="text"
    placeholder="Ara..."
    className="ml-28 mt-auto w-15 h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
  />
     
      <button  className="self-center bg-green-500 w-28 h-10 hover:bg-green-600 text-white  px-2 py-1 rounded font-bold text-sm">Kullanıcı ekle</button>
      </div>
    <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left text-gray-700 bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Kullanıcı ID</th>
              <th className="px-4 py-2 border">Kullanıcı adı</th>
              <th className="px-4 py-2 border">E-Posta</th>
              <th className="px-4 py-2 border">Parola</th>
              <th className="px-4 py-2 border">Rol</th>
              <th className="px-4 py-2 border">Siparişler</th>
              <th className="px-4 py-2 border">İşlem</th>
            </tr>
          </thead>
          <tbody>
            
    
      { allUser.map( account =>(
        <tr  key={account.id}  className="hover:bg-gray-50">
<td className="px-4 py-2 border">{account.id}</td>
              <td className="px-4 py-2 border text-pink-500 font-semibold">{account.userName}</td> 
              <td className="px-4 py-2 border text-pink-500 font-semibold">{account.email}</td> 
              <td className="px-4 py-2 border text-pink-500 font-semibold">{account.userPassword}</td> 
              <td className="px-4 py-2 border">
                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded">{account.role}</span>
              </td>
              <td className="px-4 py-2 border">
                <span onClick={() => setIsOpen(true)} className="cursor-pointer select-none px-5 py-2 bg-blue-600 text-white text-xs font-semibold rounded">Siparişler</span>
               <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}> <main className="flex-1  h-[80vh] overflow-y-auto"><OrderHistory id={account.id} /> </main> </Modal>
              </td>
              <td className="px-4 py-2 border space-x-1">
                            
                <button onClick={()=>handleDelete(account.id)} className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded">Sil</button>
                
              </td>
               </tr>
      ))
              
              }
           
            
           
            
          </tbody>
        </table>
      </div>
      <ToastContainer/>
      </div>
  )
}

export default UserList