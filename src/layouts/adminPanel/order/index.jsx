import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuths } from "../../../redux/Hooks";
import Modal from "../../modal";
import UserDetail from "./Detail";
import OrderSuccess from "../../cart/OrderSuccess";
import OrderDetailsPage from "./OrderDetailsPage";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [isOpen, setIsOpen] = useState(false);
    const [isOpenOrder, setIsOpenOrder] = useState(false);

  const auths = useAuths()[0];
  const [user, setUser] = useState({});
  const [selectedorder, setSelectedorder] = useState({})

  const findAuth = (id) => {
    const user = auths.find((a) => a.id == id);
    setUser(user ?? null);
    setIsOpen(true);
  };

  const findOrder = (id) => {
    const order = orders.find(o=>o.orderId == id)
    setSelectedorder(order.orderDetails)
    setIsOpenOrder(true);
  }

  const DeleteOrder = async (id) => {
    
      try {
        const res = await fetch(`http://localhost:5042/api/Order/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error(`Silinemedi (${res.status})`);
        
        const deletedorders = orders.filter(o=>o.orderId != id)
        setOrders(deletedorders)
        toast.success("Sipariş Silindi.");
        console.log("silndi.");
      } catch (e) {
        console.log(e.message);
        toast.error("Sipariş Silinemedi.");
      }
    };

    useEffect(() => {
      (async () => {
        try {
          setLoading(true);
          const res = await fetch("http://localhost:5042/api/Order");
          if (!res.ok) throw new Error(`Liste alınamadı (${res.status})`);
          const data = await res.json();
          setOrders(Array.isArray(data) ? data : []);
        } catch (e) {
          setErr(e.message);
          toast.error("Sipariş listesi alınamadı.");
        } finally {
          setLoading(false);
        }
      })();
    }, []);
    console.log(user);
    console.log(1,selectedorder);
    return (
      <div className="p-4 pl-10">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Kullanıcı Listesi</h2>

          <input
            type="text"
            placeholder="Ara..."
            className="ml-28 mt-auto w-15 h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />

          <button className="self-center bg-green-500 w-28 h-10 hover:bg-green-600 text-white  px-2 py-1 rounded font-bold text-sm">
            Kullanıcı ekle
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left text-gray-700 bg-white shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Sipariş Numarası</th>
                <th className="px-4 py-2 border">Kullanıcı ID - Detay</th>
                <th className="px-4 py-2 border">Tutar</th>
                <th className="px-4 py-2 border">Şehir</th>
                <th className="px-4 py-2 border">İlçe/Mahalle</th>
                <th className="px-4 py-2 border">Tam Adres</th>
                <th className="px-4 py-2 border">Tarih</th>
                <th className="px-4 py-2 border">Sipariş Durumu Güncelle</th>
                <th className="px-4 py-2 border">Siparişi Sil</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                .map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{order.orderId} {" "}
                      <button
                        onClick={() => findOrder(order.orderId)}
                        className="bg-blue-400 ml-4 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded"
                      >
                        Sipariş Detayları
                      </button>
                       <Modal isOpen={isOpenOrder} onClose={() => setIsOpenOrder(false)}>
                        <main className="flex-1  h-[80vh] overflow-y-auto">
                         <OrderDetailsPage details={selectedorder} />
                        </main>{" "}
                      </Modal>
                       </td>
                    <td className="flex items-center gap-2 px-4 py-2 border">
                      {order.userId}{" "}
                      <button
                        onClick={() => findAuth(order.userId)}
                        className="bg-blue-400 ml-4 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded"
                      >
                        Müşteri Detayları
                      </button>
                      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        {" "}
                        <main className="flex-1  h-[80vh] overflow-y-auto">
                          <UserDetail user={user} />{" "}
                        </main>{" "}
                      </Modal>
                    </td>
                    <td className="px-4 py-2 border text-green-500 font-semibold">
                      {order?.totalPrice} TL
                    </td>
                    <td className="px-4 py-2 border text-gray-600 font-semibold">
                      {order?.shippingAddress?.province}
                    </td>
                    <td className="px-4 py-2 border text-gray-600 font-semibold">
                      {order?.shippingAddress?.district +
                        "/" +
                        order.shippingAddress?.neighbor}
                    </td>
                    <td className="px-4 py-2 border text-gray-600 font-semibold">
                      {order?.shippingAddress?.address}
                    </td>
                    <td className="px-4 py-2 border text-pink-500 font-semibold">
                      {new Date(order?.orderDate + "Z").toLocaleString("tr-TR")}
                    </td>
                    <td className="px-4 py-2 border">
                      <span className="px-2 py-1 bg-green-200 text-green-800 text-xs font-semibold rounded">
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2 border space-x-1">
                      <button
                        onClick={() => DeleteOrder(order.orderId)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    );
  };


export default OrderManagement;
