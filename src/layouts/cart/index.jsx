import React, { useEffect } from "react";
import Items from "./Items";
import Buy from "./Buy";
import { useAuths, useCurrentauth } from "../../redux/Hooks";
import { ToastContainer } from "react-toastify";

const Cart = () => {
 const account = useCurrentauth();
 const isLogin = !!account?.name;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if(!isLogin){
    return(
      <div>giriş yap</div>
    )
  }
  return (
    <div className="flex  justify-center mt-8">
      <div className="w-[90%] ">
        <div className="  mb-16 text-2xl font-semibold text-gray-500">
          SEPETİM
        </div>
        <div className="w-full flex justify-between">
          <Items />
          <Buy/>
        </div>
        
        
      </div>
         <ToastContainer/>
    </div>
  );
};

export default Cart;
