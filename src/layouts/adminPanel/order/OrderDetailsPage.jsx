import React from "react";

const OrderDetailsPage = ({ details }) => {
  if (!details || details.length === 0) {
    return <p className="text-gray-500">Sipariş detayları bulunamadı.</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">Sipariş Detayları</h2>

      {details.map((item, index) => (
        <div
          key={index}
          className="flex items-center border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
        >
          {/* Ürün görseli */}
          <img
            src={item.productImage}
            alt={item.productName}
            className="w-20 h-20 object-cover rounded-md mr-4"
          />

          {/* Ürün bilgileri */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{item.productName}</h3>
            <p className="text-sm text-gray-600">Aroma: {item.aroma}</p>
            <p className="text-sm text-gray-600">
              Adet: {item.quantity} × {item.unitPrice} ₺
            </p>
            <p className="font-bold text-blue-600">
              Toplam: {item.quantity * item.unitPrice} ₺
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailsPage;
