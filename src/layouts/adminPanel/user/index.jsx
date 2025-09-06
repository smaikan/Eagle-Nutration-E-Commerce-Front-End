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
 const [form , setForm] = useState("")
 const [selectedUserId, setSelectedUserId] = useState(null);

 const ChangeRole = async (user)=>{
  const role = user.role == "User" ? "Admin" : "User";

   const confirmChange = window.confirm(`${user.userName} rolü ${role} olarak değiştirilsin mi?`);

  if (!confirmChange) return;

  try {
    var result = await fetch(`http://localhost:5042/api/Users/role?id=${user.id}&role=${role}`,{
      method:"PUT"
    })
    var res = await result.json()
    if(res == false){console.log("false döndü.")}

    console.log(user)
setAllUser(prev =>
  prev.map(o =>
    o.id === user.id
      ? { ...o, role: role }
      : o
  )
);
  } catch (error) {
    console.log(error)
  }
 }
 
 const change = (e)=>{
setForm(e)
 }

 useEffect(() => {
   setAllUser(accounts);

 }, [accounts]);



 const FilteredUser = allUser.filter((user) =>
  user.email?.toLowerCase().includes(form.toLowerCase())
);

 
 console.log("liste:", accounts)

const handleDelete = async (uid) => {
  const confirmChange = window.confirm(`${uid} numaralı kullanıcı silinecek. Onaylıyor musunuz? `);

  if (!confirmChange) return;
  
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
  onChange={(e)=>change(e.target.value)}
    type="text"
    placeholder="Ara..."
    className="ml-28 mt-auto w-15 h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
  />
     
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
            
    
      { FilteredUser.map( account =>(
        <tr  key={account.id}  className="hover:bg-gray-50">
<td className="px-4 py-2 border">{account.id}</td>
              <td className="px-4 py-2 border text-pink-500 font-semibold">{account.userName}</td> 
              <td className="px-4 py-2 border text-pink-500 font-semibold">{account.email}</td> 
              <td className="px-4 py-2 border text-pink-500 font-semibold">{account.userPassword}</td> 
              <td className="px-4 py-2 border">
<span
  onClick={() => ChangeRole(account)}
  className={`px-2 py-1 cursor-pointer select-none text-xs font-semibold rounded 
    ${account.role === "Admin" 
      ? "bg-red-200 text-red-800" 
      : "bg-green-200 text-green-800"}`}
>
  {account.role}
</span>
              </td>
              <td className="px-4 py-2 border">
                <span onClick={() =>{ setIsOpen(true); setSelectedUserId(account.id);}} className="cursor-pointer select-none px-5 py-2 bg-blue-600 text-white text-xs font-semibold rounded">Siparişler</span>
               <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}> <main className="flex-1  h-[80vh] overflow-y-auto"><OrderHistory id={selectedUserId} /> </main> </Modal>
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