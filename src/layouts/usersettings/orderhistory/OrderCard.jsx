import React, { useState } from 'react'
import OrderItemsTable from './OrderItemsTable';

const OrderCard = ({ order }) => {
const [open, setOpen] = useState(false);
const details = order?.orderDetails || [];

console.log("card:" , order)

return (
<div className="rounded-2xl border-2 border-gray-600 bg-gray-100 shadow-xl">
<div className="p-4 sm:p-6">
<div className="flex items-start justify-between">
<div>
<span className="inline-flex items-center rounded-full bg-blue-400 px-2.5 py-0.5 text-xs font-medium text-white">
{order?.orderStatus || "Durum Yok"}
</span>
<h3 className="mt-2 text-lg font-semibold text-gray-600">Tutar: {order.totalPrice} TL</h3>
<p className="text-sm text-zinc-400">{new Date(order?.orderDate).toLocaleString("tr-TR")}</p>
</div>
<button
onClick={() => setOpen((v) => !v)}
className="rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-700"
>
{open ? "Detayları Gizle" : "Detayları Göster"}
</button>
</div>


<div className="mt-4 grid gap-3 sm:grid-cols-2">
<div>
<p className="text-xs uppercase tracking-widest text-zinc-800">Teslimat Adresi</p>
<p className="mt-1 text-sm text-gray-600">{order?.shippingAddress?.address}</p>
<p className="text-sm text-gray-400">
{order?.shippingAddress?.neighbor}, {order?.shippingAddress?.district}, {order?.shippingAddress?.province}
</p>
</div>
<div className="sm:text-right">
<p className="text-xs uppercase tracking-widest text-zinc-500">SİPARİŞ NUMARASI</p>
<p className="text-xs text-zinc-500"> #{order?.orderId}</p>
</div>
</div>


{open && <OrderItemsTable details={details} />}


{open && (
<div className="mt-3 flex items-center justify-end">
<div className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold text-white">
Genel Toplam: {order.totalPrice} TL
</div>
</div>
)}
</div>
</div>
);
}

export default OrderCard;
