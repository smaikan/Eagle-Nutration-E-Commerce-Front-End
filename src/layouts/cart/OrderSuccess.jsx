import React from 'react'
import { useAllProducts } from '../../redux/Hooks'

const OrderSuccess = ({ setIsOpen, order }) => {
  const products = useAllProducts()

  
  const details = Array.isArray(order?.orderDetails)
    ? (Array.isArray(order.orderDetails[0]) ? order.orderDetails[0] : order.orderDetails)
    : []

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold">SİPARİŞ OLUŞTURULDU</h2>

      <div className="mt-4 w-full max-w-xl space-y-4">
        {details.map((item, idx) => {
          const product = products.find(p => p.productId === item.productId)

          return (
            <div
              key={`${item.productId}-${idx}`}
              className="flex items-center gap-4 rounded-xl border p-3"
            >
              <img
                className="h-20 w-20 rounded object-cover"
                src={product?.productImage}
                alt={product?.name || product?.productName || 'Ürün görseli'}
              />

              <div className="flex flex-col">
                <span className="font-medium">
                  {product?.name || product?.productName || `Ürün #${item.productId}`}
                </span>
                <span className="text-sm text-gray-600">Adet: {item.quantity}</span>
                {item.aroma && (
                  <span className="text-sm text-gray-600">Aroma: {item.aroma}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen?.(false)}
        className="mt-6 rounded-xl bg-black px-4 py-2 text-white"
      >
        Kapat
      </button>
    </div>
  )
}

export default OrderSuccess
