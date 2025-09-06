import React, { useEffect, useState } from "react";
import { useCurrentauth } from "../../../redux/Hooks";
import OrderCard from "./OrderCard";

const OrderHistory = ({id = null}) => {
  const [orders, setOrders] = useState([]);
  const user = useCurrentauth();
  const userId = id ?? user.id;
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");



  useEffect(() => {
 if (!userId) {
      setOrders([]);
      setLoading(false);
      setErr("Kullanıcı bulunamadı (giriş gerekli olabilir).");
      return;
    }

    const ac = new AbortController();


    const fetchOrders = async () => {

      try {
        setLoading(true);
      setOrders([]);
        const response = await fetch(
          `http://localhost:5042/api/Order/user/${userId}`
        );
        if (!response.ok) throw new Error("Siparişler alınamadı.");
        const data = await response.json();
        setOrders(data);
       
      } catch (error) {
        setErr(error.message || "Bir hata oluştu");
      }
      finally{
         setLoading(false)
      }
    };

    if (userId) {
      fetchOrders();
    }

     return () => ac.abort();
     
  }, [userId]);
console.log(1 , orders)
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-600">Geçmiş Siparişler</h1>

      {loading && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center text-zinc-300">
          Yükleniyor…
        </div>
      )}

      {!!err && !loading && (
        <div className="rounded-2xl border border-rose-800 bg-rose-950/40 p-4 text-rose-200">
          Hata: {err}
        </div>
      )}

      {!loading && !err && orders.length === 0 && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center text-zinc-300">
          Henüz sipariş bulunamadı.
        </div>
      )}

      <div className="space-y-4">
        {orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map((o) => (
          <OrderCard key={o.orderId} order={o} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
