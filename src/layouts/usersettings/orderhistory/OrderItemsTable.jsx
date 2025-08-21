import React from 'react'

const OrderItemsTable = ({ details }) => {

return (
<div className="mt-5 overflow-hidden rounded-xl border border-gray-600">
<table className="min-w-full divide-y divide-gray-600">
<thead className="bg-gray-600">
<tr>
<th className="px-4 py-3 text-left text-xs font-semibold text-white">Ürün</th>
<th className="px-4 py-3 text-left text-xs font-semibold text-white">Aroma/Beden</th>
<th className="px-4 py-3 text-right text-xs font-semibold text-white">Adet</th>
<th className="px-4 py-3 text-right text-xs font-semibold text-white">Birim</th>
<th className="px-4 py-3 text-right text-xs font-semibold text-white">Ara Toplam</th>
</tr>
</thead>
<tbody className="divide-y divide-gray-600">
{details.map((l) => {
return (
<tr key={l.productId}>
<td className="px-4 py-3 text-sm text-gray-600">
<div className="flex items-center gap-3">
<img src={l.productImage} className="h-10 w-10 rounded object-cover" />
<div>
<div className="text-gray-600">{l.productName || `Ürün #${l.productId}`}</div>
</div>
</div>
</td>
<td className="px-4 py-3 text-sm text-gray-600">{l.aroma != "Aromasız" || "" ? l.aroma : "-"}</td>
<td className="px-4 py-3 text-right text-sm text-gray-600">{l.quantity}</td>
<td className="px-4 py-3 text-right text-sm text-gray-600">{l.unitPrice} TL</td>
<td className="px-4 py-3 text-right text-sm text-gray-600">{l.unitPrice * l.quantity} TL</td>
</tr>
);
})}
</tbody>
</table>
</div>
);
}

export default OrderItemsTable;