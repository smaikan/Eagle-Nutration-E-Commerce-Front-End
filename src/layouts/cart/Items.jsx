import { useDispatch } from "react-redux";
import { useCart, useCurrentauth } from "../../redux/Hooks";
import { Addcart, DecreaseCart, RemoveCart } from "../../redux/Cart";
import { toast } from "react-toastify";

const Items = () => {
  const dispatch = useDispatch();
  const account = useCurrentauth();
  const Cartlist = useCart();
  const addCart = async (product,Select) => {
    if (account && Object.keys(account).length > 0) {
      try {
        const response = await fetch(`http://localhost:5042/api/cart/add?productId=${product.productId}&userId=${account.id}&aroma=${Select}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
  
  
        if (!response.ok) {
          throw new Error('Sepete ekleme başarısız.');
        }
  
        dispatch(Addcart({ 
    productId: product.productId,
    quantity: 1,
    unitPrice: product.price,
    productName: product.name,
    productImage: product.productImage,
    aroma: Select,
    totalPrice:product.totalPrice
  }));
  
       
  
       
  
      } catch (error) {
        
        toast.error("Sunucu hatası: " + error.message, {
          position: "bottom-right",
          autoClose: 6000,
        });
      }
  
    } else {
      toast.error("Önce hesaba giriş yapın!", {
        position: "bottom-right",
        autoClose: 6000,
      });
    }
  };
  const handleRemove = async (remove,productId, aroma) => {
    try {
      const response = await fetch(
        `http://localhost:5042/api/cart/${remove}?productId=${productId}&userId=${account.id}&aroma=${aroma}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }
if(remove == "remove") { dispatch(RemoveCart({ productId, aroma }));}
if(remove == "decrease") {dispatch(DecreaseCart({ productId, aroma }))}

     
    } catch (error) {
      toast.error("Silme işlemi başarısız: " + error.message, {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  console.log(Cartlist);

  return (
    <div className="flex flex-col">
      {Cartlist.map((item) => (
        <div
          key={`${item.productId}-${item.aroma}`}
          className="w-[970px] h-[145px] box-border flex gap-5 py-5 px-4 border-b-[1px] border-gray-300"
        >
          <div>
            <div className="w-[100px] h-[100px]  ">
              <img
                className="object-cover  w-full h-full"
                src={item.productImage}
                alt=""
              />
            </div>
          </div>
          <div className="flex w-full h-full gap-6 flex-col">
            <div className="flex w-full">
              <div className=" text-gray-600 text-lg mb-3 font-semibold">
                {item.productName}
              </div>

              <span className="text-lg ml-7 text-gray-500">
                <div>({item.aroma != "" ? item.aroma : "Aromasız"})</div>
              </span>
            </div>

            <div className="flex flex-col h-full w-full -translate-y-2 justify-between">
              <div className="flex">
                <div className="flex -translate-y-6">
                  <img
                  className="bg-gray-300  p-1 cursor-pointer"
                  onClick={() => handleRemove("decrease",item.productId, item.aroma)}
                    src="https://img.icons8.com/material-outlined/24/minus.png"
                    width={24}
                    height={24}
                    alt="Eksilt"
                  />
                  <div className="px-3  bg-gray-400">{item.quantity}</div>
                  <img
                  className="bg-gray-300  p-1 cursor-pointer"
                  onClick={() => addCart(item, item.aroma)}
                    src="https://img.icons8.com/android/24/plus.png"
                    width={24}
                    height={24}
                    alt="Arttır"
                  />
                </div>
              </div>

              <div className="flex h-9  justify-between">
                <div
                  onClick={() => handleRemove("remove",item.productId, item.aroma)}
                  className="text-red-700 underline cursor-pointer"
                >
                  Kaldır
                </div>
                <div className="text-red-700">{item.totalPrice} TL</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
