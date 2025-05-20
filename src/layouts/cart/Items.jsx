import { useDispatch } from "react-redux";
import { useCart } from "../../redux/Hooks";
import { RemoveCart } from "../../redux/Cart";

const Items = () => {
  const dispatch = useDispatch();

  const Cartlist = useCart();
  const handleRemove = (id) => {
    dispatch(RemoveCart(id));
  };
console.log(Cartlist)
  return (
    <div className="flex flex-col">
      {Cartlist.map((item, index) => (
        
        <div
          key={index}
          className="w-[970px] h-[150px] box-border flex gap-5 py-5 px-4 border-b-[1px] border-gray-300"
        >
          <div>
            <div className="w-[100px] h-[100px]  ">
              <img
                className="object-cover  w-full h-full"
                src={item.img}
                alt=""
              />
            </div>
          </div>
          <div className="flex w-full h-full gap-6 flex-col">
            <div className="flex w-full">
              <div className=" text-gray-600 text-lg mb-3 font-semibold">
                {item.name}
              </div>
              <span className="text-lg ml-7 text-gray-500">{item.aroma && <div>({item.aroma})</div>}</span>
            </div>

            <div className="flex flex-col h-full w-full justify-between">
              <div className="bg-gray-600 h-7 w-max">
                {/* <input className="w-8 h-7" type="text" /> */}
              </div>
              <div className="flex h-9 justify-between">
                <div
                  onClick={() => handleRemove(item.id)}
                  className="text-red-700 underline cursor-pointer"
                >
                  Kaldır
                </div>
                <div className="text-red-700">{item.price} TL</div>
              </div>
            </div>
          </div>
        </div> 
      ))}
    </div>
  );
};

export default Items;
